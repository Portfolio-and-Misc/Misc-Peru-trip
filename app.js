/* ---------------------------------------------------------------
   Icons (inline SVG paths, Lucide-style, stroke = currentColor)
--------------------------------------------------------------- */
const ICON_PATHS = {
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.8c-.4.4-.2 1.1.3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.9c.2.5.9.7 1.3.3l.8-.7c.4-.3.6-.8.5-1.3z"/>',
  car: '<path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>',
  train: '<rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
  bus: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 12h18"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="16.5" cy="18" r="1.5"/><path d="M7 6V4h10v2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  suitcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  home: '<path d="m3 9 9-7 9 7"/><path d="M9 22V12h6v10"/><path d="M5 10v11h14V10"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>',
  loop: '<path d="M17 2.1 21 6l-4 3.9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 21.9-4-3.9 4-3.9"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
};
function icon(name, extraClass) {
  return `<svg class="icon${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 24 24">${ICON_PATHS[name] || ''}</svg>`;
}

/* ---------------------------------------------------------------
   Timeline data for all three itineraries
--------------------------------------------------------------- */
const ITINERARIES = {
  original: {
    summary: { icon: 'suitcase', text: '2 luggage moves total — Cusco → Ollantaytambo → Cusco' },
    route: {
      stops: [
        { name: 'Lima', sub: '1 night', milestone: false },
        { name: 'Cusco', sub: '1 night', milestone: false },
        { name: 'Ollantaytambo', sub: '2 nights', milestone: false, daytrip: { icon: 'loop', text: 'Sacred Valley + Urubamba horseback' } },
        { name: 'Aguas Calientes', sub: '1 night', milestone: false },
        { name: 'Cusco', sub: '2 nights', milestone: false, daytrip: { icon: 'mountain', text: 'Rainbow Mountain day trip' } },
        { name: 'Lima', sub: '2 nights', milestone: false },
      ],
      connectors: [
        { icons: ['plane'], label: 'flight (~1.5h)' },
        { icons: ['bus'], label: '~2h' },
        { icons: ['train'], label: '~2h' },
        { icons: ['train', 'bus'], label: '~4h' },
        { icons: ['plane'], label: 'flight' },
      ],
    },
    days: [
      { date: 'Nov 6, Fri', loc: 'Lima', dot: 'blue', transit: [], bullets: ['Work remotely, pack & prepare for travel'], badge: 'Lima' },
      { date: 'Nov 7, Sat', loc: 'Lima → Cusco', dot: 'blue',
        transit: [{ i: 'plane', t: 'Fly to Cusco, arrive midday' }],
        bullets: ['Easy afternoon exploring', 'Cusco Airbnb — alt: Lamay Lodge (breakfast included, hot tub, closer to Urubamba/Ollantaytambo)'],
        badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 8, Sun', loc: 'Cusco → Ollantaytambo', dot: 'blue',
        transit: [{ i: 'bus', t: 'Train or bus to Ollantaytambo' }],
        bullets: ['Fortress and town exploration'], badge: 'Ollantaytambo (9,000 ft)' },
      { date: 'Nov 9, Mon', loc: 'Sacred Valley → back to Ollantaytambo', dot: 'blue',
        transit: [{ i: 'car', t: '20 min drive to Urubamba' }],
        bullets: ['Pisac, Chinchero, Moray, Maras Salt Mines (if time allows)', 'Horseback riding through Sacred Valley & salt mines (horse girl moment)'],
        transit2: [{ i: 'car', t: '20 min drive back to Ollantaytambo' }], badge: 'Ollantaytambo (9,000 ft)' },
      { date: 'Nov 10, Tue', loc: 'Ollantaytambo → Aguas Calientes', dot: 'blue',
        transit: [{ i: 'train', t: 'Scenic train to Aguas Calientes' }],
        bullets: ['Explore Aguas Calientes town', 'Optional hot springs (or a half-day Machu Picchu this afternoon instead)'], badge: 'Aguas Calientes (7,000 ft)' },
      { date: 'Nov 11, Wed', loc: 'Machu Picchu → Cusco', dot: 'green',
        transit: [],
        bullets: ['Early entry — spend the morning exploring Machu Picchu'],
        transit2: [{ i: 'train', t: 'Train back to Cusco' }], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 12, Thu', loc: 'Rainbow Mountain ATV Tour', dot: 'orange', transit: [],
        bullets: ['Very early pickup, ~3–4 AM (possibly pushed to Fri)', 'Full-day ATV tour + mountain access, 16,000 ft', 'Return to Cusco'], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 13, Fri', loc: 'Cusco → Lima', dot: 'blue',
        transit: [{ i: 'plane', t: 'Flight Cusco → Lima (or Rainbow Mtn today if pushed)' }],
        bullets: ['Relax, enjoy final evening in Lima'], badge: 'Lima' },
      { date: 'Nov 14, Sat', loc: 'Lima', dot: 'blue', transit: [],
        bullets: ['Last full day — explore, shop, revisit favorites', 'Depart Lima ~11:00 PM (Elle departs 11/14 12 PM)'], badge: 'In flight' },
      { date: 'Nov 15, Sun', loc: 'Arrive USA', dot: 'blue', transit: [], bullets: ['Arrive ~9:30 AM'], badge: null },
    ],
  },

  cusco: {
    summary: { icon: 'suitcase', text: '1 luggage move total — Cusco held the whole trip' },
    route: {
      stops: [
        { name: 'Lima', sub: '1 night', milestone: false },
        { name: 'Cusco', sub: '3 nights', milestone: false, daytrip: { icon: 'loop', text: 'Ollantaytambo + Sacred Valley (Urubamba) day trips' } },
        { name: 'Aguas Calientes', sub: '1 night', milestone: false },
        { name: 'Cusco', sub: '2 nights', milestone: false, daytrip: { icon: 'mountain', text: 'Rainbow Mountain day trip' } },
      ],
      connectors: [
        { icons: ['plane'], label: 'flight (~1.5h)' },
        { icons: ['bus', 'train'], label: '~4h' },
        { icons: ['train', 'bus'], label: '~4h' },
      ],
    },
    days: [
      { date: 'Nov 6, Fri', loc: 'Lima', dot: 'blue', transit: [], bullets: ['Work remotely', 'Pack & prepare for travel'], badge: 'Lima' },
      { date: 'Nov 7, Sat', loc: 'Lima → Cusco', dot: 'blue',
        transit: [{ i: 'plane', t: 'Fly to Cusco, arrive midday' }],
        bullets: ['Easy afternoon exploring — light walk, no exertion'], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 8, Sun', loc: 'Cusco → Ollantaytambo day trip', dot: 'blue',
        transit: [{ i: 'bus', t: '~2 hr bus or train to Ollantaytambo' }],
        bullets: ['Fortress and town exploration'],
        transit2: [{ i: 'bus', t: '~2 hrs back to Cusco' }], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 9, Mon', loc: 'Sacred Valley day trip', dot: 'blue',
        transit: [{ i: 'car', t: '45 min to Urubamba' }],
        bullets: ['2–3 hr horseback ride through Sacred Valley & salt mines (or 5 hr tour incl. Maras + Moray)'],
        transit2: [{ i: 'car', t: '45 min drive back to Cusco' }], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 10, Tue', loc: 'Cusco → Aguas Calientes', dot: 'blue',
        transit: [{ i: 'bus', t: '2 hr bus to Ollantaytambo' }, { i: 'train', t: '2 hr train to Aguas Calientes' }],
        bullets: ['Explore Aguas Calientes town', 'Optional hot springs', 'Pack small bag only — main luggage stays at Cusco Airbnb'], badge: 'Aguas Calientes (7,000 ft)' },
      { date: 'Nov 11, Wed', loc: 'Machu Picchu → Cusco', dot: 'green',
        transit: [],
        bullets: ['Early entry ticket 7:00 AM (2B) — booked', 'Huayna Picchu hike 10:00 AM (3A) — booked', 'Early checkout'],
        transit2: [{ i: 'train', t: '2 hr train' }, { i: 'bus', t: '+ 2 hr bus back to Cusco (~4 hrs)' }], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 12, Thu', loc: 'Rainbow Mountain ATV Tour', dot: 'orange', transit: [],
        bullets: ['Very early pickup, ~3–4 AM (possibly pushed to Fri)', 'Full-day ATV tour + mountain access, 16,000 ft', 'Return to Cusco'], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 13, Fri', loc: 'Cusco → Lima', dot: 'blue',
        transit: [{ i: 'plane', t: 'Flight Cusco → Lima (or Rainbow Mtn today if pushed)' }],
        bullets: ['Relax, enjoy final evening in Lima'], badge: 'Lima' },
      { date: 'Nov 14, Sat', loc: 'Lima', dot: 'blue', transit: [],
        bullets: ['Last full day — explore, shop, revisit favorites', 'Depart Lima ~11:00 PM (Elle departs 11/14 12 PM)'], badge: 'In flight' },
      { date: 'Nov 15, Sun', loc: 'Arrive USA', dot: 'blue', transit: [], bullets: ['Arrive ~9:30 AM'], badge: null },
    ],
  },

  ollanta: {
    summary: { icon: 'suitcase', text: '2 luggage moves total — Ollantaytambo → Cusco is the extra one' },
    route: {
      stops: [
        { name: 'Lima', sub: '1 night', milestone: false },
        { name: 'Ollantaytambo', sub: '3 nights', milestone: false, daytrip: { icon: 'loop', text: 'Moray & Maras + optional horseback' } },
        { name: 'Aguas Calientes', sub: '1 night', milestone: false },
        { name: 'Cusco', sub: '3 nights', milestone: false, daytrip: { icon: 'loop', text: 'Pisac + Rainbow Mountain' } },
      ],
      connectors: [
        { icons: ['plane'], label: 'flight + drive (~1.5–2h)' },
        { icons: ['train'], label: 'board right from Ollantaytambo' },
        { icons: ['train', 'car'], label: '~4h' },
      ],
    },
    days: [
      { date: 'Nov 6, Fri', loc: 'Lima', dot: 'blue', transit: [], bullets: ['Work remotely', 'Pack & prepare for travel'], badge: 'Lima' },
      { date: 'Nov 7, Sat', loc: 'Lima → Cusco → Ollantaytambo', dot: 'blue',
        transit: [{ i: 'plane', t: 'Fly to Cusco, arrive midday' }, { i: 'car', t: 'Travel to Ollantaytambo (~1.5–2 hrs)' }],
        bullets: ['Prepare for elevation on arrival', 'Ollantaytambo Airbnb (9,000 ft) — alt: Lamay Lodge (breakfast included, hot tub, closer to Urubamba)'],
        badge: 'Ollantaytambo (9,000 ft)' },
      { date: 'Nov 8, Sun', loc: 'Ollantaytambo', dot: 'blue', transit: [],
        bullets: ['Light day — fortress and town exploration'],
        badge: 'Ollantaytambo (9,000 ft)' },
      { date: 'Nov 9, Mon', loc: 'Moray & Maras → back to Ollantaytambo', dot: 'blue',
        transit: [{ i: 'car', t: '20 min drive to Urubamba' }],
        bullets: ['2–3 hr horseback ride through Sacred Valley & salt mines (or 5 hr tour incl. Maras + Moray)'],
        transit2: [{ i: 'car', t: '20 min drive back to Ollantaytambo' }], badge: 'Ollantaytambo (9,000 ft)' },
      { date: 'Nov 10, Tue', loc: 'Ollantaytambo → Aguas Calientes', dot: 'blue',
        transit: [{ i: 'train', t: '~2 hr scenic train (Inca Rail / PeruRail)' }],
        bullets: ['Explore Aguas Calientes town', 'Optional hot springs', 'Pack a small bag — main luggage stays at Ollantaytambo Airbnb'],
        badge: 'Aguas Calientes (7,000 ft)' },
      { date: 'Nov 11, Wed', loc: 'Machu Picchu → Cusco', dot: 'green',
        transit: [],
        bullets: ['Early entry ticket 7:00 AM (2B) — booked', 'Huayna Picchu hike 10:00 AM (3A) — booked', 'Early checkout', '~2 hr train back to Ollantaytambo', 'Pick up bags from Ollantaytambo Airbnb or luggage locker'],
        transit2: [{ i: 'car', t: '~1.5–2 hr to Cusco (~4 hrs total)' }],
        badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 12, Thu', loc: 'Cusco → Pisac', dot: 'blue',
        transit: [{ i: 'car', t: 'Round trip by car' }],
        bullets: ['Pisac archaeological park + market', 'San Pedro Market? (back in Cusco)'],
        badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 13, Fri', loc: 'Rainbow Mountain ATV Tour', dot: 'orange', transit: [],
        bullets: ['Very early pickup, ~3–4 AM', 'Full-day adventure, 16,000 ft', 'Return to Cusco'], badge: 'Cusco (11,000 ft)' },
      { date: 'Nov 14, Sat', loc: 'Lima or Cusco → USA', dot: 'blue',
        transit: [{ i: 'plane', t: 'Flight to USA (via Lima, or direct from Cusco)' }],
        bullets: ['Enjoy your last day — explore, shop, revisit favorites', 'Depart ~11:00 PM (Elle departs 11/14 12 PM)'], badge: 'In flight' },
      { date: 'Nov 15, Sun', loc: 'Arrive USA', dot: 'blue', transit: [], bullets: ['Arrive ~9:30 AM'], badge: null },
    ],
  },
};

/* ---------------------------------------------------------------
   Render: summary pill
--------------------------------------------------------------- */
function renderSummary(el, summary) {
  el.innerHTML = `<div class="summary-pill">${icon(summary.icon)}<span>${summary.text}</span></div>`;
}

/* ---------------------------------------------------------------
   Render: route-at-a-glance chip flow
--------------------------------------------------------------- */
function renderRouteFlow(el, route) {
  let html = '<div class="route-flow">';
  route.stops.forEach((stop, i) => {
    html += `<div class="route-stop${stop.milestone ? ' milestone' : ''}">
      <div class="stop-chip">${stop.name}</div>
      <div class="stop-sub">${stop.sub}</div>
      ${stop.daytrip ? `<div class="route-daytrip">${icon(stop.daytrip.icon)}${stop.daytrip.text}</div>` : ''}
    </div>`;
    const conn = route.connectors[i];
    if (conn) {
      html += `<div class="route-connector">
        <div class="conn-icons">${conn.icons.map(ic => icon(ic)).join('')}</div>
        <div class="conn-line"></div>
        <div class="conn-label">${conn.label}</div>
      </div>`;
    }
  });
  html += '</div>';
  el.innerHTML = html;
}

/* ---------------------------------------------------------------
   Day-id helper — shared between the timeline and the map so a click on
   either side can find its counterpart ("Nov 7, Sat" and "Nov 7" both
   become "nov7").
--------------------------------------------------------------- */
function dayIdOf(str) {
  return str.split(',')[0].trim().toLowerCase().replace(/\s+/g, '');
}

/* ---------------------------------------------------------------
   Render: day-by-day timeline
--------------------------------------------------------------- */
function renderTimeline(el, days) {
  let html = '';
  days.forEach(day => {
    html += `<div class="day-row" data-dot="${day.dot}" data-day-id="${dayIdOf(day.date)}">
      <div class="dot-col"><div class="day-dot">${icon('pin')}</div></div>
      <div class="day-card">
        <div class="card-header">
          <h3>${day.date}</h3>
          <span class="loc-label">${day.loc}</span>
        </div>
        ${day.transit && day.transit.length ? `<ul class="transit-list">${day.transit.map(t => `<li>${icon(t.i)}<span>${t.t}</span></li>`).join('')}</ul>` : ''}
        ${day.bullets && day.bullets.length ? `<ul class="bullet-list">${day.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        ${day.transit2 && day.transit2.length ? `<ul class="transit-list">${day.transit2.map(t => `<li>${icon(t.i)}<span>${t.t}</span></li>`).join('')}</ul>` : ''}
        ${day.badge ? `<div class="badge">${icon('pin')}<span>${day.badge}</span></div>` : ''}
      </div>
    </div>`;
  });
  el.innerHTML = html;
}

/* ---------------------------------------------------------------
   Map — real interactive tile map (Leaflet + OpenStreetMap/CARTO tiles),
   real lat/lng for every town. No API key required.
--------------------------------------------------------------- */
const TOWNS = {
  aguas:      { lat: -13.1547, lng: -72.5254, label: 'Aguas Calientes / Machu Picchu' },
  ollanta:    { lat: -13.2583, lng: -72.2636, label: 'Ollantaytambo' },
  urubamba:   { lat: -13.3050, lng: -72.1167, label: 'Urubamba' },
  maras:      { lat: -13.2856, lng: -72.1500, label: 'Maras / Moray' },
  chinchero:  { lat: -13.3958, lng: -72.0522, label: 'Chinchero' },
  pisac:      { lat: -13.4194, lng: -71.8508, label: 'Pisac' },
  cusco:      { lat: -13.5320, lng: -71.9675, label: 'Cusco' },
  rainbow:    { lat: -13.8833, lng: -71.3000, label: 'Rainbow Mountain' },
};

// Where each town's label points, relative to its dot. Default is straight
// right, but several towns sit close enough to a neighbor (Urubamba is
// right next to Ollantaytambo, Maras/Chinchero are bunched together) that
// the default would collide with it — these get a different direction so
// the two labels open away from each other instead of overlapping. Some
// entries have separate `stop`/`emphasized` variants because Ollantaytambo
// is a single short line in one itinerary (a "stop") but a tall 3-line
// home-base block in another (dates + home icon + a stay-note) — the
// direction that clears a neighbor for the small version can run straight
// into the chip cluster for the tall one, so they need different escapes.
const TOWN_LABEL_DIR = {
  urubamba: { direction: 'right', offset: [8, -6] },
  maras: { direction: 'bottom', offset: [4, 22] },
  chinchero: { direction: 'bottom', offset: [0, 9] },
  ollanta: {
    stop: { direction: 'top', offset: [-4, -12] },
    emphasized: { direction: 'right', offset: [9, 0] },
  },
};
function labelPlacement(key, isEmphasized) {
  const entry = TOWN_LABEL_DIR[key];
  if (!entry) return { direction: 'right', offset: [9, 0] };
  if (entry.stop || entry.emphasized) return (isEmphasized ? entry.emphasized : entry.stop) || { direction: 'right', offset: [9, 0] };
  return entry;
}

// Each leg is one day's net travel, drawn as a wide flight-path-style arc
// from that day's start point to its end point — not a literal traced road.
// Reversed pairs (e.g. Nov 10 Cusco->Aguas and Nov 11 Aguas->Cusco) bow to
// opposite sides automatically, since the curve always bulges to the left
// of the direction of travel — flip start/end and the side flips too.
// Colors are distinct per leg (not reused) so every day reads at a glance;
// green stays reserved for the Machu Picchu day and orange for Rainbow Mountain.
const MAP_LEGS = {
  original: [
    { day: 'Nov 8', color: '#2563eb', from: 'cusco', to: 'ollanta', modes: ['bus'], duration: '~2h', bulge: 0.14, place: 'Ollantaytambo' },
    // Round trip to Urubamba and back to Ollantaytambo — no relocation to
    // Cusco that day. Same tuning as the identical leg on Ollantaytambo
    // Base (same two towns, same map): pinned just past Urubamba on the
    // return curve, top-left corner on the arc.
    { day: 'Nov 9', color: '#7c3aed', from: 'ollanta', stops: ['urubamba'], to: 'ollanta', modes: ['car'], duration: '~20m/leg', roundTrip: '~45m total', bulge: [0.30, 0.30], place: 'Urubamba', chipT: 0.6, chipAnchor: { ax: 0, ay: 0 }, via: 'also visits Pisac, Chinchero, Moray and Maras + horseback' },
    { day: 'Nov 10', color: '#0891b2', from: 'ollanta', to: 'aguas', modes: ['train'], duration: '~2h', bulge: 0.20, place: 'Aguas Calientes' },
    // Large sweeping arc along the bottom of the map instead of cutting
    // through the crowded Ollantaytambo/Sacred Valley cluster in the middle.
    { day: 'Nov 11', color: '#16a34a', from: 'aguas', stops: ['ollanta'], to: 'cusco', modes: ['train', 'bus'], duration: '~4h', bulge: [-0.9, -0.85], place: 'Cusco' },
    { day: 'Nov 12', color: '#d97706', from: 'cusco', to: 'rainbow', modes: ['car'], duration: '~2.5h', roundTrip: '~5h', bulge: 0.30, place: 'Rainbow Mountain' },
  ],

  cusco: [
    // Day trip out to Ollantaytambo and back, a loop from the Cusco base.
    { day: 'Nov 8', color: '#2563eb', from: 'cusco', stops: ['ollanta'], to: 'cusco', modes: ['bus'], duration: '~2h/leg', roundTrip: '~4h total', bulge: [0.25, 0.25], place: 'Ollantaytambo' },
    // Sacred Valley day trip via Urubamba (horseback to the salt mines /
    // Moray/Maras) — a separate loop from Nov 8's, opposite sign so the two
    // don't run on top of each other even though both head roughly west.
    { day: 'Nov 9', color: '#7c3aed', from: 'cusco', stops: ['urubamba'], to: 'cusco', modes: ['car'], duration: '~45m/leg', roundTrip: '~1.5h total', bulge: [-0.35, -0.35], place: 'Urubamba' },
    // 1st segment (Cusco->Ollantaytambo) is the same two points/direction as
    // Nov 8 — opposite sign so they read as nested arcs, not overlapping.
    { day: 'Nov 10', color: '#0891b2', from: 'cusco', stops: ['ollanta'], to: 'aguas', modes: ['bus', 'train'], duration: '~4h', bulge: [-0.40, 0.16], place: 'Aguas Calientes' },
    // Large sweeping arc along the bottom instead of cutting through the middle.
    { day: 'Nov 11', color: '#16a34a', from: 'aguas', stops: ['ollanta'], to: 'cusco', modes: ['train', 'bus'], duration: '~4h', bulge: [-0.9, -0.85], place: 'Cusco' },
    { day: 'Nov 12', color: '#d97706', from: 'cusco', to: 'rainbow', modes: ['car'], duration: '~2.5h', roundTrip: '~5h', bulge: 0.30, place: 'Rainbow Mountain' },
  ],

  ollanta: [
    { day: 'Nov 7', color: '#2563eb', from: 'cusco', to: 'ollanta', modes: ['car'], duration: '~1.5h', bulge: 0.14, place: 'Ollantaytambo' },
    // Nov 8 (fortress/town, optional horseback add-on) is a stay-only day,
    // no line. Nov 9 is just Moray/Maras — no Pisac or Chinchero on this day.
    // Pinned by hand just past Urubamba on the return leg (t=0.25 was wrong
    // — for this 2-segment loop that's only halfway to Urubamba, not past
    // it) with its top-left corner on the arc, per the exact spot marked.
    { day: 'Nov 9', color: '#7c3aed', from: 'ollanta', stops: ['urubamba'], to: 'ollanta', modes: ['car'], duration: '~20m/leg', roundTrip: '~40m total', bulge: [0.30, 0.30], place: 'Moray & Maras', chipT: 0.6, chipAnchor: { ax: 0, ay: 0 } },
    { day: 'Nov 10', color: '#0891b2', from: 'ollanta', to: 'aguas', modes: ['train'], duration: '~2h', bulge: 0.20, place: 'Aguas Calientes' },
    // Large sweeping arc along the bottom of the map instead of cutting
    // through the crowded Ollantaytambo/Sacred Valley cluster in the middle.
    { day: 'Nov 11', color: '#16a34a', from: 'aguas', stops: ['ollanta'], to: 'cusco', modes: ['train', 'car'], duration: '~4h', bulge: [-0.9, -0.85], place: 'Cusco' },
    // Cusco -> Pisac only — no Chinchero on this day trip.
    { day: 'Nov 12', color: '#be185d', from: 'cusco', stops: ['pisac'], to: 'cusco', modes: ['car'], duration: '~1h', roundTrip: '~2h total', bulge: [0.20, 0.20], place: 'Pisac' },
    { day: 'Nov 13', color: '#d97706', from: 'cusco', to: 'rainbow', modes: ['car'], duration: '~2.5h', roundTrip: '~5h', bulge: 0.30, place: 'Rainbow Mountain' },
  ],
};

// Date range(s) spent at each overnight base (used to emphasize those
// markers — day-trip-only points like Rainbow Mountain get no entry here
// and stay visually secondary). Cusco is visited twice non-contiguously in
// the Original plan, so it lists both stretches.
const MAP_STAYS = {
  original: { cusco: 'Nov 7 & 11–12', ollanta: 'Nov 8–9', aguas: 'Nov 10' },
  cusco: { cusco: 'Nov 7–9 & 11–12', aguas: 'Nov 10' },
  ollanta: { ollanta: 'Nov 7–9', aguas: 'Nov 10', cusco: 'Nov 11–13' },
};

// The single base with the most nights on this itinerary — flagged with a
// small home icon so it reads as "home base" at a glance.
const MAP_HOME = { original: 'cusco', cusco: 'cusco', ollanta: 'ollanta' };

// Days that involve no travel at all — you're just staying/exploring at a
// base you're already at (e.g. Nov 8 in Ollantaytambo). These get a plain
// day-only chip pinned at that town instead of a travel line, so every day
// in the itinerary is represented somewhere on the map, not just travel days.
const MAP_STAY_DAYS = {
  // Nov 7 is arrival day — land in Cusco, no further local travel that day.
  original: [{ day: 'Nov 7', at: 'cusco' }],
  cusco: [{ day: 'Nov 7', at: 'cusco' }],
  ollanta: [{ day: 'Nov 8', at: 'ollanta' }],
};

// Quadratic-bezier interpolation in lat/lng space (fine at this regional
// scale) that bulges to the left of the from->to direction.
function curvedLatLngs(start, end, bulgeFactor, steps = 32) {
  const dx = end.lng - start.lng, dy = end.lat - start.lat;
  const len = Math.hypot(dx, dy) || 0.0001;
  const leftPerp = { x: -dy / len, y: dx / len };
  const bulge = len * bulgeFactor;
  const control = {
    lat: (start.lat + end.lat) / 2 + leftPerp.y * bulge,
    lng: (start.lng + end.lng) / 2 + leftPerp.x * bulge,
  };
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, mt = 1 - t;
    pts.push([
      mt * mt * start.lat + 2 * mt * t * control.lat + t * t * end.lat,
      mt * mt * start.lng + 2 * mt * t * control.lng + t * t * end.lng,
    ]);
  }
  return pts;
}

// Legs that require a transfer (e.g. Cusco -> Ollantaytambo by car, then
// Ollantaytambo -> Aguas Calientes by train) route the curve through each
// real `stops` waypoint in turn, instead of one arc that skips over it —
// so the transfer point is visibly part of the path, not just named in a
// caption. `bulgeFactor` can be a single number (applied to every segment)
// or an array with one value per segment — needed when two other legs
// separately conflict with two different segments of the same leg, so a
// single sign/magnitude can't satisfy both at once.
function multiHopLatLngs(townKeys, bulgeFactor, steps = 28) {
  const bulges = Array.isArray(bulgeFactor) ? bulgeFactor : townKeys.slice(0, -1).map(() => bulgeFactor);
  let pts = [];
  for (let i = 0; i < townKeys.length - 1; i++) {
    const seg = curvedLatLngs(TOWNS[townKeys[i]], TOWNS[townKeys[i + 1]], bulges[i], steps);
    pts = pts.concat(i === 0 ? seg : seg.slice(1));
  }
  return pts;
}

function legChipHtml(leg) {
  const icons = leg.modes.map(m => `<svg class="icon leg-icon" viewBox="0 0 24 24">${ICON_PATHS[m] || ''}</svg>`).join('');
  return `<div class="leg-chip-row">
    <div class="day-pill" style="background:${leg.color}">
      <div class="pill-date">${leg.day}</div>
      <div class="pill-place">${leg.place}</div>
    </div>
    <div class="dur-pill${leg.roundTrip ? ' has-roundtrip' : ''}" style="--dur-color:${leg.color}">
      <div class="dur-main">${icons}<span>${leg.duration}</span></div>
      ${leg.roundTrip ? `<div class="dur-roundtrip">${leg.roundTrip} rt</div>` : ''}
    </div>
  </div>`;
}

const activeLeafletMaps = {};
const legMarkersByDay = {};
const legLinesByDay = {};
const mapBoundsByKey = {};
const mapContentBuilt = {};

function isTabVisible(legKey) {
  const panel = document.getElementById(`panel-${legKey}`);
  return !!panel && panel.classList.contains('active');
}

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// Rough box size for a leg's chip, from its actual text — used only to
// decide where it can land without covering a town label, not for layout.
function estimateChipBox(leg) {
  const leftW = Math.max(leg.day.length * 7 + 16, leg.place.length * 6 + 16);
  const rightW = leg.modes.length * 15 + leg.duration.length * 6 + 24;
  return { w: Math.max(90, leftW + rightW), h: leg.roundTrip ? 46 : 32 };
}

// Which point of the chip's box sits on the arc — (0.5,0.5) is dead center,
// (0,0.5) is the left edge, (0.5,0) is the top edge, etc. Searching across
// *all* of these (not just center) is what actually gives the chip freedom
// to land anywhere on the line, using whichever side reads clearest,
// instead of being forced to straddle the point evenly in both directions.
const CHIP_ANCHORS = [
  { ax: 0.5, ay: 0.5 }, { ax: 0.15, ay: 0.5 }, { ax: 0.85, ay: 0.5 },
  { ax: 0.5, ay: 0.15 }, { ax: 0.5, ay: 0.85 },
  { ax: 0.15, ay: 0.15 }, { ax: 0.85, ay: 0.15 }, { ax: 0.15, ay: 0.85 }, { ax: 0.85, ay: 0.85 },
];

// Town names must never move and must never be covered — so instead of a
// fixed 65%-along-the-path position centered on the line, this searches
// both *where along the path* the chip sits and *which point of the chip's
// own box* touches the arc there, and picks the first combination whose box
// doesn't overlap any town label's *actual measured* screen rect. Falls
// back to whichever combination overlaps the least, if none are fully clear.
function findClearChipPlacement(map, pts, avoidRects, boxW, boxH) {
  const fractions = [];
  for (let t = 0.62; t <= 0.92; t += 0.03) fractions.push(t);
  for (let t = 0.58; t >= 0.12; t -= 0.03) fractions.push(t);

  let best = null;
  let bestOverlap = Infinity;
  for (const anchor of CHIP_ANCHORS) {
    for (const t of fractions) {
      const idx = Math.min(pts.length - 1, Math.max(0, Math.floor(pts.length * t)));
      const latlng = pts[idx];
      const pt = map.latLngToContainerPoint(latlng);
      const box = {
        left: pt.x - boxW * anchor.ax, right: pt.x + boxW * (1 - anchor.ax),
        top: pt.y - boxH * anchor.ay, bottom: pt.y + boxH * (1 - anchor.ay),
      };
      let overlapArea = 0;
      for (const r of avoidRects) {
        if (!rectsOverlap(box, r)) continue;
        const ox = Math.min(box.right, r.right) - Math.max(box.left, r.left);
        const oy = Math.min(box.bottom, r.bottom) - Math.max(box.top, r.top);
        overlapArea += Math.max(0, ox) * Math.max(0, oy);
      }
      const candidate = { latlng, anchor };
      if (overlapArea === 0) return candidate;
      if (overlapArea < bestOverlap) { bestOverlap = overlapArea; best = candidate; }
    }
  }
  return best || { latlng: pts[Math.floor(pts.length * 0.65)], anchor: CHIP_ANCHORS[0] };
}

// Clicking a day chip on the map highlights + scrolls to that day's timeline
// card, and vice versa — both sides call this with the same itinerary key
// and day id ("nov7") so they always agree on what's selected. The active
// day's chip and route line pop (full color, thicker, brought to front)
// while every other day dims down, so the selection is obvious even with
// several overlapping colored lines on screen at once. Pass dayId as null
// to clear the selection entirely (nothing highlighted, nothing dimmed).
function setActiveDay(itKey, dayId) {
  const panel = document.getElementById(`panel-${itKey}`);
  if (panel) {
    let targetRow = null;
    panel.querySelectorAll('.day-row[data-day-id]').forEach(row => {
      const isMatch = dayId !== null && row.dataset.dayId === dayId;
      row.classList.toggle('active', isMatch);
      if (isMatch) targetRow = row;
    });
    if (targetRow) targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const markers = legMarkersByDay[itKey] || {};
  Object.entries(markers).forEach(([id, marker]) => {
    const markerEl = marker.getElement();
    if (!markerEl) return;
    markerEl.classList.toggle('active', id === dayId);
    markerEl.classList.toggle('dimmed', dayId !== null && id !== dayId);
  });

  const lines = legLinesByDay[itKey] || {};
  Object.entries(lines).forEach(([id, layers]) => {
    const isActive = id === dayId;
    layers.forEach(layer => layer.setStyle({ opacity: dayId === null ? 1 : (isActive ? 1 : 0.2) }));
    if (isActive) layers.forEach(layer => layer.bringToFront());
  });

  const mapContainer = document.getElementById(`leaflet-${itKey}`);
  if (mapContainer) {
    mapContainer.querySelectorAll('.stay-chip[data-day-id]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.dayId === dayId);
    });
  }

  const map = activeLeafletMaps[`leaflet-${itKey}`];
  if (map && markers[dayId]) map.panTo(markers[dayId].getLatLng());
}

// Builds everything inside the map (town labels, chips, lines) — but only
// once the container actually has real on-screen dimensions. A map created
// while its tab is hidden (display:none) has a zero-size container, so both
// fitBounds and the collision math (which needs real screen coordinates)
// would be meaningless if run then. If the container isn't visible yet,
// this just returns and waits for the tab-click handler to call it again
// once the tab is actually shown.
function buildMapMarkers(legKey) {
  if (mapContentBuilt[legKey]) return;
  const map = activeLeafletMaps[`leaflet-${legKey}`];
  const legs = MAP_LEGS[legKey];
  if (!map || !legs) return;
  const container = map.getContainer();
  if (container.offsetWidth === 0 || container.offsetHeight === 0) return;

  mapContentBuilt[legKey] = true;
  const mapId = `leaflet-${legKey}`;

  map.invalidateSize();
  map.fitBounds(mapBoundsByKey[legKey], { padding: [70, 70] });

  const stays = MAP_STAYS[legKey] || {};
  const homeKey = MAP_HOME[legKey];
  const stayDaysByTown = {};
  (MAP_STAY_DAYS[legKey] || []).forEach(sd => {
    (stayDaysByTown[sd.at] = stayDaysByTown[sd.at] || []).push(sd);
  });

  // Every town actually touched by this itinerary — whether it's a leg
  // endpoint or just a `stops` waypoint along the way — gets emphasized
  // (bold, dark, clearly labeled). The only visual distinction is size:
  // overnight bases (in `stays`) are the big, dominant labels; every other
  // stop (a day-trip destination like Rainbow Mountain, or a real waypoint
  // like Ollantaytambo on a train-transfer day) is bold too, just smaller —
  // nothing relies on the basemap's own place-name labels anymore.
  const touchedTowns = new Set();
  legs.forEach(leg => {
    touchedTowns.add(leg.from);
    if (leg.to) touchedTowns.add(leg.to);
    (leg.stops || []).forEach(s => touchedTowns.add(s));
  });

  Object.entries(TOWNS).forEach(([key, t]) => {
    if (!touchedTowns.has(key)) return;
    const dateRange = stays[key];
    const isHome = key === homeKey;
    const { direction, offset } = labelPlacement(key, Boolean(dateRange));
    // Icon + date range sits above the (bigger) town name, and the home
    // base gets a house icon in place of the moon rather than alongside it.
    const nightsLine = dateRange
      ? `<div class="town-nights"><svg class="icon leg-icon ${isHome ? 'home-icon' : 'moon-icon'}" viewBox="0 0 24 24">${isHome ? ICON_PATHS.home : ICON_PATHS.moon}</svg>${dateRange}</div>`
      : '';
    // Stay-only days (no travel) attach directly under this town's own
    // name — same label block, not a separately-positioned map marker —
    // so they always sit exactly where the town is, not at some offset.
    const stayChipsHtml = (stayDaysByTown[key] || [])
      .map(sd => `<div class="stay-chip" data-day-id="${dayIdOf(sd.day)}">${sd.day}</div>`)
      .join('');
    L.circleMarker([t.lat, t.lng], {
      radius: dateRange ? 9 : 6,
      color: '#1f2328', weight: dateRange ? 3 : 2, fillColor: '#fff', fillOpacity: 1,
    }).addTo(map)
      .bindTooltip(
        `${nightsLine}<div class="town-name">${t.label}</div>${stayChipsHtml}`,
        { permanent: true, direction, offset, className: dateRange ? 'town-label emphasized' : 'town-label stop' }
      );
  });

  // Town labels are now in the DOM at their final on-screen position (the
  // view was already fitted above) — measure their real rects so leg chips
  // can be placed somewhere that doesn't cover any of them.
  const containerBox = container.getBoundingClientRect();
  const avoidRects = [];
  document.querySelectorAll(`#${mapId} .town-label`).forEach(elLabel => {
    const r = elLabel.getBoundingClientRect();
    avoidRects.push({ left: r.left - containerBox.left, right: r.right - containerBox.left, top: r.top - containerBox.top, bottom: r.bottom - containerBox.top });
  });

  legMarkersByDay[legKey] = {};
  legLinesByDay[legKey] = {};
  legs.forEach(leg => {
    const townKeys = [leg.from, ...(leg.stops || []), leg.to];
    const pts = townKeys.length > 2 ? multiHopLatLngs(townKeys, leg.bulge) : curvedLatLngs(TOWNS[leg.from], TOWNS[leg.to], leg.bulge);
    const dash = '13 10';
    const whiteLine = L.polyline(pts, { color: '#ffffff', weight: 6.5, opacity: 0.9, lineCap: 'round', dashArray: dash }).addTo(map);
    const colorLine = L.polyline(pts, { color: leg.color, weight: 4, opacity: 1, lineCap: 'round', dashArray: dash }).addTo(map);
    const { w, h } = estimateChipBox(leg);
    // A leg can pin its own {chipT, chipAnchor} to override the auto-search
    // — useful when the "least overlap" fallback picks a worse spot than a
    // known-good one a human already found by eye.
    let mid, anchor;
    if (leg.chipAnchor) {
      const idx = Math.min(pts.length - 1, Math.max(0, Math.floor(pts.length * (leg.chipT ?? 0.65))));
      mid = pts[idx];
      anchor = leg.chipAnchor;
    } else {
      ({ latlng: mid, anchor } = findClearChipPlacement(map, pts, avoidRects, w, h));
    }
    const dId = dayIdOf(leg.day);
    // iconAnchor is real pixels (unlike CSS transform: translate(-50%,-50%),
    // which — on a deliberately zero-size icon box — resolves percentages
    // against that zero size and does nothing) so this is what actually
    // lets the chosen anchor point land exactly on the arc.
    const marker = L.marker(mid, {
      icon: L.divIcon({ className: 'leg-chip-wrap', html: legChipHtml(leg), iconSize: [w, h], iconAnchor: [w * anchor.ax, h * anchor.ay] }),
      interactive: true,
    }).addTo(map).on('click', (e) => { L.DomEvent.stopPropagation(e); setActiveDay(legKey, dId); });
    legMarkersByDay[legKey][dId] = marker;
    legLinesByDay[legKey][dId] = [whiteLine, colorLine];
  });

  // Stay-only-day chips are plain HTML inside the town's tooltip (added
  // above), not Leaflet markers. Permanent tooltips don't actually render
  // their DOM synchronously with bindTooltip() (that assumption was wrong
  // and silently broke this) — deferring a tick is what makes the query
  // reliably find the element.
  Object.values(stayDaysByTown).flat().forEach(sd => {
    const dId = dayIdOf(sd.day);
    setTimeout(() => {
      const chip = document.querySelector(`#${mapId} .stay-chip[data-day-id="${dId}"]`);
      if (chip) chip.addEventListener('click', (e) => { e.stopPropagation(); setActiveDay(legKey, dId); });
    }, 0);
  });

  // Clicking empty map space (not a chip, both of which stop propagation
  // above) clears the current selection.
  map.on('click', () => setActiveDay(legKey, null));
}

function renderMap(el, legKey) {
  if (typeof L === 'undefined') {
    el.innerHTML = `<div class="map-placeholder">Map couldn't load — the Leaflet map library didn't load from its CDN (no internet connection, or it's blocked). Reload the page once you're back online; everything else here still works.</div>`;
    return;
  }

  const legs = MAP_LEGS[legKey];
  if (!legs) {
    el.innerHTML = `<div class="map-placeholder">Map coming soon for this itinerary — style is being finalized on the Original Plan tab first.</div>`;
    return;
  }

  const viaNotes = legs.filter(l => l.via).map(l => `<strong style="color:${l.color}">${l.day}</strong> ${l.via}`).join(' &nbsp;·&nbsp; ');
  const mapId = `leaflet-${legKey}`;
  el.innerHTML = `<div class="map-wrap"><div class="leaflet-map" id="${mapId}"></div>
    <div class="map-note">Drag or use the +/− controls to zoom or pan (Rainbow Mountain is on the map, just south-east — zoom out to see it). Curved lines show each day's overall travel, not the literal road; small gray dots mark a real stop along the way.${viaNotes ? `<br>${viaNotes}` : ''}<br>Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors.</div>
  </div>`;

  if (activeLeafletMaps[mapId]) { activeLeafletMaps[mapId].remove(); delete activeLeafletMaps[mapId]; }
  mapContentBuilt[legKey] = false;

  const map = L.map(mapId, { scrollWheelZoom: false });
  activeLeafletMaps[mapId] = map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Bounds only need real lat/lng, not a rendered view, so they can be
  // computed right away regardless of whether this tab is visible yet.
  const touchedTowns = new Set();
  legs.forEach(leg => {
    touchedTowns.add(leg.from);
    if (leg.to) touchedTowns.add(leg.to);
    (leg.stops || []).forEach(s => touchedTowns.add(s));
  });
  const bounds = [];
  Object.entries(TOWNS).forEach(([key, t]) => {
    if (touchedTowns.has(key) && key !== 'rainbow') bounds.push([t.lat, t.lng]);
  });
  mapBoundsByKey[legKey] = bounds;

  // Deferred a frame so the container has its final laid-out size before
  // trying to build — but for a hidden tab even that isn't enough (still
  // display:none a frame later), so buildMapMarkers itself checks real
  // dimensions and simply no-ops if it's not visible yet; the tab-switch
  // handler calls it again once the tab is actually shown.
  requestAnimationFrame(() => buildMapMarkers(legKey));
}

/* ---------------------------------------------------------------
   Init
--------------------------------------------------------------- */
function init() {
  Object.entries(ITINERARIES).forEach(([key, data]) => {
    // Each step is isolated: a failure in one (e.g. the map, if Leaflet's
    // CDN script didn't load) must never take down the rest of this tab
    // or the tabs after it.
    try { renderSummary(document.getElementById(`summary-${key}`), data.summary); }
    catch (e) { console.error('renderSummary failed for', key, e); }

    try { renderRouteFlow(document.getElementById(`route-${key}`), data.route); }
    catch (e) { console.error('renderRouteFlow failed for', key, e); }

    try { renderMap(document.getElementById(`map-${key}`), key); }
    catch (e) {
      console.error('renderMap failed for', key, e);
      const mapEl = document.getElementById(`map-${key}`);
      if (mapEl) mapEl.innerHTML = `<div class="map-placeholder">Map couldn't load (the Leaflet library may not have loaded — check your internet connection and reload). Everything else on this page is unaffected.</div>`;
    }

    try {
      renderTimeline(document.getElementById(`timeline-${key}`), data.days);
      document.querySelectorAll(`#panel-${key} .day-row[data-day-id]`).forEach(row => {
        row.addEventListener('click', () => setActiveDay(key, row.dataset.dayId));
      });
    } catch (e) { console.error('renderTimeline failed for', key, e); }
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add('active');
      // A map created while its tab was hidden never got its markers built
      // (buildMapMarkers no-ops on a zero-size container) — build it now
      // that the container is actually visible and measurable. If it was
      // already built, just re-fit: invalidateSize() alone only adjusts for
      // the new pixel size, it doesn't restore the intended view.
      const tabKey = btn.dataset.tab;
      const leafletMap = activeLeafletMaps[`leaflet-${tabKey}`];
      if (leafletMap) {
        setTimeout(() => {
          if (!mapContentBuilt[tabKey]) {
            buildMapMarkers(tabKey);
          } else {
            leafletMap.invalidateSize();
            const bounds = mapBoundsByKey[tabKey];
            if (bounds && bounds.length) leafletMap.fitBounds(bounds, { padding: [70, 70] });
          }
        }, 0);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
