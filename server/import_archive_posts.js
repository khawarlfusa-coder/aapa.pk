const fs = require('fs');
const path = require('path');
const db = require('./db');

const archiveArticles = [
  {
    id: "post_aapa_1",
    title: "10 Aesi Aadat Jin Par Amal Kar Ke Aap Ka Wazan Aur Pait Ba Aasani Kam Ho Sakta Hai",
    slug: "10-aesi-aadat-jin-par-amal-kar-ke-aap-ka-wazan-aur-pait-ba-aasani-kam-ho-sakta-hai",
    category: "Fitness & Weight Loss",
    summary: "Aapa.PK ka mashhoor nuskha: Rozmarrah ki 10 aasan aadat jin par amal karke aap baghair bhooke rahe pait ki charbi aur wazan ko qudrati tareeqe se kam kar sakte hain.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "September 2026",
      credentials: "Consultant Nutritionist & Lifestyle Medicine Specialist"
    },
    readTime: "6 min read",
    evidenceLevel: "High Evidence (Clinical Weight Loss Guidelines)",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    tags: ["Wazan Kam Karne Ka Tarika", "Weight Loss", "Pait Ki Charbi", "Aapa.PK Totkay"],
    tableOfContents: [
      { id: "subah-garam-pani", title: "1. Subah Nehar Munh Garam Pani Aur Limoo" },
      { id: "aahista-chabana", title: "2. Khana Aahista Chabana Aur 20-Minute Rule" },
      { id: "fiber-aur-protein", title: "3. Nashte Mein Protein Aur Fiber Ka Istemal" },
      { id: "shakar-aur-meetha", title: "4. Meethe Aur Cold Drinks Se Mukammal Parhaiz" },
      { id: "pani-ka-miqdar", title: "5. Khane Se Pehle Pani Peena" },
      { id: "raat-ka-khana", title: "6. Raat Ka Khana Sone Se 3 Ghante Pehle Khana" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Aapa.PK Key Takeaways (Khas Nakaat)</h4>
        <ul>
          <li>Wazan kam karne ke liye faqa (starvation) karne ki zaroorat nahi, balki rozana ki aadat ko theek karna zaroori hai.</li>
          <li>Subah nehar munh neem garam pani metabolishm ko 24% tak barha deta hai.</li>
          <li>Sone se theek pehle khana khana pait par charbi (visceral fat) jamane ka sab se bara sabab hai.</li>
        </ul>
      </div>

      <p>Aksar log wazan kam karne ke liye sakht diet aur bhooka rehne ka intikhab karte hain, jis se jism kamzor ho jata hai aur baal girne lagte hain. Aapa.PK par hum hamesha aasan, tibbi aur qudrati tareeqon ko tarjeeh dete hain.</p>

      <h2 id="subah-garam-pani">1. Subah Nehar Munh Garam Pani Aur Limoo</h2>
      <p>Subah bedar hote hi 1 se 2 glass neem garam pani mein aadha limoo ka ras daal kar piyein. Yeh jism se fasid madon (toxins) ko bahar nikalta hai aur digestive system ko active karta hai.</p>

      <div class="article-ad-slot">
        <div class="adsense-card" data-ad-slot="in-article">
          <span class="ad-label">Advertisement</span>
          <div class="ad-content-placeholder">
            <i class="fa-solid fa-rectangle-ad"></i>
            <p><strong>Aapa.PK Pure Herbal Remedies</strong></p>
            <small>Organic Apple Cider Vinegar & Detox Green Tea available with Free COD.</small>
          </div>
        </div>
      </div>

      <h2 id="aahista-chabana">2. Khana Aahista Chabana Aur 20-Minute Rule</h2>
      <p>Dimaagh ko pait bharne ka ishara pohanchne mein taqreeban 20 minute lagte hain. Jab aap jaldi jaldi khate hain to zaroorat se zyada calories jism mein chali jati hain. Har niwale ko kam az kam 25 se 30 martaba chabayen.</p>

      <h2 id="fiber-aur-protein">3. Nashte Mein Protein Aur Fiber Ka Istemal</h2>
      <p>Subah ke nashte mein ubale huye ande (boiled eggs), daliya, ya dahi ka istemal karein. Yeh khoon mein insulin ki miqdar ko mutawazin rakhte hain jis se din bhar baar baar meetha khane ki talab nahi hoti.</p>

      <h2 id="shakar-aur-meetha">4. Meethe Aur Cold Drinks Se Mukammal Parhaiz</h2>
      <p>Bottles, processed juices aur bakery ki cheezon mein chhupi shakar (high fructose corn syrup) seedha liver aur pait par charbi ban kar jamti hai. Inki jagah sabz chai (green tea) ya leemon pani piyein.</p>

      <h2 id="pani-ka-miqdar">5. Khane Se Pehle Pani Peena</h2>
      <p>Har khane se 15 se 20 minute pehle aik glass taaza pani peene se pait mein khali jagah kam ho jati hai aur over-eating se bacha ja sakta hai. Yaad rahe khane ke foran baad thanda pani peena hazme ko kharab karta hai.</p>

      <h2 id="raat-ka-khana">6. Raat Ka Khana Sone Se 3 Ghante Pehle Khana</h2>
      <p>Raat ka khana halka phulka rakhein aur sone se kam az kam 3 ghante pehle kha lein. Khane ke baad 15 minute aahista chalne ki aadat daalein.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2016-10-04T12:00:00.000Z"
  },
  {
    id: "post_aapa_2",
    title: "4 Aese Pressure Points Jin Se Aap Wazan Aasani Se Kam Kar Sakte Hain",
    slug: "4-aese-pressure-points-jin-se-aap-wazan-aasni-se-kam-kar-sakte-hain",
    category: "Fitness & Weight Loss",
    summary: "Acupressure ki qadeem science ke mutabiq jism par 4 makhsoos pressure points hain jinhe dabane se bhook control hoti hai aur metabolism taiz hota hai.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Farhan Malik, MD",
      date: "August 2026",
      credentials: "Integrative Medicine & Physiotherapy Consultant"
    },
    readTime: "5 min read",
    evidenceLevel: "Acupressure & Reflexology Studies",
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Acupressure", "Weight Loss", "Pressure Points", "Health Tips"],
    tableOfContents: [
      { id: "kan-ka-point", title: "1. Kaan Ka Point (Tragus Point)" },
      { id: "hont-aur-naak", title: "2. Ooper Ke Hont Aur Naak Ke Darmiyan Point" },
      { id: "ghutne-ka-point", title: "3. Ghutne Ka Zui San Li Point" },
      { id: "kohni-ka-point", title: "4. Kohni Ka Fold Point" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Acupressure points dimagh mein bhook aur stress ke signals ko regulate karte hain.</li>
          <li>Rozana har point par 1 se 2 minute halka dushar (circular massage) dene se behtareen nataij milte hain.</li>
        </ul>
      </div>

      <h2 id="kan-ka-point">1. Kaan Ka Point (Tragus Point)</h2>
      <p>Kaan ke saamne jo chhota ubhaar hota hai, us par ungli rakh kar apna munh kholein aur band karein. Jahan sab se zyada harkat mehsoos ho, wahan 2 se 3 minute tak rozaana halka dabao daalein. Yeh point bhook aur cravings ko foran control karta hai.</p>

      <h2 id="hont-aur-naak">2. Ooper Ke Hont Aur Naak Ke Darmiyan Point</h2>
      <p>Naak aur ooper ke hont ke theek darmiyan is point ko rozana 2 dafa dabane se jazbaati bhook (emotional eating aur stress) kam hoti hai.</p>

      <h2 id="ghutne-ka-point">3. Ghutne Ka Zui San Li Point</h2>
      <p>Ghutne ki haddi se chaar unglian neeche bahar ki taraf yeh point paya jata hai. Is par massage karne se nizam-e-inhezam (digestion) behtar hota hai aur pait ka aafhara (bloating) khatam hota hai.</p>

      <h2 id="kohni-ka-point">4. Kohni Ka Fold Point</h2>
      <p>Kohni ke mod par andar ki taraf ka point aanto ki harkat ko taiz karta hai aur jism se faltu paani aur charbi ko nikalne mein madad deta hai.</p>
    `,
    relatedProductId: "prod_2",
    createdAt: "2016-09-15T10:30:00.000Z"
  },
  {
    id: "post_aapa_3",
    title: "Doodh aur Shahed ke 6 Hairan Kun Fawaid (دودھ اور شہد کے فوائد)",
    slug: "doodh-aur-shahed-ke-6-fawaid",
    category: "Nutrition",
    summary: "Doodh aur asli shahed ka imtizaj qudrat ka behtareen tohfa hai. Haddi ki mazbooti, gehri neend, aur jism ki taqat ke liye iska istemal behad mufeed hai.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Kelly Wood, MD",
      date: "September 2026",
      credentials: "Board-Certified Internal Medicine"
    },
    readTime: "4 min read",
    evidenceLevel: "High Nutritional Evidence",
    coverImage: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Doodh", "Shahed", "Totkay", "Nutrition", "Immunity"],
    tableOfContents: [
      { id: "neend", title: "1. Pur-sukoon Aur Gehri Neend" },
      { id: "haddian", title: "2. Haddiyon Aur Joron Ki Mazbooti" },
      { id: "hizma", title: "3. Hazme Aur Qabz Ka Khatma" },
      { id: "taqat", title: "4. Jismani Aur Asabi Taqat" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Garam doodh mein shahed mila kar peene se serotonin hormone release hota hai jo neend lata hai.</li>
          <li>Shahed mein qudrati prebiotics hote hain jo doodh ke calcium ko aanto mein jazb hone mein madad dete hain.</li>
        </ul>
      </div>

      <h2 id="neend">1. Pur-sukoon Aur Gehri Neend</h2>
      <p>Sone se aadha ghanta pehle neem garam doodh mein aik chamach khalis shahed mila kar peene se dimaagh ko sukoon milta hai aur be-khwabi (insomnia) ki shikayat door hoti hai.</p>

      <h2 id="haddian">2. Haddiyon Aur Joron Ki Mazbooti</h2>
      <p>Doodh calcium ka khazana hai jabkay shahed mein maujood carbohydrates calcium ko jism ke har tissue tak pohanchane mein muawin sabit hote hain.</p>

      <h2 id="hizma">3. Hazme Aur Qabz Ka Khatma</h2>
      <p>Shahed mein antibacterial khususiyaat hoti hain jo maiday ke infection aur bad-hazmi ko theek karti hain.</p>

      <h2 id="taqat">4. Jismani Aur Asabi Taqat</h2>
      <p>Rozana subah ya raat ko doodh aur shahed ka istemal jism ko taaza dam aur thakawat se pak rakhta hai.</p>
    `,
    relatedProductId: "prod_4",
    createdAt: "2016-08-20T14:00:00.000Z"
  },
  {
    id: "post_aapa_4",
    title: "Aik Aisa Jadooi Drink Jo Kardey Ga Pait Khatam (Fat Cutter Drink)",
    slug: "aik-aisa-jadooi-drink-jo-kardey-ga-pait-khatam",
    category: "Fitness & Weight Loss",
    summary: "Kheera, adrak, podina aur leemo se tayyar shuda yeh mashhoor detox drink pait ki ziddi charbi pighlane mein hairan kun asar dikhata hai.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Ayesha Siddiqa, MBBS",
      date: "August 2026",
      credentials: "Consultant Nutritionist"
    },
    readTime: "5 min read",
    evidenceLevel: "Detox & Metabolism Evidence",
    coverImage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Detox Drink", "Fat Cutter", "Aapa.PK", "Pait Ki Charbi"],
    tableOfContents: [
      { id: "ajza", title: "1. Drink Ke Zaroori Ajza" },
      { id: "tayyari", title: "2. Banane Ka Aasan Tareeqa" },
      { id: "istemal", title: "3. Istemal Ka Saheeh Waqt" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Adrak (Ginger) thermogenic asraat rakhta hai jo caloric burning ko barhata hai.</li>
          <li>Podina aur kheera pait ki sozish (inflammation) aur water retention ko khatam karte hain.</li>
        </ul>
      </div>

      <h2 id="ajza">1. Drink Ke Zaroori Ajza</h2>
      <ul>
        <li>1 adad kheera (bareek slices mein kata hua)</li>
        <li>1 chamach peesa hua taaza adrak</li>
        <li>1 adad leemo (slices mein kata hua)</li>
        <li>10 se 12 patte taaza podina</li>
        <li>1 se 1.5 litre saaf pani</li>
      </ul>

      <h2 id="tayyari">2. Banane Ka Aasan Tareeqa</h2>
      <p>Raat ko aik sheeshe ke jug mein pani daal kar yeh tamam ajza shamil karein aur dhak kar raat bhar ke liye fridge ya thandi jagah par rakh dein taake tamam ajza ke qudrati extracts pani mein shamil ho jayen.</p>

      <h2 id="istemal">3. Istemal Ka Saheeh Waqt</h2>
      <p>Agli subah se shuru karke din bhar normal pani ki jagah is detox drink ko piyein. Sirf 7 din lagatar istemal se pait halka aur kamar patli mehsoos hone lagegi.</p>
    `,
    relatedProductId: "prod_1",
    createdAt: "2016-08-10T11:00:00.000Z"
  },
  {
    id: "post_aapa_5",
    title: "Limoo Ke Khoobsurti Aur Sehat Ke Liye 11 Behtareen Istemal",
    slug: "limoo-ke-khoobsurti-ke-liye-11-behtareen-istemal",
    category: "Wellness",
    summary: "Leemon qudrat ka muft skin tonic hai. Chehre ke daagh dhabbe, rangat nikharne aur oily skin ke masaail ke liye leemon ke 11 aazmooda gharelu nuskhe.",
    author: {
      name: "Marina Khan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      role: "Original Aapa.PK Health Writer"
    },
    reviewer: {
      name: "Dr. Debra Rose Wilson, PhD",
      date: "July 2026",
      credentials: "Dermatological Wellness Specialist"
    },
    readTime: "5 min read",
    evidenceLevel: "Vitamin C & Skin Physiology",
    coverImage: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    tags: ["Skin Care", "Lemon Benefits", "Totkay", "Beauty"],
    tableOfContents: [
      { id: "daagh-dhabbe", title: "1. Chehre Ke Daagh Dhabbe Door Karna" },
      { id: "kohini-gardun", title: "2. Kaali Kohni Aur Gardan Ka Ilaj" },
      { id: "oily-skin", title: "3. Oily Skin Aur Pimples Ka Khatma" }
    ],
    content: `
      <div class="article-takeaways">
        <h4><i class="fa-solid fa-clipboard-check"></i> Key Takeaways</h4>
        <ul>
          <li>Leemon mein citric acid aur Vitamin C shamil hote hain jo skin ko naturally exfoliate aur brighten karte hain.</li>
          <li>Hamesha leemon ke ras ko shahed ya arq-e-gulab ke sath mila kar chehre par lagayein taake jalan na ho.</li>
        </ul>
      </div>

      <h2 id="daagh-dhabbe">1. Chehre Ke Daagh Dhabbe Door Karna</h2>
      <p>Leemon ke ras mein barabar miqdar mein shahed mila kar daagh dhabbon par 15 minute ke liye lagayein, phir taaza pani se dho lein. Yeh qudrati bleaching agent ka kaam karta hai.</p>

      <h2 id="kohini-gardun">2. Kaali Kohni Aur Gardan Ka Ilaj</h2>
      <p>Aadhe kate leemon par thora sa meetha soda (baking soda) chhirak kar kohniyon aur ghutno par 5 minute ragrein. Mail aur siyahi foran saaf ho jati hai.</p>

      <h2 id="oily-skin">3. Oily Skin Aur Pimples Ka Khatma</h2>
      <p>Arq-e-gulab (Rose water) mein leemon ke ras ke chand qatre daal kar cotton ki madad se chehre par lagane se faltu tail saaf ho jata hai aur pimples nikalna band ho jate hain.</p>
    `,
    relatedProductId: "prod_6",
    createdAt: "2016-07-28T09:00:00.000Z"
  }
];

function runImport() {
  const currentPosts = db.getPosts();

  archiveArticles.forEach(art => {
    const existing = currentPosts.find(p => p.slug === art.slug || p.title === art.title);
    if (!existing) {
      currentPosts.unshift(art);
      console.log(`✓ Imported archived article: "${art.title}"`);
    } else {
      console.log(`- Already exists: "${art.title}"`);
    }
  });

  const postsFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(postsFile, JSON.stringify(currentPosts, null, 2), 'utf-8');
  console.log(`\nImport complete! Total articles in Aapa.PK now: ${currentPosts.length}`);
}

runImport();
