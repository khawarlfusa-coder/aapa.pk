const fs = require('fs');
const path = require('path');
const os = require('os');

const DATA_DIR = path.join(__dirname, '..', 'data');
const TMP_DIR = path.join(os.tmpdir(), 'aapa_db');

// Ensure data and tmp directories exist
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}
if (!fs.existsSync(TMP_DIR)) {
  try { fs.mkdirSync(TMP_DIR, { recursive: true }); } catch (e) {}
}

const memoryCache = {};

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function getTmpFilePath(collection) {
  return path.join(TMP_DIR, `${collection}.json`);
}

function readData(collection) {
  if (memoryCache[collection]) {
    return memoryCache[collection];
  }

  // 1. Try reading from /tmp first (contains latest updates in serverless instances)
  const tmpFile = getTmpFilePath(collection);
  if (fs.existsSync(tmpFile)) {
    try {
      const raw = fs.readFileSync(tmpFile, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryCache[collection] = parsed;
      return parsed;
    } catch (err) {
      console.warn(`Error reading tmp ${collection}:`, err.message);
    }
  }

  // 2. Fallback to bundled repository data file
  const file = getFilePath(collection);
  if (fs.existsSync(file)) {
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryCache[collection] = parsed;
      return parsed;
    } catch (err) {
      console.error(`Error reading bundled ${collection}:`, err.message);
    }
  }

  return collection === 'settings' ? {} : [];
}

function writeData(collection, data) {
  memoryCache[collection] = data;

  // 1. Write to /tmp (always writable in serverless environments like Vercel / AWS Lambda)
  try {
    const tmpFile = getTmpFilePath(collection);
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`Warning: Could not write to tmp for ${collection}:`, err.message);
  }

  // 2. Try writing to bundled repository directory (works in local / VPS, safe catch on Vercel EROFS)
  try {
    const file = getFilePath(collection);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Gracefully handle read-only file systems (EROFS) without throwing error
    console.log(`[Storage Notice] Running in read-only environment. ${collection} successfully stored in memory & /tmp.`);
  }
}

// Posts
function getPosts() {
  return readData('posts');
}

function getPostBySlug(slug) {
  const posts = getPosts();
  return posts.find(p => p.slug === slug);
}

function createPost(post) {
  const posts = getPosts();
  const newPost = {
    id: 'post_' + Date.now(),
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    createdAt: new Date().toISOString(),
    ...post
  };
  posts.unshift(newPost);
  writeData('posts', posts);
  return newPost;
}

function updatePost(id, updatedFields) {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...updatedFields, updatedAt: new Date().toISOString() };
  writeData('posts', posts);
  return posts[index];
}

function deletePost(id) {
  let posts = getPosts();
  posts = posts.filter(p => p.id !== id);
  writeData('posts', posts);
  return true;
}

// Products
function getProducts() {
  return readData('products');
}

function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id || p.id === Number(id));
}

function createProduct(product) {
  const products = getProducts();
  const newProduct = {
    id: 'prod_' + Date.now(),
    createdAt: new Date().toISOString(),
    inStock: true,
    ...product
  };
  products.unshift(newProduct);
  writeData('products', products);
  return newProduct;
}

function updateProduct(id, updatedFields) {
  const products = getProducts();
  const index = products.findIndex(p => p.id == id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updatedFields, updatedAt: new Date().toISOString() };
  writeData('products', products);
  return products[index];
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id != id);
  writeData('products', products);
  return true;
}

// Orders (COD)
function getOrders() {
  return readData('orders');
}

function getOrderById(id) {
  const orders = getOrders();
  return orders.find(o => o.id === id);
}

function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: 'AAPA-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    status: 'Pending Verification',
    paymentMethod: 'Cash on Delivery (COD)',
    ...orderData
  };
  orders.unshift(newOrder);
  writeData('orders', orders);
  return newOrder;
}

function updateOrderStatus(id, status) {
  const orders = getOrders();
  const cleanTargetId = String(id).trim().toLowerCase();
  const index = orders.findIndex(o => String(o.id).trim().toLowerCase() === cleanTargetId);
  if (index === -1) return null;
  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  writeData('orders', orders);
  return orders[index];
}

// Settings
function getSettings() {
  const settings = readData('settings');
  if (!settings || (Array.isArray(settings) && settings.length === 0) || Object.keys(settings).length === 0) {
    const defaultSettings = {
      siteName: 'Aapa.PK & Wellness',
      tagline: 'Evidence-based health insights & curated natural remedies',
      adsenseClientId: 'ca-pub-xxxxxxxxxxxxxxxx', // User can change this in admin panel
      adsenseEnabled: true,
      contactEmail: 'contact@aapa.pk',
      contactPhone: '0336-8323063',
      facebook: 'https://facebook.com/lfpk.pk',
      instagram: 'https://instagram.com/aapa.pk',
      freeShippingThreshold: 0 // Always free delivery for COD
    };
    writeData('settings', defaultSettings);
    return defaultSettings;
  }
  return settings;
}

function updateSettings(newSettings) {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  writeData('settings', updated);
  return updated;
}

// Admin Stats
function getAdminStats() {
  const orders = getOrders();
  const products = getProducts();
  const posts = getPosts();

  const totalRevenue = orders.reduce((sum, o) => {
    return sum + (Number(o.total) || 0);
  }, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending Verification' || o.status === 'Processing').length;

  return {
    totalRevenue: totalRevenue.toFixed(2),
    totalOrders: orders.length,
    pendingOrders,
    totalProducts: products.length,
    totalPosts: posts.length
  };
}

// Users & Auth
function getUsers() {
  return readData('users');
}

function getUserByUsername(username) {
  const users = getUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase());
}

function authenticateUser(username, password) {
  const user = getUserByUsername(username);
  if (!user) return null;
  if (user.password === password) {
    // Generate a secure pseudo session token
    const token = 'aapa_sec_' + Buffer.from(`${user.id}:${Date.now()}:${Math.random()}`).toString('base64');
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email
      }
    };
  }
  return null;
}

function updateUserPassword(id, newPassword) {
  const users = getUsers();
  const user = users.find(u => u.id === id);
  if (!user) return false;
  user.password = newPassword;
  writeData('users', users);
  return true;
}

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getSettings,
  updateSettings,
  getAdminStats,
  getUsers,
  getUserByUsername,
  authenticateUser,
  updateUserPassword
};
