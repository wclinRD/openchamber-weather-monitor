// Shared data shapes for weather service and UI.

export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  uv_index?: number;
  cloud_cover?: number;
  pressure_msl?: number;
  visibility?: number;
  dew_point_2m?: number;
  wind_gusts_10m?: number;
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  cloud_cover?: number[];
  precipitation?: number[];
}

export interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum?: number[];
  precipitation_probability_max?: number[];
  sunrise?: string[];
  sunset?: string[];
}

export interface WeatherForecastResponse {
  current?: WeatherCurrent;
  hourly?: WeatherHourly;
  daily?: WeatherDaily;
}

export interface LocationInfo {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  timezone?: string;
}

export interface LocationSearchResponse {
  results?: Array<{
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
    timezone?: string;
    admin1?: string;
  }>;
}

export interface WeatherSnapshot {
  at: number;
  intervalMs: number;
  location: LocationInfo | null;
  current: WeatherCurrent | null;
  hourly: WeatherHourly | null;
  daily: WeatherDaily | null;
  error: string | null;
}
