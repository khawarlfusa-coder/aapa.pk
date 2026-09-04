/**
 * Main Frontend Controller for Aapa.PK
 * Healthline-Style Blog + Wellness E-Commerce Store
 */

const App = {
  // Current active category filter
  currentCategory: 'All',

  async init() {
    this.setupSearch();

    // Check which page we are on
    const path = window.location.pathname;

    if (path === '/' || path.endsWith('index.html')) {
      await this.loadHomepage();
    } else if (path.includes('shop.html')) {
      await this.loadShopPage();
    } else if (path.includes('article.html')) {
      await this.loadArticlePage();
    } else if (path.includes('checkout.html')) {
      this.setupCheckoutPage();
    } else if (path.includes('order-success.html')) {
      this.loadOrderSuccessPage();
    }
  },

  setupSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `/index.html?search=${encodeURIComponent(query)}`;
        }
      });
    }
  },

  // -------------------------------------------------------------
  // HOMEPAGE LOADER
  // -------------------------------------------------------------
  async loadHomepage() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryQuery = urlParams.get('category');

    try {
      let postsUrl = '/api/posts';
      if (searchQuery) postsUrl += `?search=${encodeURIComponent(searchQuery)}`;
      else if (categoryQuery) postsUrl += `?category=${encodeURIComponent(categoryQuery)}`;

      const [postsRes, productsRes] = await Promise.all([
        fetch(postsUrl),
        fetch('/api/products')
      ]);

      const posts = await postsRes.json();
      const products = await productsRes.json();

      this.renderHeroSection(posts);
      this.renderArticlesGrid(posts);
      this.renderFeaturedProducts(products);
    } catch (err) {
      console.error('Error loading homepage data:', err);
    }
  },

  renderHeroSection(posts) {
    const heroFeatured = document.getElementById('heroFeatured');
    const miniStories = document.getElementById('miniStoriesList');
    if (!heroFeatured || posts.length === 0) return;

    const featured = posts[0];
    heroFeatured.innerHTML = `
      <a href="/article.html?slug=${featured.slug}" class="featured-story-card">
        <div class="featured-img-wrap">
          <img src="${featured.coverImage}" alt="${featured.title}">
          <span class="badge-category">${featured.category}</span>
        </div>
        <div class="featured-content">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <div class="medical-review-badge">
              <i class="fa-solid fa-stethoscope"></i> Medically Reviewed by ${featured.reviewer ? featured.reviewer.name : 'Board of Physicians'}
            </div>
            <div class="evidence-badge">
              <i class="fa-solid fa-circle-check"></i> ${featured.evidenceLevel || 'Evidence Based'}
            </div>
          </div>
          <h2 class="story-title">${featured.title}</h2>
          <p class="story-excerpt">${featured.summary}</p>
          <div class="author-meta">
            <img src="${featured.author.avatar}" alt="${featured.author.name}" class="author-avatar">
            <div class="author-text">
              <h5>By ${featured.author.name}</h5>
              <p>${featured.readTime} &bull; Updated ${featured.reviewer ? featured.reviewer.date : 'Recently'}</p>
            </div>
          </div>
        </div>
      </a>
    `;

    if (miniStories) {
      const top3 = posts.slice(1, 4);
      let html = '';
      top3.forEach(p => {
        html += `
          <a href="/article.html?slug=${p.slug}" class="mini-story-card">
            <img src="${p.coverImage}" alt="${p.title}" class="mini-story-thumb">
            <div class="mini-story-info">
              <span class="mini-story-category">${p.category}</span>
              <h4 class="mini-story-title">${p.title}</h4>
              <span class="mini-story-meta">${p.readTime}</span>
            </div>
          </a>
        `;
      });
      miniStories.innerHTML = html;
    }
  },

  articlesPerPage: 12,
  displayedArticlesCount: 12,
  currentPostList: [],

  renderArticlesGrid(posts) {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;

    this.currentPostList = posts;
    this.displayedArticlesCount = this.articlesPerPage;

    if (posts.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No articles found matching your query.</p>`;
      const loadMoreContainer = document.getElementById('loadMoreContainer');
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
      return;
    }

    this.updateArticlesDisplay();
  },

  updateArticlesDisplay() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;

    const visiblePosts = this.currentPostList.slice(0, this.displayedArticlesCount);

    let html = '';
    visiblePosts.forEach(p => {
      html += `
        <article class="article-card">
          <a href="/article.html?slug=${p.slug}">
            <img src="${p.coverImage}" alt="${p.title}" class="article-card-img" loading="lazy">
          </a>
          <div class="article-card-body">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge-category" style="position: static; font-size: 0.68rem; padding: 3px 8px;">${p.category}</span>
              <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-regular fa-clock"></i> ${p.readTime}</span>
            </div>
            <h3 class="article-card-title">
              <a href="/article.html?slug=${p.slug}">${p.title}</a>
            </h3>
            <p class="article-card-desc">${p.summary && p.summary.length > 110 ? p.summary.substring(0, 110) + '...' : (p.summary || '')}</p>
            <div class="author-meta" style="margin-top: auto;">
              <img src="${p.author && p.author.avatar ? p.author.avatar : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80'}" alt="${p.author ? p.author.name : 'Author'}" class="author-avatar" style="width: 32px; height: 32px;">
              <div class="author-text">
                <h5 style="font-size: 0.8rem;">${p.author ? p.author.name : 'Aapa.PK Team'}</h5>
                <p style="font-size: 0.7rem; color: #059669;"><i class="fa-solid fa-check-double"></i> Fact Checked</p>
              </div>
            </div>
          </div>
        </article>
      `;
    });
    grid.innerHTML = html;

    // Load More Container
    let loadMoreBtn = document.getElementById('btnLoadMoreArticles');
    let loadMoreContainer = document.getElementById('loadMoreContainer');
    if (!loadMoreContainer) {
      loadMoreContainer = document.createElement('div');
      loadMoreContainer.id = 'loadMoreContainer';
      loadMoreContainer.style.textAlign = 'center';
      loadMoreContainer.style.marginTop = '32px';
      grid.parentNode.appendChild(loadMoreContainer);
    }

    if (this.displayedArticlesCount < this.currentPostList.length) {
      loadMoreContainer.style.display = 'block';
      loadMoreContainer.innerHTML = `
        <button type="button" id="btnLoadMoreArticles" class="btn-checkout-proceed" style="width: auto; padding: 12px 30px; margin: 0 auto; display: inline-flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-newspaper"></i> Load More Articles (Showing ${visiblePosts.length} of ${this.currentPostList.length})
        </button>
      `;
      document.getElementById('btnLoadMoreArticles').addEventListener('click', () => {
        this.displayedArticlesCount += this.articlesPerPage;
        this.updateArticlesDisplay();
      });
    } else {
      loadMoreContainer.style.display = 'block';
      loadMoreContainer.innerHTML = `
        <p style="color: #64748b; font-size: 0.9rem; font-weight: 600;">
          <i class="fa-solid fa-circle-check" style="color: #059669;"></i> Showing all ${this.currentPostList.length} articles from Aapa.PK archive.
        </p>
      `;
    }
  },

  renderFeaturedProducts(products) {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;

    let html = '';
    products.slice(0, 4).forEach(prod => {
      html += this.generateProductCardHTML(prod);
    });
    grid.innerHTML = html;
  },

  // -------------------------------------------------------------
  // SHOP PAGE LOADER
  // -------------------------------------------------------------
  async loadShopPage() {
    try {
      const res = await fetch('/api/products');
      const products = await res.json();
      this.allProducts = products;
      this.renderShopGrid(products);
      this.setupShopFilters();
    } catch (e) {
      console.error('Error fetching shop products:', e);
    }
  },

  renderShopGrid(products) {
    const grid = document.getElementById('shopProductsGrid');
    const countEl = document.getElementById('productCountText');
    if (!grid) return;

    if (countEl) countEl.textContent = `Showing ${products.length} wellness formulations`;

    if (products.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No products match this filter.</p>`;
      return;
    }

    let html = '';
    products.forEach(prod => {
      html += this.generateProductCardHTML(prod);
    });
    grid.innerHTML = html;
  },

  setupShopFilters() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-category');
        if (cat === 'All') {
          this.renderShopGrid(this.allProducts);
        } else {
          const filtered = this.allProducts.filter(p => p.category.toLowerCase() === cat.toLowerCase());
          this.renderShopGrid(filtered);
        }
      });
    });
  },

  generateProductCardHTML(prod) {
    return `
      <div class="product-card">
        ${prod.badge ? `<span class="product-badge-float">${prod.badge}</span>` : ''}
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="product-card-body">
          <span class="product-category-tag">${prod.category}</span>
          <h3 class="product-name">${prod.name}</h3>
          
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span>${prod.rating || '4.9'} (${prod.reviewsCount || '100+'})</span>
          </div>

          <div class="cod-pill">
            <i class="fa-solid fa-truck-ramp-box"></i> Cash on Delivery Available
          </div>

          <div class="product-pricing">
            <span class="current-price">$${parseFloat(prod.price).toFixed(2)}</span>
            ${prod.originalPrice ? `<span class="original-price">$${parseFloat(prod.originalPrice).toFixed(2)}</span>` : ''}
          </div>

          <button type="button" class="btn-add-cart" onclick='CartManager.addItem(${JSON.stringify(prod).replace(/'/g, "&apos;")})'>
            <i class="fa-solid fa-cart-plus"></i> Add to Cart (COD)
          </button>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // ARTICLE DETAIL PAGE LOADER
  // -------------------------------------------------------------
  async loadArticlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug') || 'proven-health-benefits-of-ashwagandha';

    try {
      const [resPost, resProducts] = await Promise.all([
        fetch(`/api/posts/${slug}`),
        fetch('/api/products')
      ]);

      if (!resPost.ok) {
        document.getElementById('articleContainer').innerHTML = `
          <div class="container" style="padding: 60px 20px; text-align: center;">
            <h2>Article Not Found</h2>
            <p style="color: #64748b; margin-top: 10px;">The requested health article could not be located.</p>
            <a href="/index.html" class="btn-checkout-proceed" style="max-width: 200px; margin: 20px auto; display: block; text-decoration: none;">Back to Home</a>
          </div>
        `;
        return;
      }

      const post = await resPost.json();
      const products = await resProducts.json();

      document.title = `${post.title} | Aapa.PK`;

      // Update SEO Metadata
      const metaDesc = document.getElementById('metaDescription');
      if (metaDesc) metaDesc.setAttribute('content', post.metaDescription || post.summary || post.title);

      const canonical = document.getElementById('canonicalLink');
      if (canonical) canonical.setAttribute('href', `https://aapa.pk/article.html?slug=${encodeURIComponent(post.slug)}`);

      const ogTitle = document.getElementById('ogTitle');
      if (ogTitle) ogTitle.setAttribute('content', `${post.title} | Aapa.PK`);

      const ogDesc = document.getElementById('ogDescription');
      if (ogDesc) ogDesc.setAttribute('content', post.metaDescription || post.summary || post.title);

      const ogImage = document.getElementById('ogImage');
      if (ogImage) ogImage.setAttribute('content', post.coverImage);

      // Update JSON-LD Structured Data Schema for Google Rich Results
      const jsonLdScript = document.getElementById('articleJsonLd');
      if (jsonLdScript) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "headline": post.title,
          "name": post.title,
          "description": post.metaDescription || post.summary,
          "url": `https://aapa.pk/article.html?slug=${encodeURIComponent(post.slug)}`,
          "image": post.coverImage,
          "datePublished": post.createdAt || "2016-09-01T00:00:00.000Z",
          "dateModified": post.updatedAt || post.createdAt || "2026-09-03T00:00:00.000Z",
          "author": {
            "@type": "Person",
            "name": post.author ? post.author.name : "Aapa.PK Team",
            "jobTitle": post.author ? post.author.role : "Health Writer"
          },
          "reviewedBy": {
            "@type": "Person",
            "name": post.reviewer ? post.reviewer.name : "Medical Review Board",
            "jobTitle": post.reviewer ? post.reviewer.credentials : "Physician Reviewer"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Aapa.PK Media",
            "logo": {
              "@type": "ImageObject",
              "url": "https://aapa.pk/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://aapa.pk/article.html?slug=${encodeURIComponent(post.slug)}`
          }
        };
        jsonLdScript.textContent = JSON.stringify(schema, null, 2);
      }

      // Fill Article Header
      document.getElementById('articleCategory').textContent = post.category;
      document.getElementById('articleCategory').href = `/index.html?category=${encodeURIComponent(post.category)}`;
      document.getElementById('articleHeadline').textContent = post.title;
      document.getElementById('articleReviewerName').textContent = post.reviewer ? post.reviewer.name : 'Dr. Ayesha Siddiqa, MBBS';
      document.getElementById('articleReviewerDate').textContent = post.reviewer ? post.reviewer.date : 'Recent';
      document.getElementById('articleAuthorName').textContent = post.author ? post.author.name : 'Aapa.PK Team';
      document.getElementById('articleReadTime').textContent = post.readTime;
      document.getElementById('articleCoverImage').src = post.coverImage;
      document.getElementById('articleCoverImage').alt = post.title;

      // In-Article Mid-Content Ad placement check
      let contentHtml = post.content;
      if (!contentHtml.includes('adsense-card') && !contentHtml.includes('in-article')) {
        const adBlock = `
          <div class="article-ad-slot" style="margin: 28px 0; text-align: center;">
            <div class="adsense-card" data-ad-slot="in-article">
              <span class="ad-label">Advertisement &bull; Google AdSense</span>
              <div class="ad-content-placeholder">
                <i class="fa-solid fa-rectangle-ad"></i>
                <p><strong>Aapa.PK Certified Health & Wellness</strong></p>
                <small>Explore 100% pure organic herbal formulas with Cash on Delivery (COD).</small>
              </div>
            </div>
          </div>
        `;
        const pTags = contentHtml.split('</p>');
        if (pTags.length > 2) {
          pTags.splice(Math.floor(pTags.length / 2), 0, adBlock);
          contentHtml = pTags.join('</p>');
        } else {
          contentHtml += adBlock;
        }
      }

      document.getElementById('articleBody').innerHTML = contentHtml;

      // Render Table of Contents
      const tocList = document.getElementById('tocList');
      if (tocList && post.tableOfContents && post.tableOfContents.length > 0) {
        let tocHtml = '';
        post.tableOfContents.forEach(item => {
          tocHtml += `<li><a href="#${item.id}">&bull; ${item.title}</a></li>`;
        });
        tocList.innerHTML = tocHtml;
      } else if (tocList) {
        // Auto-generate TOC from <h2> headings if present
        const headings = document.getElementById('articleBody').querySelectorAll('h2');
        if (headings.length > 0) {
          let tocHtml = '';
          headings.forEach((h2, idx) => {
            if (!h2.id) h2.id = `section-${idx+1}`;
            tocHtml += `<li><a href="#${h2.id}">&bull; ${h2.textContent}</a></li>`;
          });
          tocList.innerHTML = tocHtml;
        } else {
          tocList.parentElement.style.display = 'none';
        }
      }

      // Render Related Product Promo
      const relatedPromo = document.getElementById('relatedProductPromo');
      if (relatedPromo) {
        const relatedProd = products.find(p => p.id === post.relatedProductId) || products[0];
        if (relatedProd) {
          relatedPromo.innerHTML = `
            <h4><i class="fa-solid fa-prescription-bottle-medical"></i> Evidence-Backed Formulation</h4>
            <div style="display: flex; gap: 12px; align-items: center; margin: 12px 0;">
              <img src="${relatedProd.image}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 6px; border: 1px solid #ccfbf1;">
              <div>
                <strong style="font-size: 0.95rem; color: #0f172a; display: block;">${relatedProd.name}</strong>
                <span style="font-size: 1.1rem; font-weight: 800; color: #0f766e;">$${parseFloat(relatedProd.price).toFixed(2)}</span>
                <span class="cod-pill" style="margin-left: 6px;">COD Available</span>
              </div>
            </div>
            <p style="font-size: 0.82rem; color: #475569; margin-bottom: 12px;">Doctor-reviewed pure extracts with third-party purity testing.</p>
            <button type="button" class="btn-add-cart" style="background: #0f766e;" onclick='CartManager.addItem(${JSON.stringify(relatedProd).replace(/'/g, "&apos;")})'>
              <i class="fa-solid fa-cart-plus"></i> Add to Cart (COD)
            </button>
          `;
        }
      }
    } catch (e) {
      console.error('Error loading article:', e);
    }
  },

  // -------------------------------------------------------------
  // COD CHECKOUT PAGE CONTROLLER
  // -------------------------------------------------------------
  setupCheckoutPage() {
    const cart = CartManager.getCart();
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const totalEl = document.getElementById('checkoutTotal');
    const checkoutForm = document.getElementById('codCheckoutForm');

    if (cart.length === 0) {
      if (summaryItems) {
        summaryItems.innerHTML = `
          <div style="text-align: center; padding: 30px; color: #64748b;">
            <p>Your cart is empty.</p>
            <a href="/shop.html" style="color: #007a78; font-weight: 600; text-decoration: underline; margin-top: 8px; display: inline-block;">Browse Wellness Shop</a>
          </div>
        `;
      }
      return;
    }

    // Render Order Items Breakdown
    let html = '';
    cart.forEach(item => {
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.9rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${item.image}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;">
            <div>
              <div style="font-weight: 600; color: #1e293b;">${item.name}</div>
              <div style="font-size: 0.78rem; color: #64748b;">Qty: ${item.quantity} &times; $${item.price.toFixed(2)}</div>
            </div>
          </div>
          <div style="font-weight: 700; color: #0f172a;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
    });
    if (summaryItems) summaryItems.innerHTML = html;

    const total = CartManager.getTotal().toFixed(2);
    if (subtotalEl) subtotalEl.textContent = `$${total}`;
    if (totalEl) totalEl.textContent = `$${total}`;

    // Handle Form Submission
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const notes = document.getElementById('customerNotes') ? document.getElementById('customerNotes').value.trim() : '';

        if (!name || !phone || !address) {
          alert('Please fill out all required fields: Name, Phone Number, and Delivery Address.');
          return;
        }

        const submitBtn = document.getElementById('btnSubmitOrder');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Cash on Delivery Order...`;
        }

        try {
          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerName: name,
              customerPhone: phone,
              customerAddress: address,
              notes: notes,
              items: CartManager.getCart()
            })
          });

          const result = await res.json();

          if (!res.ok) {
            alert(result.error || 'Failed to place order. Please try again.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Confirm Cash on Delivery Order`;
            }
            return;
          }

          // Order succeeded! Clear cart and redirect
          CartManager.clearCart();
          window.location.href = `/order-success.html?orderId=${encodeURIComponent(result.order.id)}`;
        } catch (err) {
          console.error('Error submitting order:', err);
          alert('Network error occurred. Please try again.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Confirm Cash on Delivery Order`;
          }
        }
      });
    }
  },

  // -------------------------------------------------------------
  // ORDER SUCCESS CONFIRMATION LOADER
  // -------------------------------------------------------------
  async loadOrderSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (!orderId) {
      window.location.href = '/';
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        const order = await res.json();
        document.getElementById('orderIdDisplay').textContent = order.id;
        document.getElementById('orderCustomerName').textContent = order.customerName;
        document.getElementById('orderCustomerPhone').textContent = order.customerPhone;
        document.getElementById('orderCustomerAddress').textContent = order.customerAddress;
        document.getElementById('orderTotalAmount').textContent = `$${order.total}`;

        let itemsHtml = '';
        order.items.forEach(i => {
          itemsHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span>${i.name} &times; ${i.quantity}</span>
              <strong>$${(i.price * i.quantity).toFixed(2)}</strong>
            </div>
          `;
        });
        document.getElementById('orderItemsList').innerHTML = itemsHtml;
      }
    } catch (e) {
      console.error('Error loading order success info:', e);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
