const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readData(collection) {
  const file = getFilePath(collection);
  if (!fs.existsSync(file)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${collection}:`, err);
    return [];
  }
}

function writeData(collection, data) {
  const file = getFilePath(collection);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
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
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  writeData('orders', orders);
  return orders[index];
}

// Settings
function getSettings() {
  const file = getFilePath('settings');
  if (!fs.existsSync(file)) {
    const defaultSettings = {
      siteName: 'Aapa.PK & Wellness',
      tagline: 'Evidence-based health insights & curated natural remedies',
      adsenseClientId: 'ca-pub-xxxxxxxxxxxxxxxx', // User can change this in admin panel
      adsenseEnabled: true,
      contactEmail: 'contact@aapa.pk',
      contactPhone: '+1 (800) 555-0199',
      freeShippingThreshold: 0 // Always free delivery for COD
    };
    writeData('settings', defaultSettings);
    return defaultSettings;
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
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
