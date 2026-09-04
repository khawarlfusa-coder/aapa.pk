/**
 * Cart Manager for Aapa.PK
 * Handles persistent localStorage cart, slide-out drawer, badge count, and totals
 */

const CartManager = {
  STORAGE_KEY: 'healthpulse_cart',

  getCart() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse cart:', e);
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.updateCartBadge();
    this.renderDrawer();
  },

  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    this.openDrawer();
    this.showToast(`Added "${product.name}" to cart!`);
  },

  updateQuantity(id, delta) {
    let cart = this.getCart();
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id != id);
    }

    this.saveCart(cart);
  },

  removeItem(id) {
    let cart = this.getCart();
    cart = cart.filter(i => i.id != id);
    this.saveCart(cart);
  },

  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCartBadge();
    this.renderDrawer();
  },

  getTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  updateCartBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-block' : 'none';
    });
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      this.renderDrawer();
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    }
  },

  renderDrawer() {
    const container = document.getElementById('cartDrawerItems');
    const footer = document.getElementById('cartDrawerFooter');
    if (!container) return;

    const cart = this.getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-cart-shopping"></i>
          <p><strong>Your cart is currently empty</strong></p>
          <p style="font-size: 0.85rem; margin-top: 6px;">Browse our evidence-based supplements and natural wellness essentials.</p>
          <a href="/shop.html" class="btn-checkout-proceed" style="margin-top: 18px; text-decoration: none; display: inline-block;">Shop Wellness</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    let html = '';
    cart.forEach(item => {
      const itemTotal = (item.price * item.quantity).toFixed(2);
      html += `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <div class="cart-qty-controls">
                <button type="button" class="btn-qty" onclick="CartManager.updateQuantity('${item.id}', -1)">-</button>
                <span class="qty-display">${item.quantity}</span>
                <button type="button" class="btn-qty" onclick="CartManager.updateQuantity('${item.id}', 1)">+</button>
              </div>
              <button type="button" class="btn-remove-item" onclick="CartManager.removeItem('${item.id}')">
                <i class="fa-solid fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Update Drawer Totals
    const subtotalEl = document.getElementById('drawerSubtotal');
    const totalEl = document.getElementById('drawerTotal');
    const total = this.getTotal().toFixed(2);
    if (subtotalEl) subtotalEl.textContent = `$${total}`;
    if (totalEl) totalEl.textContent = `$${total}`;
  },

  showToast(message) {
    let toast = document.getElementById('hpToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hpToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.background = '#0f172a';
      toast.style.color = '#fff';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399; margin-right: 8px;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3000);
  },

  init() {
    this.updateCartBadge();
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeDrawer());
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CartManager.init();
});
