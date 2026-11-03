# OpenChamber Weather Monitor Plugin

Real-time weather data from [Open-Meteo](https://open-meteo.com/) displayed in OpenChamber's panel and status bar.

## Features

- **Current Weather**: temperature, apparent temperature, humidity, precipitation, wind speed/direction, UV index, cloud cover, pressure, visibility, dew point, wind gusts.
- **Daily Forecast**: min/max temperature, precipitation total, precipitation probability, sunrise/sunset times.
- **24-Hour Temperature Chart**: interactive hourly temperature visualization.
- **Chinese Search**: geocoding supports Chinese city names via `language=zh`.
- **Status Bar**: compact display showing city, temperature, and weather condition.

## Installation

1. Clone or download this plugin repository.
2. Ensure OpenChamber `>=2.3.3` is installed.
3. Place the plugin folder in OpenChamber's extension directory.

## Usage

1. Open OpenChamber.
2. Navigate to the Weather Monitor panel (icon: ☁️).
3. Search for a city name (supports Chinese and English).
4. View current weather, 24-hour temperature chart, and daily forecast.

## Development

```bash
# Install dependencies
bun install

# Type check
bun run typecheck

# Run tests
bun run test

# Build plugin
bun run build
```

## Project Structure

```
.
├── package.json          # OpenChamber extension manifest
├── tsconfig.json         # TypeScript configuration
├── scripts/build.ts      # Build script
├── service/main.ts       # Open-Meteo service (geocoding + weather)
├── panel/main.ts         # Panel UI (current weather + charts)
├── status/main.ts        # Status bar UI
├── shared/               # Shared types, formatting, chart, DOM helpers
├── tests/                # Unit tests
└── doc/                  # Design and architecture documentation
```

## API Reference

### Service Endpoints

- `GET /snapshot`: returns the latest weather snapshot.
- `POST /location`: updates the location for the next snapshot.

### Open-Meteo API

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={query}&language=zh`
- Weather Forecast: `https://api.open-meteo.com/v1/forecast`

## Data Source & Attribution

This plugin uses [Open-Meteo](https://open-meteo.com/) for weather data.

- Free tier: non-commercial use up to 10,000 calls/day, 5,000/hour, 600/minute, 300,000/month.
- Data license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Please credit Open-Meteo when displaying their data.
- For commercial use or higher volumes, see [Open-Meteo pricing](https://open-meteo.com/en/pricing).

## License

MIT
