// Usage: node scripts/make_og.js [--all]
// Makes a 1200x630 share image per article at public/og/<slug>.png (Facebook/WhatsApp link previews).
// Default: only posts without an image yet and created in 2026. --all: every post.
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const OUT = path.join(__dirname, '..', 'public', 'og');
fs.mkdirSync(OUT, { recursive: true });
const posts = require('../data/posts.json');

const COLORS = { // [dark, light] per category
  'Weight Loss & Diet': ['#7c2d12', '#ea580c'],
  'Beauty & Skin Care': ['#831843', '#db2777'],
  'Gharelu Totkay & Remedies': ['#14532d', '#16a34a'],
  'Health & Disease Prevention': ['#1e3a8a', '#2563eb'],
  'Nutrition & Desi Recipes': ['#713f12', '#ca8a04']
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function wrap(t, max) {
  const lines = []; let cur = '';
  for (const w of t.split(/\s+/)) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}
function svg(p) {
  const [d, l] = COLORS[p.category] || ['#0f172a', '#0f766e'];
  const lines = wrap(p.title.replace(/:.*$/, '') .length > 18 ? p.title.replace(/:.*$/, '') : p.title, 22);
  const text = lines.map((ln, i) => `<text x="70" y="${250 + i * 92}" font-size="76" font-weight="800" fill="#fff">${esc(ln)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Arial, Helvetica, sans-serif">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${d}"/><stop offset="1" stop-color="${l}"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/><circle cx="1080" cy="80" r="260" fill="#fff" opacity=".07"/><circle cx="1180" cy="560" r="180" fill="#fff" opacity=".07"/>
<rect x="70" y="70" rx="22" ry="22" width="${Math.min(620, 40 + p.category.length * 17)}" height="52" fill="#fff" opacity=".18"/>
<text x="92" y="106" font-size="28" font-weight="700" fill="#fff">${esc(p.category.toUpperCase())}</text>
${text}
<text x="70" y="575" font-size="40" font-weight="800" fill="#fff">Aapa<tspan fill="#fde047">.PK</tspan></text>
<text x="1130" y="575" font-size="26" fill="#fff" opacity=".85" text-anchor="end">Sources cited  |  Roman Urdu health guides</text>
</svg>`;
}

const all = process.argv.includes('--all');
let n = 0;
for (const p of posts) {
  const f = path.join(OUT, p.slug + '.png');
  if (fs.existsSync(f) || (!all && !String(p.createdAt).startsWith('2026'))) continue;
  fs.writeFileSync(f, new Resvg(svg(p), { fitTo: { mode: 'width', value: 1200 } }).render().asPng());
  n++;
}
console.log(`og images made: ${n}`);
