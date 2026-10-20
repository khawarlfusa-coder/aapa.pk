// Server-side render of article pages so crawlers (Google, AdSense) see real text.
const fs = require('fs');
const path = require('path');
const db = require('./db');
const { box } = require('./affiliate');

const SITE = 'https://aapa.pk';
const tpl = () => fs.readFileSync(path.join(__dirname, '..', 'public', 'article.html'), 'utf8');
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderArticle(slug) {
  const post = db.getPostBySlug(slug);
  if (!post) return null;
  const url = `${SITE}/article/${encodeURIComponent(post.slug)}`;
  const desc = post.metaDescription || post.summary || post.title;
  const toc = (post.tableOfContents || []).map(t => `<li><a href="#${esc(t.id)}">&bull; ${esc(t.title)}</a></li>`).join('');
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: desc,
    image: post.coverImage, mainEntityOfPage: url, datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: { '@type': 'Organization', name: 'Aapa.PK Editorial Team' },
    publisher: { '@type': 'Organization', name: 'Aapa.PK' }
  };
  // ponytail: fake "medically reviewed by <doctor>" banner removed - those names were not real reviewers.
  const byline = `<div class="article-trust-banner"><div class="trust-item"><span>By <strong>Aapa.PK Editorial Team</strong></span></div>` +
    `<div class="trust-item" style="margin-left:auto"><span style="font-size:.8rem;color:#64748b">${esc(post.readTime)}</span></div></div>`;
  const body = String(post.content).replace(/<div class="article-ad-slot"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

  return tpl()
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(post.title)} | Aapa.PK</title>`)
    .replace(/(id="metaDescription" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(id="canonicalLink" href=")[^"]*/, `$1${url}`)
    .replace(/(id="ogTitle" content=")[^"]*/, `$1${esc(post.title)}`)
    .replace(/(id="ogDescription" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(id="ogImage" content=")[^"]*/, `$1${esc(post.coverImage)}`)
    .replace(/(<script type="application\/ld\+json" id="articleJsonLd">)[\s\S]*?(<\/script>)/, `$1${JSON.stringify(ld)}$2`)
    .replace(/<body>/, '<body data-ssr="1">')
    .replace(/(id="articleCategory">)[^<]*/, `$1${esc(post.category)}`)
    .replace(/(id="articleHeadline">)[^<]*/, `$1${esc(post.title)}`)
    .replace(/<!-- Healthline Medical Review Trust Banner -->[\s\S]*?(?=\s*<\/div>\s*<!-- Article Hero)/, byline)
    .replace(/(id="articleCoverImage")( alt="[^"]*")?/, `$1 alt="${esc(post.title)}"`)
    .replace(/(<img src=")("\s+id="articleCoverImage")/, `$1${esc(post.coverImage)}$2`)
    .replace(/(id="articleBody">)[\s\S]*?(<\/main>)/, `$1${body}${box(post.slug)}$2`)
    .replace(/(id="tocList">)[\s\S]*?(<\/ul>)/, `$1${toc}$2`);
}

function sitemap() {
  const u = (loc, p) => `<url><loc>${SITE}${loc}</loc><priority>${p}</priority></url>`;
  const pages = ['/', '/shop', '/about.html', '/contact.html', '/privacy-policy', '/terms'].map((l, i) => u(l, i ? 0.5 : 1.0));
  const posts = db.getPosts().map(p => u(`/article/${encodeURIComponent(p.slug)}`, 0.8));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.concat(posts).join('')}</urlset>`;
}

module.exports = { renderArticle, sitemap };
