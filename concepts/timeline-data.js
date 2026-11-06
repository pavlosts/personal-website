const NOW = 2026 + 10.2 / 12;

const CATS = {
  design:   { label: 'Product design', color: '#2F6B5A' },
  writing:  { label: 'Writing',        color: '#C08A2E' },
  hobby:    { label: 'Hobbies',        color: '#C2573C' },
  interest: { label: 'New interests',  color: '#4F63B0' },
};

const BRANCHES = [
  { id: 'design',  cat: 'design',   name: 'Product design',    start: '2019-03', end: null },
  { id: 'music',   cat: 'hobby',    name: 'Ambient music',     start: '2021-05', end: '2022-02' },
  { id: 'photo',   cat: 'hobby',    name: 'Film photography',  start: '2022-06', end: '2024-09' },
  { id: 'writing', cat: 'writing',  name: 'Writing in public', start: '2023-11', end: null },
  { id: 'print',   cat: 'interest', name: '3D printing',       start: '2025-01', end: '2025-11' },
  { id: 'climb',   cat: 'hobby',    name: 'Bouldering',        start: '2025-03', end: null },
  { id: 'swift',   cat: 'interest', name: 'SwiftUI',           start: '2026-07', end: null },
];

const EVENTS = [
  { b: 'design',  d: '2019-03-04', t: 'Switched from graphic to product design', kind: 'start' },
  { b: 'design',  d: '2020-03-02', t: 'First product design role, at a small startup' },
  { b: 'design',  d: '2021-09-14', t: 'Led my first design system' },
  { b: 'design',  d: '2023-02-01', t: 'Senior designer on a remote team' },
  { b: 'design',  d: '2025-06-01', t: 'Went independent' },
  { b: 'design',  d: '2026-08-20', t: 'Three months of fractional design' },
  { b: 'design',  d: '2026-09-20', t: 'Started building a decision log tool' },

  { b: 'music',   d: '2021-05-10', t: 'Bought a synth, started making ambient music', kind: 'start' },
  { b: 'music',   d: '2021-11-03', t: 'Released three tracks for nobody' },
  { b: 'music',   d: '2022-02-12', t: 'Stopped. Listening is enough for now.', kind: 'end' },

  { b: 'photo',   d: '2022-06-18', t: 'Bought a used film camera', kind: 'start' },
  { b: 'photo',   d: '2023-04-09', t: 'Film trip to Lisbon' },
  { b: 'photo',   d: '2023-10-22', t: 'Developed my own film at home' },
  { b: 'photo',   d: '2024-09-01', t: 'The camera stayed in the drawer', kind: 'end' },

  { b: 'writing', d: '2023-11-05', t: 'First post on this site', kind: 'start' },
  { b: 'writing', d: '2024-05-12', t: 'Ten posts in' },
  { b: 'writing', d: '2025-11-05', t: 'One year of writing here' },
  { b: 'writing', d: '2026-09-30', t: 'Naming things is half the interface' },
  { b: 'writing', d: '2026-10-12', t: 'Rebuilt this site with less' },
  { b: 'writing', d: '2026-11-02', t: 'Defaults are the real design' },

  { b: 'print',   d: '2025-01-15', t: 'Bought a 3D printer', kind: 'start' },
  { b: 'print',   d: '2025-05-20', t: 'Printed a desk organiser that works' },
  { b: 'print',   d: '2025-11-02', t: 'Sold the printer. Fun, not for me.', kind: 'end' },

  { b: 'climb',   d: '2025-03-08', t: 'First time bouldering', kind: 'start' },
  { b: 'climb',   d: '2025-09-14', t: 'Climbing twice a week' },
  { b: 'climb',   d: '2026-10-19', t: 'Sent my first V4' },

  { b: 'swift',   d: '2026-07-03', t: 'Started learning SwiftUI', kind: 'start' },
  { b: 'swift',   d: '2026-10-28', t: 'First prototype running on my phone' },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const yearOf = s => { const [y, m = 1, d = 1] = s.split('-').map(Number); return y + (m - 1) / 12 + (d - 1) / 365; };
const fmt = s => { const [y, m] = s.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; };
const branch = id => BRANCHES.find(b => b.id === id);
const colorOf = id => CATS[branch(id).cat].color;
EVENTS.forEach(e => { e.y = yearOf(e.d); e.branch = branch(e.b); });
EVENTS.sort((a, b) => b.y - a.y);
BRANCHES.forEach(b => {
  const ys = EVENTS.filter(e => e.b === b.id).map(e => e.y);
  b.ys = Math.min(...ys);
  b.ye = b.end ? Math.max(...ys) : null;
  b.count = ys.length;
});
