const express = require('express');
const router = express.Router();
const db = require('../db');

// --- POSTS (Blog) ---
router.get('/posts', (req, res) => {
  let posts = db.getPosts();
  const { category, search, featured } = req.query;

  if (category && category !== 'All') {
    posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (featured === 'true') {
    posts = posts.filter(p => p.featured === true);
  }

  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  res.json(posts);
});

router.get('/posts/:slug', (req, res) => {
  const post = db.getPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(post);
});

router.post('/posts', (req, res) => {
  const { title, category, summary, content, coverImage, authorName, reviewerName, reviewerCredentials } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = db.createPost({
    title,
    category: category || 'Wellness',
    summary: summary || title,
    content,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80',
    readTime: `${Math.max(3, Math.ceil(content.split(/\s+/).length / 180))} min read`,
    evidenceLevel: 'Evidence-Based Editorial',
    featured: false,
    author: {
      name: authorName || 'Editorial Health Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Staff Medical Writer'
    },
    reviewer: {
      name: reviewerName || 'Dr. Debra Rose Wilson, PhD',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      credentials: reviewerCredentials || 'Medical Review Board'
    },
    tableOfContents: []
  });

  res.status(201).json(newPost);
});

router.delete('/posts/:id', (req, res) => {
  db.deletePost(req.params.id);
  res.json({ success: true });
});

// --- PRODUCTS (Shop) ---
router.get('/products', (req, res) => {
  let products = db.getProducts();
  const { category, search } = req.query;

  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  res.json(products);
});

router.get('/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

router.post('/products', (req, res) => {
  const { name, category, price, originalPrice, description, image, badge } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = db.createProduct({
    name,
    category: category || 'Daily Wellness',
    price: parseFloat(price),
    originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price) * 1.25,
    description: description || 'High-quality tested wellness formulation.',
    image: image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    badge: badge || 'New Arrival',
    rating: 5.0,
    reviewsCount: 1,
    codAvailable: true,
    benefits: ['100% Guaranteed Purity', 'Physician Approved', 'Free Cash on Delivery'],
    stock: 50
  });

  res.status(201).json(newProduct);
});

router.delete('/products/:id', (req, res) => {
  db.deleteProduct(req.params.id);
  res.json({ success: true });
});

// --- ORDERS (COD Checkout) ---
router.post('/orders', (req, res) => {
  const { customerName, customerPhone, customerAddress, notes, items } = req.body;

  if (!customerName || !customerName.trim()) {
    return res.status(400).json({ error: 'Please provide your Full Name.' });
  }
  if (!customerPhone || !customerPhone.trim()) {
    return res.status(400).json({ error: 'Please provide a valid Phone Number for COD courier confirmation.' });
  }
  if (!customerAddress || !customerAddress.trim()) {
    return res.status(400).json({ error: 'Please provide your complete Delivery Address.' });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Your cart is empty.' });
  }

  // Calculate Subtotal & Total
  let subtotal = 0;
  items.forEach(item => {
    subtotal += (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
  });

  const order = db.createOrder({
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    customerAddress: customerAddress.trim(),
    notes: notes ? notes.trim() : '',
    items,
    subtotal: subtotal.toFixed(2),
    shipping: 0.00, // Free COD shipping
    total: subtotal.toFixed(2)
  });

  res.status(201).json({
    success: true,
    message: 'Your Cash on Delivery order has been successfully placed!',
    order
  });
});

router.get('/orders', (req, res) => {
  const orders = db.getOrders();
  res.json(orders);
});

router.get('/orders/:id', (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

router.patch('/orders/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  const updated = db.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(updated);
});

// --- SETTINGS & STATS ---
router.get('/settings', (req, res) => {
  res.json(db.getSettings());
});

router.post('/settings', (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

router.get('/admin/stats', (req, res) => {
  res.json(db.getAdminStats());
});

// --- AUTHENTICATION (WordPress Style Login) ---
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide both username and password.' });
  }

  const authResult = db.authenticateUser(username.trim(), password);
  if (!authResult) {
    return res.status(401).json({ error: 'Invalid username or password. Please try again.' });
  }

  res.json({
    success: true,
    message: 'Authentication successful',
    token: authResult.token,
    user: authResult.user
  });
});

router.get('/auth/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer aapa_sec_')) {
    return res.status(401).json({ valid: false, error: 'Unauthorized session' });
  }
  res.json({ valid: true });
});

router.post('/auth/change-password', (req, res) => {
  const { currentPassword, newPassword, username } = req.body;
  const user = db.getUserByUsername(username || 'admin');
  if (!user || user.password !== currentPassword) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }
  if (!newPassword || newPassword.length < 5) {
    return res.status(400).json({ error: 'New password must be at least 5 characters.' });
  }
  db.updateUserPassword(user.id, newPassword);
  res.json({ success: true, message: 'Password updated successfully!' });
});

module.exports = router;
