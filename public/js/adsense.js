/**
 * Google AdSense Manager for Aapa.PK
 * Automatically renders AdSense banners or high-fidelity preview banners
 * Supports live script injection with Publisher ID
 */

const AdSenseManager = {
  settings: {
    clientId: 'ca-pub-9840293847291049',
    enabled: true
  },

  async init() {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        this.settings.clientId = data.adsenseClientId || this.settings.clientId;
        this.settings.enabled = data.adsenseEnabled !== false;
      }
    } catch (e) {
      console.warn('Using default AdSense settings');
    }

    if (!this.settings.enabled) {
      document.querySelectorAll('.adsense-slot-container').forEach(el => el.style.display = 'none');
      return;
    }

    this.renderAds();
  },

  renderAds() {
    // Check if live AdSense is configured (real pub ID without 'xxx')
    const isLive = this.settings.clientId && !this.settings.clientId.includes('xxx');

    if (isLive && !window.adsenseScriptLoaded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.settings.clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      window.adsenseScriptLoaded = true;
    }

    // Render leaderboard ad slots
    const leaderboards = document.querySelectorAll('.adsense-slot-leaderboard');
    leaderboards.forEach(slot => {
      if (isLive) {
        slot.innerHTML = `
          <div class="adsense-leaderboard">
            <span class="ad-label">Advertisement</span>
            <ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="${this.settings.clientId}"
                 data-ad-slot="1234567890"></ins>
          </div>
        `;
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      } else {
        slot.innerHTML = `
          <div class="adsense-leaderboard">
            <span class="ad-label">Google AdSense Space &bull; Responsive Banner</span>
            <div class="ad-banner-mock">
              <div class="ad-info">
                <div class="ad-title"><i class="fa-solid fa-heart-pulse"></i> Certified Sleep & Recovery Science</div>
                <div class="ad-desc">Explore clinical trials on natural adaptogens and restorative REM sleep.</div>
              </div>
              <a href="/shop.html" class="ad-cta">Explore Remedies &rarr;</a>
            </div>
          </div>
        `;
      }
    });

    // Render sidebar ad slots
    const sidebars = document.querySelectorAll('.adsense-slot-sidebar');
    sidebars.forEach(slot => {
      if (isLive) {
        slot.innerHTML = `
          <div class="adsense-sidebar-box">
            <span class="ad-label">Advertisement</span>
            <ins class="adsbygoogle"
                 style="display:inline-block;width:300px;height:250px"
                 data-ad-client="${this.settings.clientId}"
                 data-ad-slot="9876543210"></ins>
          </div>
        `;
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      } else {
        slot.innerHTML = `
          <div class="adsense-sidebar-box">
            <span class="ad-label">Google AdSense 300x250</span>
            <div style="margin: 12px 0;">
              <i class="fa-solid fa-shield-halved" style="font-size: 2.2rem; color: #007a78; margin-bottom: 8px;"></i>
              <h4 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 6px;">Pure Organic Wellness</h4>
              <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4;">Tested for potency and heavy metal safety. Cash on delivery available on all items.</p>
            </div>
            <a href="/shop.html" class="btn-checkout-proceed" style="font-size: 0.82rem; padding: 8px 16px; text-decoration: none;">Shop Now</a>
          </div>
        `;
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdSenseManager.init();
});
