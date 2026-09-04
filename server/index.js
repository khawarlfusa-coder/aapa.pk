const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api', apiRoutes);

// Fallback routing for html pages
app.get('/article/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

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

app.listen(PORT, () => {
  console.log(`=====================================================`);
  console.log(`🌿 Aapa.PK (Healthline-style Blog + COD Store) is running!`);
  console.log(`🌐 Website URL:  http://localhost:${PORT}`);
  console.log(`🛒 Shop Page:    http://localhost:${PORT}/shop.html`);
  console.log(`💳 COD Checkout: http://localhost:${PORT}/checkout.html`);
  console.log(`⚙️ WP Admin:     http://localhost:${PORT}/admin.html`);
  console.log(`=====================================================`);
});
