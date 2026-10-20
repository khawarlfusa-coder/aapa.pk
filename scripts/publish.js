// Usage: node scripts/publish.js content/batch1.js
// Adds new articles; an existing slug is rewritten in place to data/posts.json. Commit + push to deploy on Vercel.
const fs = require('fs');
const path = require('path');

const COVERS = {
  'Nutrition & Desi Recipes': 'photo-1533089860892-a7c6f0a88666',
  'Weight Loss & Diet': 'photo-1513558161293-cdaf765ed2fd',
  'Beauty & Skin Care': 'photo-1550583724-b2692b85b150',
  'Gharelu Totkay & Remedies': 'photo-1498837167922-ddd27525d352',
  'Health & Disease Prevention': 'photo-1522337360788-8b13dee7a37e'
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function build(a, date) {
  const toc = a.sections.map((s, i) => ({ id: 's' + (i + 1), title: `${i + 1}. ${s.h}` }));
  if (a.refs) toc.push({ id: 'refs', title: 'Hawalay (Sources)' });
  const words = a.sections.map(s => s.p.join(' ')).join(' ').split(/\s+/).length;
  const content =
    `<div class="article-takeaways"><h4>Key Takeaways</h4><ul>${a.takeaways.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` +
    a.sections.map((s, i) => `<h2 id="s${i + 1}">${i + 1}. ${esc(s.h)}</h2>` + s.p.map(p => `<p>${esc(p)}</p>`).join('')).join('') +
    (a.refs ? `<h2 id="refs">Hawalay (Sources)</h2><ul>${a.refs.map(r => `<li><a href="${r[1]}" target="_blank" rel="nofollow noopener">${esc(r[0])}</a></li>`).join('')}</ul>` : '') +
    `<p><em>Note: Yeh maloomat sirf aam agahi ke liye hai, ilaj ka mutabadal nahi. Koi bimari, hamal, ya musalsal alamaat hon to doctor se zaroor mashwara karein.</em></p>`;
  return {
    id: 'post_' + a.slug.slice(0, 40), title: a.title, slug: a.slug, category: a.category, summary: a.summary,
    author: { name: 'Aapa.PK Editorial Team', role: 'Editorial Team' },
    readTime: Math.max(3, Math.round(words / 180)) + ' min read', evidenceLevel: a.evidence || 'General health guidance',
    coverImage: `https://images.unsplash.com/${COVERS[a.category]}?auto=format&fit=crop&w=1000&q=80`,
    featured: false, tags: a.tags, tableOfContents: toc, content, createdAt: date, updatedAt: date,
    metaDescription: a.summary
  };
}

const file = path.resolve(process.argv[2]);
const batch = require(file);
const dbFile = path.join(__dirname, '..', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
let added = 0;
batch.forEach((a, i) => {
  const old = posts.findIndex(p => p.slug === a.slug);
  const d = new Date(Date.now() - i * 3600e3).toISOString();
  if (old >= 0) { const b = build(a, posts[old].createdAt); b.updatedAt = d; posts[old] = b; added++; return; } // rewrite in place
  posts.unshift(build(a, d)); added++;
});
fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2));
console.log(`added ${added} of ${batch.length}`);
