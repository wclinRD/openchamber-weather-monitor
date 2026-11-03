# Weather Extension Design

## Data Flow

1. Service fetches Open-Meteo geocoding and weather forecast data.
2. Service runs on `127.0.0.1` with a Bearer token.
3. UI frames (`panel`, `status`) call `GET /snapshot` through `host.serviceRequest`.
4. Panel can update location via `POST /location` with a city query.

## API Endpoints

- `GET https://geocoding-api.open-meteo.com/v1/search`: returns `results[]` with latitude, longitude, name.
- `GET https://api.open-meteo.com/v1/forecast`: returns `current`, `hourly`, `daily` data.

## WMO Weather Code Mapping

- 0: 晴天 · ☀️
- 1~3: 多雲 · ⛅/☁️
- 45/48: 霧 · 🌫️
- 51~55: 細小雨 · 🌦️
- 61~65: 雨 · 🌧️
- 71~75: 雪 · ❄️
- 77: 雪粒 · 🌨️
- 80~82: 陣雨 · 🌦️
- 85/86: 陣雪 · 🌨️
- 95~99: 雷雨 · ⛈️

## Display Targets

- **Panel**: current weather, apparent temperature, humidity, precipitation, wind speed/direction; 24-hour temperature chart; daily forecast row.
- **Status bar**: compact `City Temperature°C · Condition`.
