// Number formatting shared by the panel and the Work Status section.

let locale = 'en';
export const setLocale = (next: string): void => {
  locale = next || 'en';
};

const number = (value: number, digits: number): string => new Intl.NumberFormat(locale, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
}).format(value);

/** 1024-based, the way Activity Monitor and Task Manager count. */
export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};

export const formatPercent = (value: number): string => `${number(value, value < 10 ? 1 : 0)}%`;

export const formatWmoCondition = (code: number): { label: string; icon: string } => {
  if (code === 0) return { label: '晴天', icon: '☀️' };
  if (code === 1) return { label: '主要晴朗', icon: '🌤️' };
  if (code === 2) return { label: '多雲', icon: '⛅' };
  if (code === 3) return { label: '陰天', icon: '☁️' };
  if (code === 45 || code === 48) return { label: '霧', icon: '🌫️' };
  if (code === 51 || code === 53 || code === 55) return { label: '細小雨', icon: '🌦️' };
  if (code === 56 || code === 57) return { label: '凍雨', icon: '🌧️' };
  if (code === 61 || code === 63 || code === 65) return { label: '雨', icon: '🌧️' };
  if (code === 66 || code === 67) return { label: '凍雨', icon: '🌧️' };
  if (code === 71 || code === 73 || code === 75) return { label: '雪', icon: '❄️' };
  if (code === 77) return { label: '雪粒', icon: '🌨️' };
  if (code === 80 || code === 81 || code === 82) return { label: '陣雨', icon: '🌦️' };
  if (code === 84) return { label: '陣雨，強', icon: '🌧️' };
  if (code === 85 || code === 86) return { label: '陣雪', icon: '🌨️' };
  if (code === 95) return { label: '雷雨', icon: '⛈️' };
  if (code === 96 || code === 99) return { label: '雷雨伴冰雹', icon: '⛈️' };
  return { label: '未知名天氣', icon: '🌈' };
};

export const formatWindDirection = (deg: number): string => {
  const dirs = ['北', '東北東', '東', '東南東', '南', '西南南', '西', '西北西'];
  const index = Math.round((deg / 45)) % 8;
  return dirs[index] ?? '';
};

export const formatTemperature = (temp: number): string => `${Math.round(temp)}°C`;

export const formatApparentTemperature = (temp: number): string => `體感 ${Math.round(temp)}°C`;
