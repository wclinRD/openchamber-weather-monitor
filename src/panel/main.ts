import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { startPolling, updateLocation } from '../shared/client.ts';
import { formatApparentTemperature, formatPercent, formatTemperature, formatWmoCondition } from '../shared/format.ts';
import { el } from '../shared/dom.ts';
import { mountChart } from '../shared/chart.ts';
import { BASE_STYLE, PANEL_STYLE } from '../shared/style.ts';
import type { WeatherForecastResponse, WeatherSnapshot } from '../shared/types.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = BASE_STYLE + PANEL_STYLE;
document.head.append(style);

const head = el('div', 'head');
const locationName = el('div', 'location-name', 'Taipei');
const locationMeta = el('div', 'location-meta', '載入中…');
const searchInput = document.createElement('input');
searchInput.className = 'search-input';
searchInput.placeholder = '搜尋城市或地區';
searchInput.type = 'text';
const searchButton = el('button', 'search-button', '搜尋');
const searchRow = el('div', 'search', '', [searchInput, searchButton]);
head.append(el('div', 'titles', '', [locationName, locationMeta]), searchRow);

const currentTempEl = document.createElement('div');
currentTempEl.className = 'weather-value';
currentTempEl.id = 'current-temp';
currentTempEl.textContent = '–';

const currentWeatherEl = document.createElement('span');
currentWeatherEl.className = 'weather-value';
currentWeatherEl.id = 'current-weather';
currentWeatherEl.textContent = '—';

const currentIconEl = document.createElement('span');
currentIconEl.className = 'weather-icon';
currentIconEl.id = 'current-icon';
currentIconEl.textContent = '—';

const currentFeelsEl = document.createElement('span');
currentFeelsEl.className = 'weather-value';
currentFeelsEl.id = 'current-feels';
currentFeelsEl.textContent = '—';

const currentHumidityEl = document.createElement('span');
currentHumidityEl.className = 'weather-value';
currentHumidityEl.id = 'current-humidity';
currentHumidityEl.textContent = '—';

const currentPrecipitationEl = document.createElement('span');
currentPrecipitationEl.className = 'weather-value';
currentPrecipitationEl.id = 'current-precipitation';
currentPrecipitationEl.textContent = '—';

const currentWindEl = document.createElement('span');
currentWindEl.className = 'weather-value';
currentWindEl.id = 'current-wind';
currentWindEl.textContent = '—';

const currentUvEl = document.createElement('span');
currentUvEl.className = 'weather-value';
currentUvEl.id = 'current-uv';
currentUvEl.textContent = '—';

const currentCloudEl = document.createElement('span');
currentCloudEl.className = 'weather-value';
currentCloudEl.id = 'current-cloud';
currentCloudEl.textContent = '—';

const currentPressureEl = document.createElement('span');
currentPressureEl.className = 'weather-value';
currentPressureEl.id = 'current-pressure';
currentPressureEl.textContent = '—';

const currentVisibilityEl = document.createElement('span');
currentVisibilityEl.className = 'weather-value';
currentVisibilityEl.id = 'current-visibility';
currentVisibilityEl.textContent = '—';

const currentDewEl = document.createElement('span');
currentDewEl.className = 'weather-value';
currentDewEl.id = 'current-dew';
currentDewEl.textContent = '—';

const currentGustEl = document.createElement('span');
currentGustEl.className = 'weather-value';
currentGustEl.id = 'current-gust';
currentGustEl.textContent = '—';

const currentSunriseEl = document.createElement('span');
currentSunriseEl.className = 'weather-value';
currentSunriseEl.id = 'current-sunrise';
currentSunriseEl.textContent = '—';

const currentSunsetEl = document.createElement('span');
currentSunsetEl.className = 'weather-value';
currentSunsetEl.id = 'current-sunset';
currentSunsetEl.textContent = '—';

const weatherCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', '目前天氣'), el('span', 'grow')]),
  currentTempEl,
  el('div', 'weather-detail', '', [
    el('div', 'weather-row', '', [el('span', 'weather-label', '天氣'), currentWeatherEl, currentIconEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '體感溫度'), currentFeelsEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '濕度'), currentHumidityEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '降雨'), currentPrecipitationEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '風速'), currentWindEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', 'UV 指數'), currentUvEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '雲量'), currentCloudEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '氣壓'), currentPressureEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '能見度'), currentVisibilityEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '露點'), currentDewEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '風陣'), currentGustEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '日出'), currentSunriseEl]),
    el('div', 'weather-row', '', [el('span', 'weather-label', '日落'), currentSunsetEl]),
  ]),
]);

const chart = mountChart({ color: 'var(--oc-primary)', height: 56, capacity: 24, format: formatTemperature, intervalSeconds: 1 });
const hourlyCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', '24 小時溫度預報'), el('span', 'grow')]),
  chart.element,
]);

const dailyCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', '每日預報'), el('span', 'grow')]),
  el('div', 'forecast-day', '', [el('span', 'forecast-day-name', '–'), el('span', 'forecast-day-range', '–')]),
]);

const footer = el('div', 'sub', '資料來源：Open-Meteo');

root.append(head, weatherCard, hourlyCard, dailyCard, footer);

const render = (snapshot: WeatherSnapshot): void => {
  locationName.textContent = snapshot.location?.name ?? '—';
  locationMeta.textContent = snapshot.location ? `${snapshot.location.country ?? ''} · ${formatPercent(0)}` : '選取地點';

  let currentTempEl = document.getElementById('current-temp');
  let currentWeatherEl = document.getElementById('current-weather');
  let currentIconEl = document.getElementById('current-icon');
  let currentFeelsEl = document.getElementById('current-feels');
  let currentHumidityEl = document.getElementById('current-humidity');
  let currentPrecipitationEl = document.getElementById('current-precipitation');
  let currentWindEl = document.getElementById('current-wind');
  let currentUvEl = document.getElementById('current-uv');
  let currentCloudEl = document.getElementById('current-cloud');
  let currentPressureEl = document.getElementById('current-pressure');
  let currentVisibilityEl = document.getElementById('current-visibility');
  let currentDewEl = document.getElementById('current-dew');
  let currentGustEl = document.getElementById('current-gust');
  let currentSunriseEl = document.getElementById('current-sunrise');
  let currentSunsetEl = document.getElementById('current-sunset');
  if (currentTempEl && currentWeatherEl && currentIconEl && currentFeelsEl && currentHumidityEl && currentPrecipitationEl && currentWindEl && currentUvEl && currentCloudEl && currentPressureEl && currentVisibilityEl && currentDewEl && currentGustEl && currentSunriseEl && currentSunsetEl) {
    if (snapshot.current) {
      const cond = formatWmoCondition(snapshot.current.weather_code);
      currentTempEl.textContent = formatTemperature(snapshot.current.temperature_2m);
      currentWeatherEl.textContent = cond.label;
      currentIconEl.textContent = cond.icon;
      currentFeelsEl.textContent = formatApparentTemperature(snapshot.current.apparent_temperature);
      currentHumidityEl.textContent = formatPercent(snapshot.current.relative_humidity_2m);
      currentPrecipitationEl.textContent = `${snapshot.current.precipitation} mm`;
      currentWindEl.textContent = `${snapshot.current.wind_speed_10m} km/h · ${formatPercent(snapshot.current.wind_direction_10m)}`;
      currentUvEl.textContent = snapshot.current.uv_index ? `${snapshot.current.uv_index}` : '—';
      currentCloudEl.textContent = snapshot.current.cloud_cover ? `${snapshot.current.cloud_cover}%` : '—';
      currentPressureEl.textContent = snapshot.current.pressure_msl ? `${Math.round(snapshot.current.pressure_msl)} hPa` : '—';
      currentVisibilityEl.textContent = snapshot.current.visibility ? `${Math.round(snapshot.current.visibility / 1000)} km` : '—';
      currentDewEl.textContent = snapshot.current.dew_point_2m ? formatTemperature(snapshot.current.dew_point_2m) : '—';
      currentGustEl.textContent = snapshot.current.wind_gusts_10m ? `${snapshot.current.wind_gusts_10m} km/h` : '—';
      if (snapshot.daily?.sunrise?.[0] && snapshot.daily?.sunset?.[0]) {
        currentSunriseEl.textContent = snapshot.daily.sunrise[0].slice(11, 16);
        currentSunsetEl.textContent = snapshot.daily.sunset[0].slice(11, 16);
      } else {
        currentSunriseEl.textContent = '—';
        currentSunsetEl.textContent = '—';
      }
    } else {
      currentTempEl.textContent = '–';
      currentWeatherEl.textContent = '—';
      currentIconEl.textContent = '—';
      currentFeelsEl.textContent = '—';
      currentHumidityEl.textContent = '—';
      currentPrecipitationEl.textContent = '—';
      currentWindEl.textContent = '—';
      currentUvEl.textContent = '—';
      currentCloudEl.textContent = '—';
      currentPressureEl.textContent = '—';
      currentVisibilityEl.textContent = '—';
      currentDewEl.textContent = '—';
      currentGustEl.textContent = '—';
      currentSunriseEl.textContent = '—';
      currentSunsetEl.textContent = '—';
      currentSunriseEl.textContent = '—';
      currentSunsetEl.textContent = '—';
    }
  }

  if (snapshot.hourly?.temperature_2m && snapshot.hourly.time.length > 0) {
    const temps = snapshot.hourly.temperature_2m;
    const max = Math.max(...temps, 20);
    chart.update(temps, max);
  }

  if (snapshot.daily?.temperature_2m_max && snapshot.daily.time.length > 0) {
    const dayRow = dailyCard.querySelector('.forecast-day')!;
    const dateStr = snapshot.daily.time[0];
    const min = snapshot.daily.temperature_2m_min[0] ?? null;
    const max = snapshot.daily.temperature_2m_max[0] ?? null;
    const precipSum = snapshot.daily.precipitation_sum?.[0] ?? null;
    const precipProbMax = snapshot.daily.precipitation_probability_max?.[0] ?? null;
    const sunrise = snapshot.daily.sunrise?.[0];
    const sunset = snapshot.daily.sunset?.[0];
    const cond = min !== null && max !== null ? `${formatTemperature(min)} – ${formatTemperature(max)}` : '—';
    const precipText = precipSum !== null || precipProbMax !== null
      ? `${precipSum !== null ? `${precipSum} mm` : ''}${precipSum !== null && precipProbMax !== null ? ' / ' : ''}${precipProbMax !== null ? `${precipProbMax}% 機率` : ''}`.trim()
      : '—';
    const timeText = sunrise && sunset ? `${sunrise.slice(11, 16)} / ${sunset.slice(11, 16)}` : '—';
    dayRow.replaceChildren(el('span', 'forecast-day-name', dateStr), el('span', 'forecast-day-range', `${cond} · ${precipText} · ${timeText}`));
  }
};

const renderError = (error: string): void => {
  const card = document.createElement('div');
  card.className = 'banner';
  card.textContent = error;
  root.replaceChildren(head, card, footer);
};

let started = false;
let refresh = () => {};

const handleSearch = async (): Promise<void> => {
  const query = searchInput.value.trim();
  if (!query) return;
  searchButton.textContent = '搜尋中…';
  searchButton.disabled = true;
  const ok = await updateLocation(host, query);
  searchButton.textContent = '搜尋';
  searchButton.disabled = false;
  if (ok) {
    searchInput.value = '';
    await refresh();
  }
};

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleSearch();
});

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  if (started) return;
  started = true;
  ({ refresh } = startPolling(host, root, (snapshot) => {
    if (snapshot.error) {
      renderError(snapshot.error);
    } else {
      render(snapshot);
    }
  }, () => {
    renderError('無法取得天氣資料');
  }));
  void refresh();
});
