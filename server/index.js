const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const { renderArticle, sitemap } = require('./ssr');

const app = express();
const PORT = process.env.PORT || 3000;

// SEO: one canonical host (www -> apex)
app.use((req, res, next) => req.hostname === 'www.aapa.pk' ? res.redirect(301, 'https://aapa.pk' + req.originalUrl) : next());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SEO: server-rendered articles, old ?slug= URLs 301 to clean ones (must precede static)
app.get('/article.html', (req, res) => req.query.slug ? res.redirect(301, '/article/' + encodeURIComponent(req.query.slug)) : res.redirect(301, '/'));
app.get('/sitemap.xml', (req, res) => res.type('application/xml').send(sitemap()));

// Serve static assets from public
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api', apiRoutes);

// Fallback routing for html pages
app.get('/article/:slug', (req, res) => {
  const html = renderArticle(req.params.slug);
  if (!html) return res.status(404).sendFile(path.join(__dirname, '..', 'public', 'article.html'));
  res.send(html);
});

app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'contact.html')));

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'shop.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'checkout.html'));
});

app.get('/order-success', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'order-success.html'));
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'privacy-policy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'terms.html'));
});

app.get('/terms-of-use', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'terms.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/wp-login.php', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

app.get('/wp-admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Serve ads.txt for Google AdSense compliance
app.get('/ads.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '..', 'public', 'ads.txt'));
});

// Google Search Console Site Verification
app.get('/google8a653a38d28088ef.html', (req, res) => {
  res.type('text/html');
  res.sendFile(path.join(__dirname, '..', 'public', 'google8a653a38d28088ef.html'));
});

// Serve robots.txt for Search Engine Crawlers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '..', 'public', 'robots.txt'));
});

app.listen(PORT, () => {
  console.log(`=====================================================`);
  console.log(`🌿 Aapa.PK (Healthline-style Blog + COD Store) is running!`);
  console.log(`🌐 Website URL:  http://localhost:${PORT}`);
  console.log(`🛒 Shop Page:    http://localhost:${PORT}/shop.html`);
  console.log(`💳 COD Checkout: http://localhost:${PORT}/checkout.html`);
  console.log(`⚙️ WP Admin:     http://localhost:${PORT}/admin.html`);
  console.log(`=====================================================`);
});
