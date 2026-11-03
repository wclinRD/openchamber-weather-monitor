// Styles shared by both frames. Colours come from the host's --oc-* tokens.
export const BASE_STYLE = `
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
`;

export const PANEL_STYLE = `
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .location-name { font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .location-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .search { display: flex; gap: 6px; margin-top: 8px; }
  .search input { flex: 1; padding: 0 8px; border: 1px solid var(--oc-border); border-radius: 6px; font: 12px var(--oc-font); background: var(--oc-background); color: var(--oc-fg); font-weight: 500; }
  .search input::placeholder { color: color-mix(in srgb, var(--oc-fg) 65%, var(--oc-background)); }
  .search input:focus { outline: 2px solid var(--oc-primary); outline-offset: -1px; }
  .search button { padding: 0 12px; border-radius: 6px; border: 1px solid var(--oc-primary); background: color-mix(in srgb, var(--oc-primary) 22%, var(--oc-background)); color: var(--oc-primary); cursor: pointer; }
  .search button:hover, .search button:focus-visible { background: color-mix(in srgb, var(--oc-primary) 32%, var(--oc-background)); }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  .weather-row { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 0; }
  .weather-label { color: var(--oc-muted); font-size: 11px; }
  .weather-icon { font-size: 18px; }
  .weather-value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .weather-detail { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
  .forecast-day { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 0; }
  .forecast-day-icon { font-size: 14px; }
  .forecast-day-name { font-size: 11px; min-width: 60px; }
  .forecast-day-range { font-size: 11px; }
  .empty { color: var(--oc-muted); padding: 6px 2px; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;

export const STATUS_STYLE = `
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;
