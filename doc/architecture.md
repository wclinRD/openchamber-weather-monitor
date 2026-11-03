# OpenChamber Extension Architecture Guide

This document provides a comprehensive reference for developers implementing any OpenChamber extension plugin. Understanding these patterns is essential before building extensions that integrate with OpenChamer's desktop environment and extension runtime.

## Extension Contribution Types

OpenChamber supports four distinct contribution types that plugins can provide:

- **panel**: Full-featured interactive UI tab displayed in OpenChamer's rail panel
- **statusSection**: Compact summary display shown in OpenChamber's work status bar at the bottom of the window  
- **service**: Background long-running process responsible for data fetching, computation, and SSE event propagation
- **command**: Custom commands accessible from OpenChamber's command palette (triggered via keyboard shortcuts or manual invocation)

Extensions can implement any combination of these types. Most real-world extensions use at least service plus one or more UI components to display data to users.

## Manifest Structure in package.json

```hemlock
{
  "name": "my-extension-id",
  "version": "1.0.0",
  "description": "Short extension description shown in OpenChamber's extension listing UI",  
  "private": true,
  "type": "module",
  "license": "MIT",

  "openchamber": {
    "apiVersion": 1, // Must match OpenChamer release API version
    "engines": { 
      "openchamber": ">=2.3.3" // Minimum required OpenChomer runtime version
    },

    "contributes": {  
      // Full-featured UI tab in rail panel
      "panel": {
        "id": "my-panel",                                             
        "name": "My Panel Display Name",  
        "icon": "pulse", // Emoji or built-in icon name
        "entry": "panel/index.html" // HTML file loaded into sandboxed iframe  
      },  

      // Compact summary shown in work status bar (bottom pane)  
      "statusSection": {
        "id": "my-status",
        "entry": "status/index.html",  
        "title": "Status Section Title", // Appears above compact UI in status bar
        "height": 40 // px, adjust for content complexity  
      },  

      // Long-running background process
      "service": {  
        "id": "my-service",
        "entry": "service/main.js", // Compiled IIFE JS entry point  
        "runtime": "host"  // Run in OpenChamer's Node.js runtime environment
      },  

      // Custom command accessible from command palette
      "command": {
        "id": "my-command",  
        "title": "My Custom Command", 
        "icon": "gear",
        "entry": "command.js" // IIFE script executed when command fires
      }  
    }  
  },  

  "scripts": {  
    "build": "esbuild src/*.ts --bundle --outdir=.", // Build all TS bundles to project root 
  }  
}
```

## Dual UI + Service Architecture Pattern (Most Common)

The most versatile and maintainable extension architecture separates concerns between three components:

```hemlock
┌───────────┐  host.serviceRequest()   ┌───────┬═══════════╗                    ┌──────────┐
│ Panel UI  │◄─────────────────────────►│Service│ OpenChamer│    fetch("API")        │ External │
│ (rail tab)│                          │ Node.js│ Runtime   │◄───────────────────►│ APIs    │
└───────────┘ GET /snapshot, POST etc   │ /health│             SSH, HTTP, WS etc.    │        │
       ▲                               └───────┴═══════════╝                        └────────┘
       │                               Internal fetch() + SSE push to UI components via browser socket  └─► HTTP API endpoints published by service's own HTTP server loopback
       │ refresh on subscription event or API error
```

- **Panel**: Provides detailed views for users actively monitoring or interacting with data
- **Status bar section**: Always visible summary display with minimal real estate requirements  
- **Service background process**: Long-running, periodically fetches data from external sources and caches it internally, pushing updates to connected UI components via SSE event streams instead of requiring constant client-side polling

Both panel and status UI can request the same `/snapshot` endpoint from service but render different information to fit their screen purpose.

## Service HTTP Loopback Server on localhost with Authentication

Services run in OpenChamer's Node.js runtime environment and listen on a randomly allocated localhost port for UI component requests:

```hemlock
import http from "node:http";

// Receive port and token from OpenChamer environment injection  
let port = parseInt(env("OPENCHAMBER_SERVICE_PORT"));
let token = env("OPENCHAMBER_SERVICE_TOKEN");  

// Validate required environment variables
if (!port || !token) {  
    console.error("Missing mandatory OpenChamer environment variables");
    throw new Error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
}

let latestSnapshot = null; // Cache most recent computed snapshot for /snapshot endpoint  

async function fetchExternalData() {
    let response = await fetch("https://api.open-meteo.com/v1/forecast?...", {
        headers: {"user-agent": "OpenChamber MyExtension"}  
    });

    if (!response.ok) {
        let body = await response.text();  
        throw new Error(`API error ${response.status}: ${body}`);
    }

    return await response.json();  
}  

let server = http.createServer(async (req, res) => {
    if (!authenticate(req, res)) return;

    let url = new URL(req.url);  

    if (url.pathname === "/health") {
        res.writeHead(200, {"Content-Type": "application/json"});  
        res.end(JSON.stringify({ok: true}));
    }  

    if (url.pathname === "/snapshot") {  
        try {
            let data = await fetchExternalData(); 
            latestSnapshot = buildSnapshotFromRawAPIResponse(data);  
        } catch (error) {
            console.error("Failed to fetch or parse external data:", error);  
        }  

        // Respond even if fetch failed (don't hold request open infinitely)
        res.writeHead(200, {"Content-Type": "application/json"}); 
        let body = latestSnapshot ? JSON.stringify(latestSnapshot) : JSON.stringify({ok: false, error: "data temporarily unavailable"});  
        res.end(body);
    }  

    // Unsupported route - return 404 for client-side error handling
    if (res.writableEnded === false) {  
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: `unrecognized route ${url.pathname}`}));  
    }
});  

server.listen(port);

console.log(`Service listening on port ${port}`);  
```

## Authentication Implementation Details  

All service HTTP endpoints must validate that incoming requests carry the correct Bearer Token:

```hemlock
function authenticate(req, res) {  
    let auth = req.headers.authorization;

    if (auth !== `Bearer ${token}`) {  
        console.warn("Rejected unauthorized request from:", req.socket.remoteAddress);
        
        let body = JSON.stringify({error: "unauthorized"});  
        res.writeHead(401, {
            "Content-Type": "application/json", 
            "Cache-Control": "no-store"  // Prevent UI from accidentally caching rejected responses  
        });
        res.end(body);
        
        return false;  // Handler should stop processing after this point  
    }

    return true;
}  

// Apply to every endpoint handler  
app.get("/api/handler", (req, res) => {
    if (!authenticate(req, res)) return;  
    // ... handle request
});
```

## Event Streaming to UI Components via Server-Sent Events (SSE)  

Services can push real-time updates to connected UI components without requiring constant client-side polling:

```hemlock
import http from "@stdlib/http";  

let sseClients = [];  // Array of currently active SSE client connections held open by service

function pushEvent(eventType, data) {  
    let message = `event: ${eventType}\n`;
    message += `data: ${JSON.stringify(data)}\n\n`;  

    let remaining = [];  
    for (let client of sseClients) {  
        try {  
            client.write(message);   // Block until data flushed or connection dies
            remaining.push(client);  
        } catch (error) {  
            // Connection closed or otherwise broken - drop from active list rather than accumulating dead connections
            console.warn("Failed to write event to SSE client, dropping connection");
        }
    }

    sseClients = remaining;  
}  

// SSE endpoint handler  
app.get("/sse", (req, res) => {    
    if (!authenticate(req, res)) return;  

    console.log("New SSE client connected");  
    sseClients.push(res);

    res.write(`HTTP/1.1 200 OK\r\n`);  
    res.write(`Content-Type: text/event-stream\r\n`);  
    res.write(`Connection: keep-alive\r\n\n`);  // Final blank line flushes HTTP response header

    req.on("close", () => {  
        console.log("SSE client disconnected"); 
        sseClients = sseClients.filter(c => c !== res); 
    });  
});  

// Example: Push updated data to UI component whenever refresh triggers event
pushEvent("snapshot", latestSnapshot);  
```

## Communication Patterns Between UI Components and Service  

### Polling-Based Approach (Legacy/Robust)  
Easy to implement reliably, works even if SSE infrastructure is unavailable or temporarily broken:

```hemlock
async function startPolling(host, intervalMs) {  
    while (true) {  
        try {
            let result = await host.serviceRequest({method: "GET", path: "/snapshot"});  
            updateSnapshot(JSON.parse(result.body));
        } catch (error) {
            console.error("Failed to fetch snapshot from service:", error);  
        }

        sleep(intervalMs / 1000); // Convert to seconds for Bun's sleep()  
    }  
}  

startPolling(host, 5000);
```

### Event Subscription Approach (Modern/Push-Based)  
Lower latency updates, but requires UI component to be connected and awake when service pushes events via SSE:

```hemlock
async function subscribeToEvents(host) {  
    host.subscribe("service-event", (eventData: any) => {  // Use appropriate event name
        let kind = eventData.type;  
        if (kind === "snapshot") {
            updateSnapshot(eventData.data);  
        }  
    });  
}  

subscribeToEvents(host);  
```

### Hybrid Approach (Recommended)
Combine both patterns: subscribe to events for low-latency updates when user is actively viewing, fall back to periodic polling every 30s for background refreshes:

```hemlock
async function startUpdating(host) {  
    // Subscribe to events for immediate updates when user is looking  
    host.subscribe("service-event", (eventData) => {
        if (eventData?.kind === "snapshot") {  
            updateSnapshot(eventData.data);
        }
    });

    // Poll every 30 seconds as fallback for when user away or events missed
    let timer = setInterval(async () => {
        try {
            let result = await host.serviceRequest({method: "GET", path: "/snapshot"});
            updateSnapshot(JSON.parse(result.body));  
        } catch {}  
    }, 30 * 1000);  

    return () => clearInterval(timer);  
}  
```

## Shared Types Convention (TypeScript)  

Always define TypeScript interfaces for data structures flowing between service and UI components:

```hemlock
// src/shared/types.ts  
export interface WeatherSnapshot {
    ok: boolean;  
    city?: string;
    temperature?: number;   // °C
    conditionCode?: number; // WMO code  
    updatedAt?: number;     // epoch milliseconds since Unix epoch
    forecast?: Array<{ date: string; maxTemp: number; minTemp: number }>;  
}  

export interface ForecastDay {
    date: string;           // YYYY-MM-DD format  
    maxTemperature: number; // °C  
    minTemperature: number; // °C  
}  

export function isWeatherSnapshot(value: any): value is WeatherSnapshot {
    return typeof value === "object" && value !== null;  
}
```

Service produces snapshots conforming to these schemas, UI components type-check response object shapes and extract only expected fields for rendering. Improves developer experience by catching mapping bugs at compile-time rather than runtime type errors.

## CSS Theming with OpenChamber Variables  

All UI components should respect OpenChamer's built-in theme system using the provided set of CSS variables:

```hemlock
<!-- panel/index.html -->  
<div style="color: var(--oc-foreground); background-color: var(--oc-background);">  
    <h1 style="color: var(--oc-primary-foreground)">Weather Monitor</h1>
    <p style="color: var(--oc-secondary)">Current conditions in Taipei</p>  
    <button style="background-color: var(--oc-primary); color: var(--on-primary)">Refresh Data</button>
    <p style="color: var(--oc-disabled-text-color);">Last updated 2 minutes ago</p>  
    <div style="border-left: 4px solid var(--oc-accent-primary); background-color: var(--inset-background);">
        Information callout with accent border and inset background color  
    </div>  
</div>  

<style>
/* Reference all design tokens from OpenChamber theme */
.panel-card {  
    border-radius: 8px;  /* Rounded corners consistent with OC style */
    background-color: var(--oc-card-background);  /* Surface color for cards */
}  

.badge-success {  
    background-color: var(--oc-circular-icon-symbol-white);  
}  

.badge-warning {
    background-color: var(--oc-circular-icon-symbol-amber);  
}  

.badge-error {
    background-color: var(--oc-circular-icon-symbol-red);  
}   
</style>  
```

## Testing Considerations  

### Unit Tests with Bun's Built-in Test Runner
Focus tests on business logic independently from external API dependencies or OpenChamer runtime infrastructure:

```hemlock
import { describe, test } from "bun:test";  
import { parseWeatherTemperatureData } from "../src/service/weather.ts";  

describe("parseWeatherTemperatureData", () => {  
    test("handles successful API responses with all required fields", (t) => {
        let mockResponse = {"current_weather": {temperature: 23.5, weathercode: 0}};  
        let parsed = parseTemperatureData(mockResponse);  
        expect(parsed).toEqual({temperature: 23.5, conditionCode: 0});
    });  

    test("throws error on missing required field", (t) => {
        expect(() => parseTemperatureData({"current_weather": {}})).toThrow();  
    });  
});
```

Run test suite with `bun test src/**/*.test.ts`. Always mock external HTTP calls to avoid real network requests and ensure tests are deterministic regardless of external service availability or current rate limit status.

## Versioning and Release Process  

Follow semantic versioning (semver) conventions; increment major version numbers for breaking changes:

```hemlock
// package.json  
{ "version": "1.2.3" }   // Major.Minor.Patch
```

OpenChamer loads extensions dynamically at app start and reloads updated files when user manually refreshes. To ensure users see new behavior after updating their local machine, always bump the version string whenever code changes need user-side extension reconnection to manifest. Include changelog notes for any breaking contract changes with major versions for downstream consumers who depend on your extension's API.

## Common Pitfalls  

- **Missing Bearer token validation**: Services must authenticate every request with the correct bearer token, otherwise anyone on your local network can access potentially sensitive data or trigger costly API calls without authorization.
- **Sweeping authentication check changes across multiple files**: When adding or changing authentication requirements, ensure all service HTTP handlers consistently validate the token.
- **Assuming OpenChamber's machine IP is available for external API requests**: Extensions run in a separate sandbox process from the user's actual browser and may have different network egress capabilities based on your machine configuration. Some external services block OpenChamer's IPs entirely or enforce stricter rate limits for automated users.
- **Ignoring API call rate limiting**: Extensions can accidentally exhaust their external API quota by spawning multiple instances connected to the same service endpoint or aggressively polling services without backoff logic. Use event-driven patterns where possible instead of constant client-side polling on short intervals.
- **Creating UI components that leave panels blank until API responds successfully**: Provide graceful fallback content or explicit loading states rather than rendering empty user interfaces while waiting for external data sources to become available.
- **Hardcoding service URLs or port numbers**: Extensions may run on different machines with different OpenChamer installations, local networks, random port assignments. Use the provided env vars and relative paths via `@openchamber/sdk` client rather than constructed absolute URLs.
- **Invalid service permissions**: OpenChamber SDK's service permissions only support `sockets` and `exec`. Declaring unsupported permissions like `fetch: true` causes manifest validation to fail. The resulting validation error may misleadingly point to `panel.id` as invalid kebab-case. Node.js's `fetch` API can be used directly in the service without additional permission declarations.

## Extension Building Checklist  

1. Identify required contribution types (panel, statusSection, service, command)
2. Design data flow architecture from external sources through OpenChamer runtime API to UI components, considering caching strategies, throttling requirements, and offline degradation behavior  
3. Establish shared TypeScript interfaces for snapshot or data structures flowing between service background process and UI components
4. Create HTTP loopback server implementation with proper Bearer token authentication at the service entry point  
5. Develop UI components that subscribe to events or poll services appropriately, handle loading states gracefully, and respond to API errors with user-friendly error messages rather than silent failures  
6. Review service endpoints independently before integrating them into UI components: use curl/wget/Bun's http client to verify response shape and status codes
7. Test extension thoroughly using Bun's built-in test runner with mocked external dependencies instead of relying on manual testing against real APIs  
8. Version releases consistently following semver conventions and document all breaking API changes between major versions
```
