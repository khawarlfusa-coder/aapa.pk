/**
 * WordPress-Style Admin Dashboard Controller for Aapa.PK
 * Handles Orders, Articles, Products, and AdSense Configuration
 */

const AdminApp = {
  currentTab: 'dashboard',

  checkAuth() {
    const token = localStorage.getItem('aapa_admin_token') || sessionStorage.getItem('aapa_admin_token');
    if (!token) {
      window.location.href = '/login.html';
      return false;
    }
    const userStr = localStorage.getItem('aapa_admin_user') || sessionStorage.getItem('aapa_admin_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const nameEl = document.getElementById('adminUserName');
        if (nameEl) nameEl.textContent = user.name || user.username;
      } catch (e) {}
    }
    return true;
  },

  logout() {
    localStorage.removeItem('aapa_admin_token');
    localStorage.removeItem('aapa_admin_user');
    sessionStorage.removeItem('aapa_admin_token');
    sessionStorage.removeItem('aapa_admin_user');
    window.location.href = '/login.html';
  },

  async init() {
    if (!this.checkAuth()) return;
    this.setupTabs();
    this.setupForms();
    await this.loadDashboardData();
  },

  setupTabs() {
    const navItems = document.querySelectorAll('.wp-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        if (!tab) return;

        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.tab-section').forEach(sec => sec.style.display = 'none');
        const targetSection = document.getElementById(`tab-${tab}`);
        if (targetSection) targetSection.style.display = 'block';

        this.currentTab = tab;
        this.onTabChange(tab);
      });
    });
  },

  async onTabChange(tab) {
    if (tab === 'dashboard') await this.loadDashboardData();
    if (tab === 'orders') await this.loadOrders();
    if (tab === 'articles') await this.loadArticles();
    if (tab === 'products') await this.loadProducts();
    if (tab === 'settings') await this.loadSettings();
  },

  async loadDashboardData() {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/orders')
      ]);

      const stats = await statsRes.json();
      const orders = await ordersRes.json();

      document.getElementById('statRevenue').textContent = `PKR ${parseFloat(stats.totalRevenue).toLocaleString()}`;
      document.getElementById('statTotalOrders').textContent = stats.totalOrders;
      document.getElementById('statPendingOrders').textContent = stats.pendingOrders;
      document.getElementById('statArticles').textContent = stats.totalPosts;

      // Render recent orders in Dashboard
      const recentTbody = document.getElementById('recentOrdersTbody');
      if (recentTbody) {
        let html = '';
        orders.slice(0, 5).forEach(o => {
          html += `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customerName}</td>
              <td><span style="font-family: monospace;">${o.customerPhone}</span></td>
              <td><strong>PKR ${parseFloat(o.total).toLocaleString()}</strong></td>
              <td>${this.renderStatusBadge(o.status)}</td>
              <td>${new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          `;
        });
        recentTbody.innerHTML = html || `<tr><td colspan="6" style="text-align:center;">No orders yet.</td></tr>`;
      }
    } catch (e) {
      console.error('Error loading dashboard stats:', e);
    }
  },

  async loadOrders() {
    try {
      const res = await fetch('/api/orders');
      const orders = await res.json();
      const tbody = document.getElementById('allOrdersTbody');
      if (!tbody) return;

      let html = '';
      orders.forEach(o => {
        const itemsList = o.items.map(i => `${i.quantity}x ${i.name}`).join('<br>');
        html += `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>
              <strong>${o.customerName}</strong><br>
              <span style="color: #64748b; font-size: 0.8rem;"><i class="fa-solid fa-phone"></i> ${o.customerPhone}</span><br>
              <small style="color: #475569;"><i class="fa-solid fa-location-dot"></i> ${o.customerAddress}</small>
              ${o.notes ? `<div style="font-size:0.75rem; color:#b45309; margin-top:4px;"><em>Note: ${o.notes}</em></div>` : ''}
            </td>
            <td style="font-size: 0.82rem;">${itemsList}</td>
            <td><strong style="color: #059669;">PKR ${parseFloat(o.total).toLocaleString()}</strong></td>
            <td>
              <select class="status-select" onchange="AdminApp.updateOrderStatus('${o.id}', this.value)">
                <option value="Pending Verification" ${o.status === 'Pending Verification' ? 'selected' : ''}>Pending Verification</option>
                <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                <option value="Shipped / Out for Delivery" ${o.status === 'Shipped / Out for Delivery' ? 'selected' : ''}>Shipped / Out for Delivery</option>
                <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered (Paid COD)</option>
                <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </td>
            <td>${new Date(o.createdAt).toLocaleDateString()}</td>
          </tr>
        `;
      });
      tbody.innerHTML = html || `<tr><td colspan="6" style="text-align:center;">No orders placed yet.</td></tr>`;
    } catch (e) {
      console.error('Error fetching orders:', e);
    }
  },

  async updateOrderStatus(orderId, newStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        this.showNotice(`Order ${orderId} updated to "${newStatus}"!`);
      } else {
        alert('Failed to update status.');
      }
    } catch (e) {
      console.error('Error updating order:', e);
    }
  },

  renderStatusBadge(status) {
    if (status === 'Confirmed') return `<span class="status-pill status-confirmed">Confirmed</span>`;
    if (status === 'Delivered') return `<span class="status-pill status-delivered">Delivered (Paid)</span>`;
    if (status === 'Cancelled') return `<span class="status-pill status-cancelled">Cancelled</span>`;
    if (status && status.includes('Shipped')) return `<span class="status-pill status-shipped">Out for Delivery</span>`;
    return `<span class="status-pill status-pending">Pending Verification</span>`;
  },

  allLoadedPosts: [],

  async loadArticles() {
    try {
      const res = await fetch('/api/posts');
      const posts = await res.json();
      this.allLoadedPosts = posts;
      this.renderAdminArticles(posts);

      const searchInput = document.getElementById('adminArticleSearchInput');
      if (searchInput && !searchInput._hasListener) {
        searchInput._hasListener = true;
        searchInput.addEventListener('input', (e) => {
          const q = e.target.value.toLowerCase().trim();
          if (!q) {
            this.renderAdminArticles(this.allLoadedPosts);
          } else {
            const filtered = this.allLoadedPosts.filter(p =>
              p.title.toLowerCase().includes(q) ||
              (p.category && p.category.toLowerCase().includes(q)) ||
              (p.author && p.author.name && p.author.name.toLowerCase().includes(q))
            );
            this.renderAdminArticles(filtered);
          }
        });
      }
    } catch (e) {
      console.error('Error loading articles:', e);
    }
  },

  renderAdminArticles(posts) {
    const tbody = document.getElementById('allArticlesTbody');
    const badge = document.getElementById('adminArticleCountBadge');
    if (badge) badge.textContent = `(${posts.length} of ${this.allLoadedPosts.length} Total Articles)`;
    if (!tbody) return;

    if (posts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#646970;">No articles matching your search.</td></tr>`;
      return;
    }

    // Render up to 50 at once for instant performance
    const renderList = posts.slice(0, 50);
    let html = '';
    renderList.forEach(p => {
      html += `
        <tr>
          <td>
            <strong><a href="/article.html?slug=${p.slug}" target="_blank" style="color: #2271b1; text-decoration: none;">${p.title}</a></strong>
            <div style="font-size: 0.78rem; color: #64748b;">By ${p.author ? p.author.name : 'Aapa.PK Team'} &bull; ${p.readTime}</div>
          </td>
          <td><span class="status-pill status-confirmed">${p.category}</span></td>
          <td><small>${p.reviewer ? p.reviewer.name : 'N/A'}</small></td>
          <td>${p.evidenceLevel || 'Evidence-Based'}</td>
          <td>
            <button class="btn-wp-primary" style="background:#d63638; border-color:#b32d2e; padding:4px 10px; font-size:0.8rem;" onclick="AdminApp.deleteArticle('${p.id}')" title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });

    if (posts.length > 50) {
      html += `
        <tr>
          <td colspan="5" style="text-align: center; background: #f6f7f7; color: #646970; font-size: 0.85rem; padding: 12px;">
            Showing top 50 matches out of ${posts.length}. Use the search box above to quickly find any specific article.
          </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;
  },

  async deleteArticle(id) {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.showNotice('Article deleted successfully.');
        await this.loadArticles();
      }
    } catch (e) {
      console.error(e);
    }
  },

  async loadProducts() {
    try {
      const res = await fetch('/api/products');
      const products = await res.json();
      const tbody = document.getElementById('allProductsTbody');
      if (!tbody) return;

      let html = '';
      products.forEach(p => {
        html += `
          <tr>
            <td>
              <div style="display:flex; align-items:center; gap:10px;">
                <img src="${p.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                <strong>${p.name}</strong>
              </div>
            </td>
            <td>${p.category}</td>
            <td><strong>PKR ${parseFloat(p.price).toLocaleString()}</strong></td>
            <td><span class="status-pill status-delivered">COD Enabled</span></td>
            <td>
              <button class="btn-wp-primary" style="background:#d63638; border-color:#b32d2e; padding:4px 10px; font-size:0.8rem;" onclick="AdminApp.deleteProduct('${p.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    } catch (e) {
      console.error('Error loading products:', e);
    }
  },

  async deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.showNotice('Product deleted successfully.');
        await this.loadProducts();
      }
    } catch (e) {
      console.error(e);
    }
  },

  async loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const settings = await res.json();
      document.getElementById('adsenseClientId').value = settings.adsenseClientId || '';
      document.getElementById('adsenseEnabled').checked = settings.adsenseEnabled !== false;
      document.getElementById('siteName').value = settings.siteName || '';
      document.getElementById('contactPhone').value = settings.contactPhone || '';
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  },

  setupForms() {
    // New Article Form
    const articleForm = document.getElementById('newArticleForm');
    if (articleForm) {
      articleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          title: document.getElementById('postTitle').value.trim(),
          category: document.getElementById('postCategory').value,
          summary: document.getElementById('postSummary').value.trim(),
          content: document.getElementById('postContent').value.trim(),
          coverImage: document.getElementById('postCoverImage').value.trim(),
          reviewerName: document.getElementById('postReviewerName').value.trim(),
          reviewerCredentials: document.getElementById('postReviewerCredentials').value.trim()
        };

        try {
          const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            articleForm.reset();
            this.showNotice('New health article published successfully!');
            await this.loadArticles();
          }
        } catch (err) {
          alert('Error creating article.');
        }
      });
    }

    // New Product Form
    const productForm = document.getElementById('newProductForm');
    if (productForm) {
      productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          name: document.getElementById('prodName').value.trim(),
          category: document.getElementById('prodCategory').value,
          price: document.getElementById('prodPrice').value,
          originalPrice: document.getElementById('prodOriginalPrice').value,
          badge: document.getElementById('prodBadge').value.trim(),
          image: document.getElementById('prodImage').value.trim(),
          description: document.getElementById('prodDescription').value.trim()
        };

        try {
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            productForm.reset();
            this.showNotice('New wellness product added to shop catalog!');
            await this.loadProducts();
          }
        } catch (err) {
          alert('Error creating product.');
        }
      });
    }

    // Settings Form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          adsenseClientId: document.getElementById('adsenseClientId').value.trim(),
          adsenseEnabled: document.getElementById('adsenseEnabled').checked,
          siteName: document.getElementById('siteName').value.trim(),
          contactPhone: document.getElementById('contactPhone').value.trim()
        };

        try {
          const res = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            this.showNotice('Google AdSense and Site Settings updated successfully!');
          }
        } catch (err) {
          alert('Error updating settings.');
        }
      });
    }

    // Change Password Form
    const pwdForm = document.getElementById('changePasswordForm');
    if (pwdForm) {
      pwdForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
          alert('New passwords do not match!');
          return;
        }

        try {
          const res = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword })
          });

          const data = await res.json();
          if (res.ok) {
            pwdForm.reset();
            this.showNotice('Administrator password successfully changed!');
          } else {
            alert(data.error || 'Failed to update password.');
          }
        } catch (err) {
          alert('Network error while updating password.');
        }
      });
    }
  },

  showNotice(msg) {
    const noticeEl = document.getElementById('adminNotice');
    if (noticeEl) {
      noticeEl.textContent = msg;
      noticeEl.style.display = 'block';
      setTimeout(() => {
        noticeEl.style.display = 'none';
      }, 4000);
    } else {
      alert(msg);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
