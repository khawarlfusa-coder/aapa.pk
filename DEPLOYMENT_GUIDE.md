# Aapa.PK - Free Deployment & Custom Domain Guide (aapa.pk)

Yeh website **Node.js Express Full-Stack** application hai jismein 364 articles, Cash on Delivery (COD) checkout, aur WordPress admin authentication shamil hai.

---

## 🚀 Option 1: Render.com (Recommended - 100% Free Tier)

Render.com Node.js backend ke liye sab se aasan aur mufeed free platform hai jahan custom domain aur SSL bilkul free milta hai.

### Step 1: Project ko GitHub par Push Karein
Apne computer ke terminal / command prompt mein project folder ke andar ye commands run karein:

```bash
git init
git add .
git commit -m "Aapa.PK complete website ready for deployment"
git branch -M main
# GitHub par ek new repository banayein aur uska URL yahan dalein:
git remote add origin https://github.com/YOUR_USERNAME/aapa-pk.git
git push -u origin main
```

### Step 2: Render.com par Account aur Service Banayein
1. [Render.com](https://render.com) par jayein aur **Sign Up with GitHub** karein.
2. Dashboard par **New +** button click karein aur **Web Service** select karein.
3. Apni GitHub repository `aapa-pk` ko select karein.
4. Settings check karein:
   - **Name:** `aapa-pk`
   - **Region:** Singapore ya Frankfurt (Pakistan ke kareeb)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. **Create Web Service** par click karein. 2 se 3 minute mein aapki website live ho jayegi aur aapko ek link mil jayega (e.g. `https://aapa-pk.onrender.com`).

---

## 🌐 Step 3: Apna Domain `aapa.pk` Attach Karein

1. Render Dashboard mein apni service par click karein aur **Settings** mein jayein.
2. Scroll kar ke **Custom Domains** section mein jayein.
3. **Add Custom Domain** button click karein:
   - Enter karein: `aapa.pk`
   - Aur dobara click kar ke enter karein: `www.aapa.pk`
4. Render aapko DNS records show karega:
   - **A Record:** IP address (e.g. `216.24.57.1`)
   - **CNAME Record:** aapka Render URL (e.g. `aapa-pk.onrender.com`)

### Apne Domain Provider (PKNIC / Cloudflare / Namecheap) mein DNS dalein:
Apne domain control panel ke **DNS Records / DNS Management** mein jayein:

| Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (ya khali) | `Render ki di hui IP` | Auto / 3600 |
| **CNAME** | `www` | `aapa-pk.onrender.com` | Auto / 3600 |

> **SSL Note:** Cloudflare ya Render automatically 10 se 30 minute mein free **HTTPS / SSL Certificate** issue kar dega. Iske baad aapki website **`https://aapa.pk`** par direct khulegi!

---

## ⚡ Option 2: Vercel (Alternative Free Hosting)
Agar aap Vercel pasand karte hain:
1. [Vercel.com](https://vercel.com) par sign in karein.
2. "Add New Project" -> Select your GitHub repo.
3. Humne already `vercel.json` create kar diya hai, Vercel ise automatically detect kar ke deploy kar dega.
4. Project Settings -> Domains -> Add `aapa.pk`.
