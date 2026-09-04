const fs = require('fs');
const path = require('path');
const db = require('./db');

const allArchiveArticles = [
  {
    id: "post_aapa_dr_bilquis",
    title: "How to Lose Belly Fat Without Exercise by Dr. Bilquis (Pait Ki Charbi Kam Karne Ka Nuskha)",
    slug: "how-to-loose-belly-fat-without-exercise-by-dr-bilquis-weight-loss-tips",
    category: "Fitness & Weight Loss",
    summary: "Dr. Bilquis Sheikh ka aazmooda gharelu nuskha: Kalonji, zeera, aur saunf ke qudrati kehwe se pait ki ziddi charbi pighlane ka aasan tareeqa.",
    author: {
      name: "Dr. Bilquis Sheikh (Featured on Aapa.PK)",
      avatar: "https://images.unsplash.com/photo-1594824813689-5309dffb6732?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Alternative & Herbal Medicine Specialist"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "August 2026",
      credentials: "Consultant Nutritionist"
    },
    readTime: "5 min read",
    evidenceLevel: "Herbal Phytotherapy Evidence",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    tags: ["Dr Bilquis", "Belly Fat", "Pait Ki Charbi", "Kalonji", "Zeera Kehwa"],
    tableOfContents: [
      { id: "ajza", title: "1. Kehwe Ke Zaroori Ajza" },
      { id: "tayyari", title: "2. Banane Ka Saheeh Tareeqa" },
      { id: "fawaid", title: "3. Dr. Bilquis Ke Tibbi Mashware" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Kalonji aur zeera maiday ki gas, aafhara aur sozish ko khatam karte hain.</li>
          <li>Rozana raat ko sone se pehle garam kehwa peene se metabolism raat bhar charbi pighlata hai.</li>
        </ul>
      </div>

      <h2 id="ajza">1. Kehwe Ke Zaroori Ajza</h2>
      <ul>
        <li>Kalonji (Nigella Sativa) - Aadha chaye ka chamach</li>
        <li>Safaid Zeera (Cumin seeds) - Aik chaye ka chamach</li>
        <li>Saunf (Fennel seeds) - Aik chaye ka chamach</li>
        <li>Daar cheeni (Cinnamon) - Aik chhota tukra</li>
        <li>Pani - Do cup</li>
      </ul>

      <h2 id="tayyari">2. Banane Ka Saheeh Tareeqa</h2>
      <p>Pani ko ubaal lein aur tamam ajza shamil karein. Itna pakayein ke do cup pani aik cup reh jaye. Phir chhan kar neem garam halat mein chuski chuski piyein.</p>

      <h2 id="fawaid">3. Dr. Bilquis Ke Tibbi Mashware</h2>
      <p>Is kehwe ke sath meethi cheezon aur tail mein tali hui cheezon se parhaiz karein. 15 din lagatar istemal se pait andar chala jata hai.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2016-09-20T10:00:00.000Z"
  },
  {
    id: "post_aapa_ganjpan",
    title: "Aurat Aur Mardon Ke Ganj Pan Ka Zabardast Ilaj (عورتوں اور مردوں کے گنج پن کا زبردست علاج)",
    slug: "auraton-aur-mardon-ke-ganjpan-ka-zabardast-ilaj",
    category: "Wellness",
    summary: "Pyaz ka ras aur meethi dana ka aazmooda tail: Girte huye balon ko rokne aur naye baal ugane ke liye Aapa.PK ka mashhoor nuskha.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Farhan Malik, MD",
      date: "August 2026",
      credentials: "Dermatological Consultant"
    },
    readTime: "6 min read",
    evidenceLevel: "Follicular Biology & Sulfur Evidence",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Hair Fall", "Ganjpan", "Pyaz Ka Ras", "Onion Juice for Hair", "Totkay"],
    tableOfContents: [
      { id: "pyaz-ka-ras", title: "1. Pyaz Ka Ras Balon Ke Liye Kyun Zaroori Hai?" },
      { id: "methi-tail", title: "2. Meethi Dana Aur Sarson Ka Tail" },
      { id: "istemal", title: "3. Lagane Ka Tareeqa Aur Ehtiyat" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Pyaz ke ras mein sulfur hota hai jo hair follicles mein collagen aur keratin ki production barhata hai.</li>
          <li>Haftay mein 2 se 3 dafa lagane se ganjpan wali jagah par naye baal ugana shuru ho jate hain.</li>
        </ul>
      </div>

      <h2 id="pyaz-ka-ras">1. Pyaz Ka Ras Balon Ke Liye Kyun Zaroori Hai?</h2>
      <p>Scientific tehqeeq ke mutabiq pyaz ka ras sar ki jild (scalp) mein khoon ki gardish ko taiz karta hai aur dandruff aur fungal infection ka khatma karta hai.</p>

      <h2 id="methi-tail">2. Meethi Dana Aur Sarson Ka Tail</h2>
      <p>Meethi dana (Fenugreek seeds) ko sarson ya nariyal ke tail mein halki aanch par pakayein jab tak beej kaale na ho jayen. Is tail ko thanda karke mehfooz kar lein.</p>

      <h2 id="istemal">3. Lagane Ka Tareeqa Aur Ehtiyat</h2>
      <p>Pyaz ka ras cotton ki madad se baalon ki jaron mein lagayein aur 30 minute baad kisi sulfate-free shampoo se dho lein.</p>
    `,
    relatedProductId: "prod_6",
    createdAt: "2016-08-18T14:20:00.000Z"
  },
  {
    id: "post_aapa_eyelashes",
    title: "Lambi Aur Ghani Palkain Magar Kaise? (لمبی اور گھنی پلکیں حاصل کرنے کا طریقہ)",
    slug: "lambi-aur-ghani-palkain-magar-kaise",
    category: "Wellness",
    summary: "Castor oil (arandi ka tail) aur vitamin E oil ka aasan gharelu nuskha jo palkon aur abro (eyebrows) ko qudrati taur par ghana aur lamba banaye.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Aapa.PK Beauty Writer"
    },
    reviewer: {
      name: "Dr. Kelly Wood, MD",
      date: "July 2026",
      credentials: "Medical Review Board"
    },
    readTime: "4 min read",
    evidenceLevel: "Ricinoleic Acid Clinical Profile",
    coverImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Eyelashes", "Castor Oil", "Beauty Tips", "Palkain Ghani"],
    tableOfContents: [
      { id: "castor-oil", title: "1. Castor Oil Ke Hairat Angez Fawaid" },
      { id: "vitamin-e", title: "2. Vitamin E Serum Banane Ka Tareeqa" },
      { id: "ehtiyat", title: "3. Aankhon Ki Hifazat Aur Ehtiyat" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Castor oil mein 90% ricinoleic acid hota hai jo palkon ke follicles ko taqat deta hai.</li>
          <li>Mascara brush ya earbud ki madad se raat ko lagana sab se behtar waqt hai.</li>
        </ul>
      </div>

      <h2 id="castor-oil">1. Castor Oil Ke Hairat Angez Fawaid</h2>
      <p>Arandi ka tail palkon ko tootne se bachata hai aur unhe qudrati chamak aur elasticity faraham karta hai.</p>

      <h2 id="vitamin-e">2. Vitamin E Serum Banane Ka Tareeqa</h2>
      <p>1 chamach castor oil mein 1 capsule Vitamin E oil shamil karein. Saaf mascara wand se raat ko sone se pehle palkon aur eyebrows par lagayein.</p>
    `,
    relatedProductId: "prod_6",
    createdAt: "2016-08-05T09:15:00.000Z"
  },
  {
    id: "post_aapa_kareena_diet",
    title: "Celebrity Weight Loss & Metabolic Diet Plan (Gharelu Diet Tips)",
    slug: "kareena-kapoor-weight-loss-complete-diet-plan",
    category: "Nutrition",
    summary: "Post-pregnancy aur rapid fat loss ke liye mutawazin desi diet plan: Ghee, dahi, khichdi aur desi ghizaon ke sath wazan kam karne ka sahi tariqa.",
    author: {
      name: "Editorial Nutrition Team",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Clinical Dietetics"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "August 2026",
      credentials: "Consultant Nutritionist"
    },
    readTime: "7 min read",
    evidenceLevel: "Macro & Micronutrient Balance Guidelines",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Diet Plan", "Celebrity Diet", "Healthy Eating", "Desi Diet"],
    tableOfContents: [
      { id: "nashta", title: "1. Subah Ka Nashta (Breakfast)" },
      { id: "dopahar", title: "2. Dopahar Ka Khana (Lunch)" },
      { id: "raat", title: "3. Raat Ka Khana (Dinner)" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Crash diets metabolism ko sust karti hain; desi ghizaon mein portion control sab se kamiyab formula hai.</li>
          <li>Desi ghee ka 1 chhota chamach vitamins A, D, E ko jazb karne ke liye zaroori hai.</li>
        </ul>
      </div>

      <h2 id="nashta">1. Subah Ka Nashta (Breakfast)</h2>
      <p>Subah 8 se 9 baje 1 cup sabz daliya ya 1 boiled egg ke sath 1 slice multi-grain roti aur taza sabz chai.</p>

      <h2 id="dopahar">2. Dopahar Ka Khana (Lunch)</h2>
      <p>Aik chhota bowl daal ya sabzi, taza kachumar salad aur 1 chapaati baghair ghee ke.</p>

      <h2 id="raat">3. Raat Ka Khana (Dinner)</h2>
      <p>Halka soup, grilled chicken ya moong daal ki khichdi raat 8 baje se pehle kha lein.</p>
    `,
    relatedProductId: "prod_2",
    createdAt: "2016-07-20T16:00:00.000Z"
  },
  {
    id: "post_aapa_yoga_stamina",
    title: "Yoga & Breathing Exercises to Double Physical Stamina (Gharelu Yoga)",
    slug: "yoga-improve-stamina-shilpa-shetty",
    category: "Fitness & Weight Loss",
    summary: "Kapalbhati aur Pranayama se lung capacity barhane, thakawat door karne aur jism ko chust rakhne ke aasan yoga poses.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Farhan Malik, MD",
      date: "August 2026",
      credentials: "Physiotherapy & Sports Medicine"
    },
    readTime: "5 min read",
    evidenceLevel: "Cardiopulmonary & Yoga Physiology",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Yoga", "Pranayama", "Stamina", "Fitness", "Breathing Exercises"],
    tableOfContents: [
      { id: "kapalbhati", title: "1. Kapalbhati Pranayama" },
      { id: "anulom-vilom", title: "2. Anulom Vilom (Alternate Nostril Breathing)" },
      { id: "surya-namaskar", title: "3. Surya Namaskar For Full Body Stamina" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Rozana 15 minute deep breathing oxygenation ko barha kar chronic fatigue ko door karti hai.</li>
          <li>Khoon ki gardish aur zehni dushar (stress) ke liye yoga sab se sasta aur asardaar hal hai.</li>
        </ul>
      </div>

      <h2 id="kapalbhati">1. Kapalbhati Pranayama</h2>
      <p>Subah nehar munh seedha baith kar naak se zordaar saans bahar nikaalein aur pait ko andar kheinchein. 5 minute rozaana se pait ki charbi ghulti hai.</p>

      <h2 id="anulom-vilom">2. Anulom Vilom</h2>
      <p>Aik taraf ke naak se saans andar lein aur doosri taraf se bahar nikaalein. Yeh blood pressure aur anxiety ko foran normal karta hai.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2016-07-15T11:30:00.000Z"
  },
  {
    id: "post_aapa_10kg_tip",
    title: "10 Kg Weight Loss Tips: Qudrati Tareeqe Se 10 Kilo Wazan Kaise Kam Karein",
    slug: "10-kg-weight-lose-tip",
    category: "Fitness & Weight Loss",
    summary: "Bagair kisi dawai aur bagair kamzori ke 10 kilo wazan kam karne ka step-by-step scientific aur gharelu mansooba.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "September 2026",
      credentials: "Consultant Nutritionist"
    },
    readTime: "6 min read",
    evidenceLevel: "Caloric Deficit & Metabolism Guidelines",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["10 Kg Weight Loss", "Totkay", "Aapa.PK", "Motapa Door Karein"],
    tableOfContents: [
      { id: "caloric-deficit", title: "1. Caloric Deficit Ka Matlab" },
      { id: "pani-tips", title: "2. Rozana 3 Litre Pani Ka Mamool" },
      { id: "walk-routine", title: "3. 40 Minute Rozana Tezi Se Chalna" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>10 kilo wazan kam karne ke liye 2 se 3 mahine ka waqt lagana safe aur permanent result deta hai.</li>
          <li>Har hafte 1 kilo wazan kam karna ideal aur tibbi lehaaz se mehfooz hai.</li>
        </ul>
      </div>

      <h2 id="caloric-deficit">1. Caloric Deficit Ka Matlab</h2>
      <p>Agar aapka jism 2000 calories kharch karta hai to khane mein 1500 calories lein. 500 calories ki yeh kami jism ki charbi se poori hoti hai.</p>

      <h2 id="pani-tips">2. Rozana 3 Litre Pani Ka Mamool</h2>
      <p>Pani peene se bhook ki ghalat cravings khatam hoti hain aur gurde fasid madon ko aasani se bahar nikalte hain.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2016-06-30T10:00:00.000Z"
  },
  {
    id: "post_aapa_kamar_dard",
    title: "7 Aesi Exercises Jo 7 Minute Main Kamar Ke Dard Se Mukammal Nijaat Dilati Hain",
    slug: "7-aesi-exercises-jo-7-minute-main-kamar-ke-dard-se-mukammal-nijaat-dilati-hain",
    category: "Fitness & Weight Loss",
    summary: "Lower back pain aur mohron ke dard ke liye 7 aasan gharelu stretches jo spinal tension ko foran khatam karein.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Farhan Malik, MD",
      date: "August 2026",
      credentials: "Physiotherapist"
    },
    readTime: "5 min read",
    evidenceLevel: "Spine Rehabilitation Guidelines",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Kamar Dard", "Back Pain Relief", "Exercises", "Stretches"],
    tableOfContents: [
      { id: "cat-cow", title: "1. Cat-Cow Stretch (Billi Poses)" },
      { id: "child-pose", title: "2. Child Pose (Balasana)" },
      { id: "knee-to-chest", title: "3. Knee-To-Chest Stretch" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Kamar dard ka aam sabab lamba arsa kursi par baithna aur kamar ki kamzor muscles hain.</li>
          <li>Rozana sirf 7 minute ke stretches se spinal discs relax ho jati hain.</li>
        </ul>
      </div>

      <h2 id="cat-cow">1. Cat-Cow Stretch (Billi Poses)</h2>
      <p>Haath aur ghutno ke bal baith kar kamar ko ooper kheinchein phir neeche jhukayein. Yeh mohron ke darmiyan lachak paida karta hai.</p>

      <h2 id="child-pose">2. Child Pose (Balasana)</h2>
      <p>Ghutno ke bal baith kar aage jhuk jayein aur sar ko zameen par laga lein. Is position mein 1 minute deep breathing karein.</p>
    `,
    relatedProductId: "prod_2",
    createdAt: "2016-06-15T15:00:00.000Z"
  },
  {
    id: "post_aapa_diet_7day",
    title: "7 Day Diet Plan to Lose Weight (1200 Calories Meal Plan in Urdu)",
    slug: "7-day-diet-plan-to-lose-weight-1200-calories",
    category: "Nutrition",
    summary: "7 din ka mukammal menu plan jismein subah ka nashta, dopahar ka lunch aur raat ka dinner shamal hai. Baghair kamzori wazan ghatayein.",
    author: {
      name: "Editorial Diet Team",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Team"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "August 2026",
      credentials: "Nutritionist"
    },
    readTime: "8 min read",
    evidenceLevel: "1200 kcal Controlled Trial Protocols",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["7 Day Diet Plan", "1200 Calories", "Urdu Diet Plan", "Aapa.PK"],
    tableOfContents: [
      { id: "day1-3", title: "1. Din 1 se 3: Detox & Hydration" },
      { id: "day4-5", title: "2. Din 4 se 5: High Protein Boost" },
      { id: "day6-7", title: "3. Din 6 se 7: Fat Burning Acceleration" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>1200 calories ka plan jism ko energy deficit mein rakhta hai bagair kisi vitamin ki kami ke.</li>
          <li>Rozana dahi, sabzian, daal aur phal lazmi shamil karein.</li>
        </ul>
      </div>

      <h2 id="day1-3">1. Din 1 se 3: Detox & Hydration</h2>
      <p>Pehle teen din subah sabz chai, dopahar ko bari plate salad aur boiled daal, aur raat ko sabzi ka soup piyein.</p>

      <h2 id="day4-5">2. Din 4 se 5: High Protein Boost</h2>
      <p>Nashte mein 2 andon ki safaidi, dopahar ko grilled chicken ya fish, aur raat ko daliya lein.</p>
    `,
    relatedProductId: "prod_5",
    createdAt: "2016-06-05T08:30:00.000Z"
  },
  {
    id: "post_aapa_5_fruits",
    title: "5 Aese Phal Jo Aap Ko Wazan Kam Karne Main Madad Dete Hain",
    slug: "5-aese-phal-jo-aap-ko-wazan-kam-karne-main-madad-dete-hain",
    category: "Nutrition",
    summary: "Seb, amrood, tarbooz, grape fruit aur ber: Yeh 5 phal fiber se bharpoor hain jo metabolism taiz karke pait ko der tak bhara rakhte hain.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Kelly Wood, MD",
      date: "September 2026",
      credentials: "Medical Review Board"
    },
    readTime: "5 min read",
    evidenceLevel: "Pectin & Glycemic Index Evidence",
    coverImage: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Fruits For Weight Loss", "Seb", "Amrood", "Wazan Kam Karne Ke Phal"],
    tableOfContents: [
      { id: "seb", title: "1. Seb (Apple) - Pectin Fiber Ka Khazana" },
      { id: "amrood", title: "2. Amrood (Guava) - Low Sugar, High Fiber" },
      { id: "grapefruit", title: "3. Grapefruit - Natural Fat Burner" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Pectin fiber khoon mein glucose ke release ko aahista karta hai jisse charbi jama nahi hoti.</li>
          <li>Amrood hazme ko taiz karta hai aur qabz se fori najaat dilata hai.</li>
        </ul>
      </div>

      <h2 id="seb">1. Seb (Apple) - Pectin Fiber Ka Khazana</h2>
      <p>Rozana aik seb khane se dimaagh ko pait bhare hone ka ehsas rehta hai aur calorie intake khud ba khud 15% kam ho jata hai.</p>

      <h2 id="amrood">2. Amrood (Guava) - Low Sugar, High Fiber</h2>
      <p>Amrood mein Vitamin C ki miqdar leemo se bhi zyada hoti hai jo immune system aur metabolic rate ko boost karta hai.</p>
    `,
    relatedProductId: "prod_5",
    createdAt: "2016-05-25T13:00:00.000Z"
  },
  {
    id: "post_aapa_formula_cream",
    title: "4 Creams Mila Kar Banne Wali Formula Cream Ke Hairat Angez Haqaiq Aur Nataij",
    slug: "4-creams-milaakar-banne-wali-formula-cream-k-nataij",
    category: "Wellness",
    summary: "Pakistani market mein 4 creams mila kar lagane ke side effects aur rang gora karne ke qudrati aur safe tibbi tareeqe.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Aapa.PK Beauty Writer"
    },
    reviewer: {
      name: "Dr. Debra Rose Wilson, PhD",
      date: "August 2026",
      credentials: "Dermatological Researcher"
    },
    readTime: "6 min read",
    evidenceLevel: "Corticosteroid & Mercury Skin Toxicity Evidence",
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Formula Cream", "Skin Care", "Steroids Warning", "Gharelu Totkay", "Rang Gora"],
    tableOfContents: [
      { id: "formula-nuksanat", title: "1. Formula Creams Ke Asal Khatraat (Steroids & Mercury)" },
      { id: "skin-thinning", title: "2. Jild Ka Bareek Hona Aur Laali" },
      { id: "qudrati-hal", title: "3. Safe Qudrati Ubtan Aur Serums" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Chemical aur steroid formula creams shuru mein rang saaf karti hain lekin baad mein jild ko jala kar daagh dalti hain.</li>
          <li>Haldi, besan, arq-e-gulab aur aloe vera qudrati aur hamesha ke liye mehfooz nuskha hain.</li>
        </ul>
      </div>

      <h2 id="formula-nuksanat">1. Formula Creams Ke Asal Khatraat</h2>
      <p>Clobetasol aur betamethasone jaise steroids chehre ki upri hifazati teh ko tabah kar dete hain jis se dhoop mein chehra surkh aur laal hone lagta hai.</p>

      <h2 id="qudrati-hal">2. Safe Qudrati Ubtan Aur Serums</h2>
      <p>Besan mein chhutki bhar haldi aur do chamach dahi mila kar chehre par 15 minute lagane se rangat qudrati taur par chamakdar ho jati hai.</p>
    `,
    relatedProductId: "prod_6",
    createdAt: "2016-05-10T12:00:00.000Z"
  },
  {
    id: "post_aapa_anda_chilna",
    title: "3 Second Main Ubla Hua Anda Chhilne Ka Dilchasp Tareeqa",
    slug: "3-second-main-ubla-hua-anda-chilne-ka-dilchasp-tarika-janiye-kese",
    category: "Nutrition",
    summary: "Kitchen hacks by Aapa.PK: Ublay huye ande ko bina toote fori chhilne ka asan trick.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Kelly Wood, MD",
      date: "July 2026",
      credentials: "Medical Reviewer"
    },
    readTime: "3 min read",
    evidenceLevel: "Culinary Science & Protein Preservation",
    coverImage: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Kitchen Hacks", "Ubla Anda", "Aapa Tips", "Nutrition"],
    tableOfContents: [
      { id: "ice-water", title: "1. Thande Pani Ka Shock Trick" },
      { id: "glass-hack", title: "2. Glass Shake Method" }
    ],
    content: `
      <h2 id="ice-water">1. Thande Pani Ka Shock Trick</h2>
      <p>Anda ubalne ke foran baad use barf wale thande pani mein daal dein. Temperature ke farq se chhilka ande ki satah se alag ho jata hai aur 3 second mein utar jata hai.</p>
    `,
    relatedProductId: "prod_4",
    createdAt: "2016-04-20T10:00:00.000Z"
  }
];

function importEverything() {
  const currentPosts = db.getPosts();
  let addedCount = 0;

  allArchiveArticles.forEach(art => {
    const existing = currentPosts.find(p => p.slug === art.slug || p.title === art.title);
    if (!existing) {
      currentPosts.push(art);
      addedCount++;
      console.log(`✓ Added archive post: "${art.title}"`);
    }
  });

  const postsFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(postsFile, JSON.stringify(currentPosts, null, 2), 'utf-8');
  console.log(`\nImport complete! Added ${addedCount} new archive articles.`);
  console.log(`Total articles now in Aapa.PK: ${currentPosts.length}`);
}

importEverything();
