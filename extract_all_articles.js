const https = require('https');
const fs = require('fs');

const url = 'https://web.archive.org/cdx/search/cdx?url=aapa.pk/*&output=json&fl=original,timestamp,mimetype,statuscode&filter=statuscode:200&filter=mimetype:text/html&collapse=urlkey&limit=5000';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.log('Error status:', res.statusCode);
      console.log(data.slice(0, 500));
      return;
    }
    try {
      const rows = JSON.parse(data).slice(1);
      console.log('Total collapsed unique HTML pages:', rows.length);

      const posts = [];
      const ignoredPrefixes = [
        '/wp-content', '/wp-includes', '/wp-admin', '/wp-json', '/page/',
        '/category/', '/tag/', '/author/', '/feed', '/comments', '/trackback'
      ];

      rows.forEach(r => {
        const rawUrl = r[0].replace(/:80/, '');
        try {
          const u = new URL(rawUrl);
          const p = decodeURIComponent(u.pathname);
          if (p === '/' || p === '') return;
          if (ignoredPrefixes.some(pre => p.startsWith(pre))) return;
          if (p.includes('/feed/')) return;
          if (/\.(jpg|png|gif|css|js|xml)$/i.test(p)) return;

          const segments = p.split('/').filter(Boolean);
          // Check if date-based or single slug
          if (segments.length >= 1) {
            const slug = segments[segments.length - 1];
            if (slug.length > 3 && !slug.includes('page') && !/^\d+$/.test(slug)) {
              posts.push({
                slug,
                url: rawUrl,
                path: p,
                timestamp: r[1]
              });
            }
          }
        } catch(e) {}
      });

      // De-duplicate by slug
      const uniquePosts = [];
      const seen = new Set();
      posts.forEach(item => {
        if (!seen.has(item.slug)) {
          seen.add(item.slug);
          uniquePosts.push(item);
        }
      });

      console.log('Total unique blog posts identified:', uniquePosts.length);
      fs.writeFileSync('all_archived_posts.json', JSON.stringify(uniquePosts, null, 2), 'utf-8');
      uniquePosts.slice(0, 50).forEach((p, idx) => console.log(`${idx + 1}. ${p.slug}`));
    } catch (e) {
      console.error('Error parsing:', e.message);
    }
  });
}).on('error', err => console.error('Request error:', err.message));
