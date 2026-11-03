// Status section for the Work Status panel: shows current temperature and condition.
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { startPolling } from '../shared/client.ts';
import { formatTemperature, formatWmoCondition } from '../shared/format.ts';
import { el } from '../shared/dom.ts';
import { BASE_STYLE, STATUS_STYLE } from '../shared/style.ts';
import type { WeatherSnapshot } from '../shared/types.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

const style = document.createElement('style');
style.textContent = BASE_STYLE + STATUS_STYLE;
document.head.append(style);

const line = el('div', 'line', '', [
  el('span', 'what', '天氣'),
  el('span', 'value num', '—'),
]);

const note = el('div', 'note', '載入中…');
root.append(line, note);

let started = false;

const render = (snapshot: WeatherSnapshot): void => {
  const valueEl = line.querySelector<HTMLElement>('.value')!;
  if (snapshot.current) {
    const cond = formatWmoCondition(snapshot.current.weather_code);
    valueEl.textContent = `${snapshot.location?.name ?? '—'} ${formatTemperature(snapshot.current.temperature_2m)} · ${cond.label}`;
  } else {
    valueEl.textContent = '—';
  }
  note.hidden = !snapshot.error;
  note.className = snapshot.error ? 'note error' : 'note';
  note.textContent = snapshot.error ?? '載入中…';
};

const showFailure = (failure: string): void => {
  note.hidden = false;
  note.className = 'note error';
  note.textContent = failure;
};

host.onReady(async (context) => {
  applyHostReady(context, document.documentElement);
  if (started) return;
  started = true;
  const { refresh } = startPolling(host, root, (snapshot) => {
    render(snapshot);
  }, (failure) => {
    showFailure(failure);
  });
  void refresh();
});

new ResizeObserver(() => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  void host.setHeight(height).catch(() => undefined);
}).observe(root);
