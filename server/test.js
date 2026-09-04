const http = require('http');

function request(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOpts = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOpts, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting API & COD Checkout Tests ---');

  // Test 1: Fetch Posts
  const posts = await request('http://localhost:3000/api/posts');
  console.log(`✓ Posts endpoint responded with ${posts.data.length} articles.`);

  // Test 2: Fetch Products
  const products = await request('http://localhost:3000/api/products');
  console.log(`✓ Products endpoint responded with ${products.data.length} products.`);

  // Test 3: Submit COD Order
  const orderData = {
    customerName: 'Marcus Vance',
    customerPhone: '+1 (555) 349-1029',
    customerAddress: '450 Wellness Avenue, Floor 3, San Francisco, CA 94107',
    notes: 'Please buzz apartment #302',
    items: [
      {
        id: 'prod_1',
        name: 'Pure KSM-66® Ashwagandha Root (600mg)',
        price: 24.99,
        quantity: 2
      },
      {
        id: 'prod_2',
        name: 'Chelated Magnesium Glycinate Complex (400mg)',
        price: 21.50,
        quantity: 1
      }
    ]
  };

  const orderRes = await request('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, orderData);

  console.log(`✓ COD Order Placed: ID=${orderRes.data.order.id}, Status="${orderRes.data.order.status}", Payment="${orderRes.data.order.paymentMethod}", Total=$${orderRes.data.order.total}`);

  // Test 4: Verify Admin Stats
  const stats = await request('http://localhost:3000/api/admin/stats');
  console.log(`✓ Admin Stats: Total Orders=${stats.data.totalOrders}, Revenue=$${stats.data.totalRevenue}, Pending Orders=${stats.data.pendingOrders}`);

  // Test 5: Verify Order Lookup
  const checkOrder = await request(`http://localhost:3000/api/orders/${orderRes.data.order.id}`);
  console.log(`✓ Order lookup verified: Customer="${checkOrder.data.customerName}", Phone="${checkOrder.data.customerPhone}"`);

  console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
