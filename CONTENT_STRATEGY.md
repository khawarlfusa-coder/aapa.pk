# Aapa.PK content strategy (Oct 2026)

Goal: AdSense approval -> traffic from the 667K Facebook page -> revenue (ads first, shop second).

## Rules for every article
1. Original, written in natural Roman Urdu (conversational, desi examples: chai, roti, achaar). No copying from Healthline or anywhere else; Healthline is only a structure model (key takeaways, short sections, sources, "when to see a doctor").
2. 600-900 words, 5-8 sections, clear H2s.
3. Every number traces to a source listed in `refs` (CDC, NIH, WHO, UNICEF NNS 2018, ACP, IDF, Mayo, AHA, National Academies). Number not verified = not written.
4. No invented doctors, no "medically reviewed by", no cure/guarantee claims, no supplement pushing. Always a "doctor se kab milein" section.
5. Pakistan angle where real data exists (NNS 2018, IDF Diabetes Atlas).

## Cadence
2 new articles/day (rotate categories). Backlog topics: diabetes warning signs (IDF: Pakistan 26.7% in 2021 atlas, ~27% undiagnosed), PCOS basics, constipation/fibre, hair fall causes, kidney stones & water, cholesterol & desi khana, heat stroke prevention, Ramadan-style fasting basics, back pain & posture, iron-rich desi recipes, sehri/iftar for diabetics, child nutrition (NNS stunting), sunscreen & pigmentation, dandruff, migraine triggers.

## Facebook loop (traffic)
Post each article as link + 1-line hook + image in the morning (9-11am PKT) and evening (8-10pm). Use the clean `/article/<slug>` URL. Reuse best performers as Reels (30-60s text-over-video).

## Weekly
Monday: check Search Console (indexed pages, queries). Rewrite 5 old thin posts (359 are 2016 FB imports) or noindex the thinnest.

## AdSense re-apply when
20+ original articles live, About + Contact pages, no fake credentials anywhere, pages indexed in Search Console.

## Publishing
`node scripts/publish.js content/batchN.js` -> commit -> push main -> Vercel deploys.
