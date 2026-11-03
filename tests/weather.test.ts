import { describe, test, expect } from 'bun:test';
import { formatWmoCondition, formatTemperature, formatPercent, formatApparentTemperature } from '../src/shared/format.ts';
import type { WeatherSnapshot } from '../src/shared/types.ts';

describe('formatWmoCondition', () => {
  test('maps code 0 to 晴天', () => {
    const result = formatWmoCondition(0);
    expect(result).toEqual({ label: '晴天', icon: '☀️' });
  });

  test('maps code 61 to 雨', () => {
    const result = formatWmoCondition(61);
    expect(result).toEqual({ label: '雨', icon: '🌧️' });
  });

  test('maps code 95 to 雷雨', () => {
    const result = formatWmoCondition(95);
    expect(result).toEqual({ label: '雷雨', icon: '⛈️' });
  });

  test('falls back for unknown code', () => {
    const result = formatWmoCondition(123);
    expect(result).toEqual({ label: '未知名天氣', icon: '🌈' });
  });
});

describe('formatTemperature', () => {
  test('formats positive temperature', () => {
    expect(formatTemperature(24.5)).toBe('25°C');
  });

  test('formats negative temperature', () => {
    expect(formatTemperature(-4.3)).toBe('-4°C');
  });
});

describe('formatPercent', () => {
  test('formats whole number percent', () => {
    expect(formatPercent(70)).toBe('70%');
  });

  test('formats fraction percent', () => {
    expect(formatPercent(7.1)).toBe('7.1%');
  });
});

describe('formatApparentTemperature', () => {
  test('formats apparent temperature', () => {
    expect(formatApparentTemperature(25.1)).toBe('體感 25°C');
  });
});

describe('snapshot validation', () => {
  const makeSnapshot = (overrides: Partial<WeatherSnapshot> = {}): WeatherSnapshot => ({
    at: Date.now(),
    intervalMs: 30_000,
    location: { lat: 25.033, lon: 121.565, name: 'Taipei', timezone: 'Asia/Taipei' },
    current: {
      time: '2026-11-03T12:00',
      temperature_2m: 24.5,
      relative_humidity_2m: 70,
      apparent_temperature: 25.1,
      precipitation: 0.0,
      weather_code: 0,
      wind_speed_10m: 8.2,
      wind_direction_10m: 150,
    },
    hourly: {
      time: ['2026-11-03T12:00'],
      temperature_2m: [24.5],
      weather_code: [0],
      precipitation_probability: [0],
    },
    daily: {
      time: ['2026-11-03'],
      weather_code: [0],
      temperature_2m_max: [26],
      temperature_2m_min: [20],
    },
    error: null,
    ...overrides,
  });

  test('full snapshot valid', () => {
    const snap = makeSnapshot();
    expect(snap.at).not.toBeNull();
    expect(snap.current).not.toBeNull();
    expect(snap.hourly).not.toBeNull();
    expect(snap.daily).not.toBeNull();
    expect(snap.error).toBeNull();
  });

  test('partial snapshot with error valid', () => {
    const snap = makeSnapshot({
      location: null,
      current: null,
      hourly: null,
      daily: null,
      error: 'network error',
    });
    expect(snap.location).toBeNull();
    expect(snap.current).toBeNull();
    expect(snap.error).toBe('network error');
  });
});
