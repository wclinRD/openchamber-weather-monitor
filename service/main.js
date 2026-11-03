// src/service/main.ts
import http from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var LOCATION_DIR = join(process.env.HOME ?? "/tmp", ".openchamber/extensions/weather-monitor");
var LOCATION_FILE = join(LOCATION_DIR, "weather-location.json");
var defaultLocation = { lat: 25.033, lon: 121.565, name: "Taipei", timezone: "Asia/Taipei" };
var latestSnapshot = null;
var location = defaultLocation;
var fetchTimer = null;
var ensureLocation = async () => {
  try {
    const text = await readFile(LOCATION_FILE, "utf8");
    const parsed = JSON.parse(text);
    if (typeof parsed.lat === "number" && typeof parsed.lon === "number" && parsed.name) {
      location = parsed;
      return;
    }
  } catch {}
};
var saveLocation = async (loc) => {
  try {
    await mkdir(LOCATION_DIR, { recursive: true });
    await writeFile(LOCATION_FILE, JSON.stringify(loc, null, 2));
  } catch {}
};
var searchLocation = async (query) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=zh&format=json`;
  const res = await fetch(url, { headers: { "user-agent": "OpenChamber Weather Monitor" } });
  if (!res.ok)
    return null;
  const data = await res.json();
  const r = data.results?.[0];
  if (!r)
    return null;
  return {
    lat: r.latitude,
    lon: r.longitude,
    name: r.name,
    country: r.country,
    timezone: r.timezone
  };
};
var fetchWeather = async (loc) => {
  const params = new URLSearchParams({
    latitude: String(loc.lat),
    longitude: String(loc.lon),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index,cloud_cover,pressure_msl,visibility,dew_point_2m,wind_gusts_10m",
    hourly: "temperature_2m,weather_code,precipitation_probability,cloud_cover,precipitation",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset",
    timezone: loc.timezone ?? "auto"
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url, { headers: { "user-agent": "OpenChamber Weather Monitor" } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Open-Meteo error ${res.status}: ${body}`);
  }
  const data = await res.json();
  return {
    at: Date.now(),
    intervalMs: 60000,
    location: loc,
    current: data.current || null,
    hourly: data.hourly || null,
    daily: data.daily || null,
    error: null
  };
};
var refresh = async () => {
  try {
    latestSnapshot = await fetchWeather(location);
  } catch (err) {
    latestSnapshot = {
      at: Date.now(),
      intervalMs: 60000,
      location,
      current: null,
      hourly: null,
      daily: null,
      error: err instanceof Error ? err.message : "Unknown error"
    };
  }
};
var schedule = () => {
  fetchTimer = setInterval(() => {
    refresh();
  }, 60000);
};
var json = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
};
var server = http.createServer(async (req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    json(res, 401, { error: "unauthorized" });
    return;
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health") {
    json(res, 200, { ok: true });
    return;
  }
  if (req.method === "POST" && url.pathname === "/location") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf8");
    });
    req.on("end", async () => {
      let query;
      try {
        const parsed = JSON.parse(body);
        query = typeof parsed.location === "string" ? parsed.location : "";
      } catch {
        query = "";
      }
      if (!query) {
        json(res, 400, { error: "bad-request" });
        return;
      }
      const info = await searchLocation(query);
      if (!info) {
        json(res, 404, { error: "location-not-found" });
        return;
      }
      location = info;
      await saveLocation(info);
      latestSnapshot = null;
      json(res, 200, { ok: true, location: info });
    });
    return;
  }
  if (req.method !== "GET" || url.pathname !== "/snapshot") {
    json(res, 404, { error: "not-found" });
    return;
  }
  await ensureLocation();
  const now = Date.now();
  if (!latestSnapshot || now - latestSnapshot.at > 5 * 60000) {
    latestSnapshot = await fetchWeather(location);
  }
  json(res, 200, latestSnapshot);
});
server.listen(port, "127.0.0.1");
schedule();
var shutdown = () => {
  if (fetchTimer)
    clearInterval(fetchTimer);
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
