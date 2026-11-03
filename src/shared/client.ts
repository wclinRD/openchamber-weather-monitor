// Polls the weather service while the frame is on screen.
import { HostRequestError, type HostClient } from '@openchamber/sdk';
import type { WeatherForecastResponse, WeatherSnapshot } from './types.ts';

export const POLL_MS = 30_000;

export type PollFailure = 'needs-approval' | 'paused' | 'service-failed' | 'unreachable' | 'bad-answer';

export const FAILURE_TEXT: Record<PollFailure, string> = {
  'needs-approval': '允許天氣監控服務在 Settings → Extensions。',
  paused: '天氣監控已在 Settings → Extensions 中暫停。',
  'service-failed': '監控服務已停止。下次重新整理後重新啟動。',
  unreachable: '無法連上天氣服務。',
  'bad-answer': '監控服務回傳的資料格式不符合預期。',
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isWeatherForecastResponse = (value: unknown): value is WeatherForecastResponse => isRecord(value)
  && (!('current' in value) || isRecord(value.current));

const isSnapshot = (value: unknown): value is WeatherSnapshot => isRecord(value)
  && typeof value.at === 'number'
  && isRecord(value.location || null)
  && (value.current === null || isWeatherForecastResponse(value.current))
  && (value.hourly === null || isRecord(value.hourly))
  && (value.daily === null || isRecord(value.daily))
  && (value.error === null || typeof value.error === 'string');

const failureOf = (error: unknown): PollFailure => {
  if (!(error instanceof HostRequestError)) return 'unreachable';
  if (error.code === 'NO_SERVICE' || error.code === 'NOT_GRANTED') return 'needs-approval';
  if (error.code === 'DISABLED') return 'paused';
  if (error.code === 'SERVICE_FAILED') return 'service-failed';
  return 'unreachable';
};

export const isOnScreen = (root: HTMLElement): boolean => !document.hidden && root.getBoundingClientRect().width > 0;

export const startPolling = (
  host: HostClient,
  root: HTMLElement,
  onSnapshot: (snapshot: WeatherSnapshot) => void,
  onFailure: (failure: PollFailure) => void,
): { refresh: () => void } => {
  let inflight = false;
  const poll = async (): Promise<void> => {
    if (inflight || !isOnScreen(root)) return;
    inflight = true;
    try {
      const result = await host.serviceRequest({ method: 'GET', path: '/snapshot' });
      let body: unknown;
      try {
        body = JSON.parse(result.body);
      } catch {
        body = null;
      }
      if (result.status === 200 && isSnapshot(body)) {
        onSnapshot(body);
      }
      else {
        onFailure(result.status === 200 ? 'bad-answer' : 'service-failed');
      }
    } catch (error) {
      onFailure(failureOf(error));
    } finally {
      inflight = false;
      setTimeout(() => { void poll(); }, POLL_MS);
    }
  };
  void poll();
  let shown = isOnScreen(root);
  const onVisibility = (): void => {
    const next = isOnScreen(root);
    if (next && !shown) void poll();
    shown = next;
  };
  document.addEventListener('visibilitychange', onVisibility);
  return { refresh: () => { void poll(); } };
};

export const updateLocation = async (host: HostClient, location: string): Promise<boolean> => {
  try {
    const result = await host.serviceRequest({
      method: 'POST',
      path: '/location',
      body: JSON.stringify({ location }),
    });
    return result.status === 200;
  } catch {
    return false;
  }
};
