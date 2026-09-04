const { writeData } = require('./db');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function save(collection, data) {
  fs.writeFileSync(path.join(DATA_DIR, `${collection}.json`), JSON.stringify(data, null, 2), 'utf-8');
}

const seedPosts = [
  {
    id: "post_1",
    title: "10 Proven Health Benefits of Ashwagandha (With Dosage & Side Effects)",
    slug: "proven-health-benefits-of-ashwagandha",
    category: "Supplements",
    summary: "Ashwagandha is an ancient medicinal herb with multiple health benefits. It can reduce anxiety and stress, help fight depression, boost fertility and testosterone in men, and even boost brain function.",
    author: {
      name: "Franziska Spritzler, RD, CDE",
      avatar: "https://images.unsplash.com/photo-1594824813689-5309dffb6732?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Registered Dietitian"
    },
    reviewer: {
      name: "Dr. Kelly Wood, MD",
      date: "September 2, 2026",
      credentials: "Board-Certified Endocrinologist & Internal Medicine Specialist"
    },
    readTime: "7 min read",
    evidenceLevel: "High Evidence (28 Clinical Citations)",
    coverImage: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    tags: ["Herbs", "Stress Relief", "Supplements", "Ayurveda"],
    tableOfContents: [
      { id: "what-is-it", title: "1. What is Ashwagandha?" },
      { id: "stress-anxiety", title: "2. Can reduce stress and anxiety" },
      { id: "blood-sugar", title: "3. May lower blood sugar and fat" },
      { id: "muscle-strength", title: "4. Increases muscle and strength" },
      { id: "sleep-quality", title: "5. Sharpening focus and sleep quality" },
      { id: "dosage-safety", title: "6. Optimal dosage and safety precautions" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Ashwagandha (*Withania somnifera*) is classified as an adaptogen, helping your body manage chronic stress.</li>
          <li>Double-blind clinical trials show significant reductions in cortisol (stress hormone) levels by up to 30%.</li>
          <li>Most clinical studies observe beneficial effects with 250–600 mg of root extract daily.</li>
        </ul>
      </div>

      <h2 id="what-is-it">1. What is Ashwagandha?</h2>
      <p>Ashwagandha is an ancient medicinal herb with rich roots in Indian Ayurvedic tradition. For more than 3,000 years, it has been used to relieve stress, elevate energy levels, and enhance cognitive concentration.</p>
      <p>"Ashwagandha" translates to "smell of the horse" in Sanskrit, referring both to its unique herbal scent and its traditional reputation for conferring the vitality and stamina of a stallion.</p>

      <h2 id="stress-anxiety">2. Can reduce stress and anxiety</h2>
      <p>Ashwagandha is best known for its potent stress-relieving properties. It mediates the hypothalamic-pituitary-adrenal (HPA) axis, a complex neuroendocrine system regulating the body's physiological response to stress.</p>
      <p>In a 60-day randomized study in 64 people with chronic stress, those in the group who supplemented with 300 mg of full-spectrum ashwagandha root extract reported an average <strong>69% reduction in anxiety and insomnia</strong>, compared with 11% in the placebo group.</p>

      <div class="article-ad-slot">
        <!-- Google AdSense In-Article Slot -->
        <div class="adsense-card" data-ad-slot="in-article">
          <span class="ad-label">Advertisement</span>
          <div class="ad-content-placeholder">
            <i class="fa-solid fa-rectangle-ad"></i>
            <p><strong>Aapa.PK Certified Partner</strong></p>
            <small>Personalized Organic Supplements delivered to your door with Free COD.</small>
          </div>
        </div>
      </div>

      <h2 id="blood-sugar">3. May lower blood sugar and fat</h2>
      <p>A review of 24 studies, including 5 clinical studies in people with diabetes, found that treatment with ashwagandha significantly reduced blood sugar, hemoglobin A1c (HbA1c), insulin, blood lipids, and oxidative stress markers.</p>

      <h2 id="muscle-strength">4. Increases muscle and strength</h2>
      <p>Research indicates that ashwagandha may improve muscle mass, muscular endurance, and body composition. In one trial, male participants who took 600 mg of ashwagandha daily and underwent resistance training for 8 weeks had significantly greater gains in muscle strength and muscle size compared with the placebo group.</p>

      <h2 id="sleep-quality">5. Sharpening focus and sleep quality</h2>
      <p>Triethylene glycol, an active compound found in ashwagandha leaves, has been shown in clinical trials to promote restorative non-REM sleep. Patients suffering from mild insomnia experienced faster sleep onset latency and reported waking up feeling significantly more refreshed.</p>

      <h2 id="dosage-safety">6. Optimal dosage and safety precautions</h2>
      <p>Dosing recommendations vary depending on the extract concentration. Typical dosages range between <strong>300 mg to 600 mg per day</strong>, preferably taken with breakfast or before bedtime. Ashwagandha is considered safe for most healthy adults, but pregnant or breastfeeding individuals and those with thyroid disorders should consult a healthcare provider first.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2026-09-01T10:00:00.000Z"
  },
  {
    id: "post_2",
    title: "Magnesium Glycinate vs. Citrate: Which One Should You Take?",
    slug: "magnesium-glycinate-vs-citrate",
    category: "Nutrition",
    summary: "Not all magnesium supplements are created equal. Discover which form is best for deeper sleep, muscle recovery, anxiety relief, or digestive regularity.",
    author: {
      name: "Rachael Link, MS, RD",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Registered Dietitian"
    },
    reviewer: {
      name: "Dr. Debra Rose Wilson, PhD, MSN, RN",
      date: "August 28, 2026",
      credentials: "Holistic Healthcare Specialist & Medical Editor"
    },
    readTime: "5 min read",
    evidenceLevel: "High Evidence (19 Clinical Citations)",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    tags: ["Magnesium", "Sleep", "Minerals", "Gut Health"],
    tableOfContents: [
      { id: "importance", title: "1. Why your body craves magnesium" },
      { id: "glycinate", title: "2. Magnesium Glycinate for sleep and calm" },
      { id: "citrate", title: "3. Magnesium Citrate for digestive health" },
      { id: "comparison", title: "4. Direct side-by-side comparison" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li><strong>Magnesium Glycinate</strong> is bound to the amino acid glycine, making it gentlest on the stomach and optimal for sleep and anxiety.</li>
          <li><strong>Magnesium Citrate</strong> draws water into the intestines, making it the premier choice for occasional constipation relief.</li>
          <li>Over 50% of the adult population does not meet their recommended daily allowance of magnesium.</li>
        </ul>
      </div>

      <h2 id="importance">1. Why your body craves magnesium</h2>
      <p>Magnesium is an essential macromineral involved in more than 300 biochemical reactions in the human body. From heart rhythm maintenance to neurotransmitter regulation and DNA synthesis, magnesium keeps your cellular machinery running smoothly.</p>

      <h2 id="glycinate">2. Magnesium Glycinate for sleep and calm</h2>
      <p>When elemental magnesium is chelated with glycine—an inhibitory neurotransmitter known for inducing relaxation—it creates magnesium glycinate. This form boasts exceptionally high bioavailability and minimal laxative effect.</p>
      <p>If your primary concerns are nocturnal leg cramps, racing thoughts before bed, or muscle tension after workouts, glycinate is widely considered the gold standard.</p>

      <h2 id="citrate">3. Magnesium Citrate for digestive health</h2>
      <p>Magnesium citrate is combined with citric acid. While it is also well-absorbed, it has an osmotic effect in the digestive tract, attracting fluids to soften stools and stimulate gentle bowel movements within 30 minutes to 3 hours.</p>

      <h2 id="comparison">4. Direct side-by-side comparison</h2>
      <p>Choose <strong>Glycinate</strong> if you want calm nerves and undisturbed REM sleep. Choose <strong>Citrate</strong> if you struggle with sluggish digestion and want an affordable, energizing mineral boost.</p>
    `,
    relatedProductId: "prod_2",
    createdAt: "2026-08-28T14:30:00.000Z"
  },
  {
    id: "post_3",
    title: "The Ultimate Guide to Intermittent Fasting (16/8 Method for Beginners)",
    slug: "ultimate-guide-intermittent-fasting-16-8",
    category: "Fitness & Weight Loss",
    summary: "Intermittent fasting is currently one of the world's most popular health and fitness trends. Here is the science-backed roadmap to start safely without losing muscle.",
    author: {
      name: "Kris Gunnars, BSc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Medical & Nutrition Researcher"
    },
    reviewer: {
      name: "Dr. Amy Myers, MD",
      date: "August 20, 2026",
      credentials: "Functional Medicine Physician & Author"
    },
    readTime: "6 min read",
    evidenceLevel: "Evidence-Based (34 Sources)",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Fasting", "Weight Loss", "Metabolism", "Longevity"],
    tableOfContents: [
      { id: "what-is-168", title: "1. What is the 16/8 method?" },
      { id: "benefits", title: "2. Proven metabolic benefits" },
      { id: "sample-meal-plan", title: "3. Sample daily schedule" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>The 16/8 protocol involves fasting for 16 hours each day and restricting your eating window to 8 hours.</li>
          <li>Promotes cellular autophagy (clearing damaged cell components) and boosts insulin sensitivity.</li>
          <li>Hydration with zero-calorie water, herbal tea, and electrolytes is crucial during fasting windows.</li>
        </ul>
      </div>

      <h2 id="what-is-168">1. What is the 16/8 method?</h2>
      <p>The 16/8 intermittent fasting method involves skipping breakfast and consuming all daily calories within an 8-hour window, such as 12:00 PM to 8:00 PM, followed by 16 hours of fasting overnight and into the next morning.</p>

      <h2 id="benefits">2. Proven metabolic benefits</h2>
      <p>When you fast, human growth hormone (HGH) levels skyrocket and insulin levels plummet. This combination enables your body to burn stored fat more readily while preserving lean muscle mass.</p>

      <h2 id="sample-meal-plan">3. Sample daily schedule</h2>
      <p>A typical schedule involves having a balanced meal at noon rich in healthy proteins and greens, an afternoon snack of raw nuts and organic berries, and a satisfying dinner before 8:00 PM.</p>
    `,
    relatedProductId: "prod_4",
    createdAt: "2026-08-20T09:15:00.000Z"
  },
  {
    id: "post_4",
    title: "Gut-Brain Connection: Why Your Microbiome Dictates Your Mood",
    slug: "gut-brain-connection-microbiome-mood",
    category: "Mental Health",
    summary: "Did you know that 90% of your body's serotonin is produced in your gut? Explore how probiotic diversity directly influences anxiety, mood, and mental clarity.",
    author: {
      name: "Dr. Megan Rossi, PhD, RD",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Microbiome Specialist"
    },
    reviewer: {
      name: "Dr. David Perlmutter, MD, FACN",
      date: "August 15, 2026",
      credentials: "Board-Certified Neurologist & Fellow of American College of Nutrition"
    },
    readTime: "8 min read",
    evidenceLevel: "High Evidence (42 Clinical Citations)",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Gut Health", "Probiotics", "Mental Health", "Vagus Nerve"],
    tableOfContents: [
      { id: "vagus-nerve", title: "1. The Vagus Nerve Superhighway" },
      { id: "serotonin", title: "2. The Serotonin factory in your digestive tract" },
      { id: "probiotics-mood", title: "3. Psychobiotics: Strains that ease stress" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>The gut and brain communicate bidirectional via the vagus nerve and bacterial biochemicals.</li>
          <li>A diverse microbiome synthesizes short-chain fatty acids (SCFAs) that cross the blood-brain barrier to reduce neuroinflammation.</li>
          <li>Targeted multi-strain probiotics can tangibly lower cortisol responses to acute mental stress.</li>
        </ul>
      </div>

      <h2 id="vagus-nerve">1. The Vagus Nerve Superhighway</h2>
      <p>The gut is home to hundreds of millions of neurons, forming the enteric nervous system (ENS), often hailed as the body's "second brain". Through the vagus nerve, gut bacteria send continuous neural signals directly to the limbic system in the brain.</p>

      <h2 id="serotonin">2. The Serotonin factory in your digestive tract</h2>
      <p>While serotonin is famous as the brain's "happy molecule", roughly 90% of the body's total supply is synthesized in the intestinal mucosa by enterochromaffin cells under bacterial cues.</p>

      <h2 id="probiotics-mood">3. Psychobiotics: Strains that ease stress</h2>
      <p>Emerging research has coined the term "psychobiotics" for specific probiotic strains—including <em>Lactobacillus helveticus</em> and <em>Bifidobacterium longum</em>—which have been proven to soothe nervous tension and reduce cognitive fatigue.</p>
    `,
    relatedProductId: "prod_5",
    createdAt: "2026-08-15T11:00:00.000Z"
  },
  {
    id: "post_5",
    title: "Omega-3 Fatty Acids: EPA vs DHA and the Optimal Ratio for Heart Health",
    slug: "omega-3-fatty-acids-epa-vs-dha",
    category: "Nutrition",
    summary: "Learn why pure fish oil potency depends on the exact EPA to DHA ratio, and how to verify third-party purity standards against heavy metals.",
    author: {
      name: "Helen West, RD",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Registered Dietitian"
    },
    reviewer: {
      name: "Dr. Elizabeth Klodas, MD, FACC",
      date: "August 10, 2026",
      credentials: "Cardiologist & Preventive Cardiology Specialist"
    },
    readTime: "5 min read",
    evidenceLevel: "Evidence-Based (22 Sources)",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Omega-3", "Heart Health", "Brain Health", "Nutrition"],
    tableOfContents: [
      { id: "epa-dha", title: "1. Understanding EPA vs DHA" },
      { id: "cardiovascular", title: "2. Cardiovascular and Joint Benefits" },
      { id: "purity", title: "3. Molecular Distillation & Purity" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>EPA excels at controlling cellular inflammation and supporting blood vessel elasticity.</li>
          <li>DHA is a structural component of brain tissue and retinal photoreceptors.</li>
          <li>Choose wild-caught, triglyceride-form fish oils with IFOS 5-Star certification.</li>
        </ul>
      </div>

      <h2 id="epa-dha">1. Understanding EPA vs DHA</h2>
      <p>Both eicosapentaenoic acid (EPA) and docosahexaenoic acid (DHA) are long-chain polyunsaturated omega-3 fatty acids essential for human life. Because humans cannot efficiently convert plant-based ALA into EPA and DHA, direct supplementation is essential.</p>

      <h2 id="cardiovascular">2. Cardiovascular and Joint Benefits</h2>
      <p>Daily intake of 1,000 mg to 2,000 mg combined EPA+DHA lowers triglyceride levels by 15–30%, reduces arterial plaque formation risk, and decreases joint stiffness in athletes and arthritis patients.</p>

      <h2 id="purity">3. Molecular Distillation & Purity</h2>
      <p>Always inspect product labels for molecular distillation, guaranteeing the absence of mercury, PCBs, and heavy metals commonly concentrated in marine food chains.</p>
    `,
    relatedProductId: "prod_3",
    createdAt: "2026-08-10T16:00:00.000Z"
  }
];

const seedProducts = [
  {
    id: "prod_1",
    name: "Pure KSM-66® Ashwagandha Root (600mg)",
    category: "Stress & Sleep",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Best Seller",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Standardized organic full-spectrum root extract with 5% withanolides. Clinically tested to reduce stress, elevate stamina, and enhance sleep quality.",
    benefits: [
      "Reduces cortisol and chronic stress response",
      "Enhances natural sleep depth and recovery",
      "Certified 100% Organic & Non-GMO",
      "Free from heavy metals & artificial fillers"
    ],
    dosage: "Take 1 vegetarian capsule twice daily with meals.",
    stock: 48
  },
  {
    id: "prod_2",
    name: "Chelated Magnesium Glycinate Complex (400mg)",
    category: "Stress & Sleep",
    price: 21.50,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 184,
    badge: "Doctor Recommended",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80",
    description: "Bioavailable, gentle-on-the-stomach chelated magnesium bound to amino acid glycine. Formulated for muscle recovery and restorative sleep.",
    benefits: [
      "Eases muscle cramps, twitching, and tension",
      "Promotes deep REM sleep cycles without grogginess",
      "Non-laxative, high-absorption formula",
      "Third-party lab tested for purity"
    ],
    dosage: "Take 2 capsules 45 minutes before bedtime.",
    stock: 65
  },
  {
    id: "prod_3",
    name: "Triple Strength Ultra-Pure Omega-3 Wild Fish Oil",
    category: "Heart & Brain",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviewsCount: 420,
    badge: "Top Rated",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80",
    description: "1,200mg Total Omega-3s with 800mg EPA and 400mg DHA per softgel. Molecularly distilled from wild-caught cold-water anchovies.",
    benefits: [
      "Promotes cardiovascular arterial flexibility",
      "Enhances cognitive acuity and memory retention",
      "IFOS 5-Star Certified zero fishy aftertaste with natural lemon oil",
      "Burp-free enteric coating"
    ],
    dosage: "Take 1 softgel daily with your largest meal.",
    stock: 30
  },
  {
    id: "prod_4",
    name: "Organic Chamomile & Lavender Herbal Sleep Elixir Tea",
    category: "Daily Wellness",
    price: 16.00,
    originalPrice: 19.99,
    rating: 4.7,
    reviewsCount: 96,
    badge: "100% Organic",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "Whole Egyptian chamomile flowers hand-blended with French lavender buds and lemon balm for a serene evening ritual.",
    benefits: [
      "Naturally caffeine-free calming herbal blend",
      "Relaxes tight abdominal muscles and digestive tract",
      "Biodegradable pyramid sachets",
      "Direct-trade organic botanical sourcing"
    ],
    dosage: "Steep 1 tea sachet in 200ml boiling water for 6-8 minutes.",
    stock: 90
  },
  {
    id: "prod_5",
    name: "50 Billion CFU Multi-Strain Probiotic + Prebiotic Fiber",
    category: "Gut & Digestion",
    price: 27.50,
    originalPrice: 35.00,
    rating: 4.9,
    reviewsCount: 255,
    badge: "Microbiome Essential",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    description: "14 diverse acid-resistant bacterial strains enriched with organic acacia prebiotic fiber to foster gut microbial biodiversity.",
    benefits: [
      "Supports healthy digestion and relieves occasional bloating",
      "Optimizes gut-brain neurotransmitter synthesis",
      "Shelf-stable delayed-release vegetable capsules",
      "Dairy-free, soy-free, and vegan certified"
    ],
    dosage: "Take 1 capsule daily on an empty stomach or with a glass of water.",
    stock: 52
  },
  {
    id: "prod_6",
    name: "Liposomal Vitamin C (1000mg) with Bioflavonoids",
    category: "Immunity",
    price: 22.90,
    originalPrice: 29.90,
    rating: 4.8,
    reviewsCount: 140,
    badge: "Fast Absorption",
    codAvailable: true,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
    description: "Phospholipid sunflower liposomes shield ascorbic acid from breakdown, achieving up to 3x higher intracellular delivery than standard vitamin C.",
    benefits: [
      "High-potency cellular immune defense",
      "Stimulates natural collagen synthesis for youthful skin",
      "Gentle on acidic stomachs",
      "Non-GMO and alcohol-free"
    ],
    dosage: "Take 2 capsules daily with breakfast.",
    stock: 40
  }
];

const seedOrders = [
  {
    id: "HL-849201",
    customerName: "Sarah Jenkins",
    customerPhone: "+1 (555) 234-5678",
    customerAddress: "742 Evergreen Terrace, Apt 4B, Springfield, OR 97477",
    notes: "Please call upon arrival at front gate.",
    items: [
      {
        id: "prod_1",
        name: "Pure KSM-66® Ashwagandha Root (600mg)",
        price: 24.99,
        quantity: 2
      },
      {
        id: "prod_2",
        name: "Chelated Magnesium Glycinate Complex (400mg)",
        price: 21.50,
        quantity: 1
      }
    ],
    subtotal: "71.48",
    shipping: 0.00,
    total: "71.48",
    paymentMethod: "Cash on Delivery (COD)",
    status: "Confirmed",
    createdAt: "2026-09-02T16:20:00.000Z"
  },
  {
    id: "HL-391044",
    customerName: "Michael Chen",
    customerPhone: "+1 (555) 987-6543",
    customerAddress: "1280 Sunset Boulevard, Suite 210, Los Angeles, CA 90026",
    notes: "Leave with front desk if after 5pm.",
    items: [
      {
        id: "prod_3",
        name: "Triple Strength Ultra-Pure Omega-3 Wild Fish Oil",
        price: 29.99,
        quantity: 1
      }
    ],
    subtotal: "29.99",
    shipping: 0.00,
    total: "29.99",
    paymentMethod: "Cash on Delivery (COD)",
    status: "Pending Verification",
    createdAt: "2026-09-03T02:45:00.000Z"
  }
];

const seedSettings = {
  siteName: "Aapa.PK",
  tagline: "Evidence-Based Wellness & Natural Therapeutics",
  adsenseClientId: "ca-pub-9840293847291049",
  adsenseEnabled: true,
  contactEmail: "support@aapa.pk",
  contactPhone: "+1 (800) 432-5844",
  deliveryNote: "Payment is collected exclusively in cash upon physical handover by our courier.",
  announcementText: "🚚 Free Express Cash on Delivery (COD) on all orders nationwide this week!"
};

save('posts', seedPosts);
save('products', seedProducts);
save('orders', seedOrders);
save('settings', seedSettings);

console.log("Successfully seeded database with Healthline-style articles, products, and sample COD orders!");
