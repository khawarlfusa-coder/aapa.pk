// Amazon Associates links, shown at the end of articles. Search links (not fixed ASINs) never go stale.
// Only everyday tools/gadgets: no supplements, no product that claims to treat anything.
const TAG = process.env.AMAZON_TAG || '9252888-20';
const link = q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

const RULES = [
  [/blood-pressure|namak/, ['Upper arm blood pressure monitor', 'Digital kitchen scale', 'Salt-free herb and spice blend']],
  [/neend|sleep/, ['Sleep eye mask', 'White noise machine', 'Analog alarm clock without phone']],
  [/pani|water/, ['Insulated water bottle 1 liter', 'Fruit infuser water bottle']],
  [/wazan|weight/, ['Digital kitchen scale', 'Body weight bathroom scale', 'Portion control plates']],
  [/vitamin-d/, ['SPF 50 sunscreen', 'Wide brim sun hat']],
  [/khoon|anemia|iron/, ['Manual citrus juicer', 'Weekly pill organizer']],
  [/diabetes/, ['Digital kitchen scale', 'Portion control plates', 'Step counter pedometer']],
  [/periods|cramps/, ['Electric heating pad', 'Hot water bottle with cover']],
  [/baal-jharne|hair/, ['Wide tooth comb', 'Silk pillowcase', 'Soft hair ties without metal']],
  [/qabz|fibre/, ['Toilet step stool', 'Food diary notebook', 'Meal prep containers']],
  [/cholesterol/, ['Digital kitchen scale', 'Oil spray bottle for cooking', 'Step counter pedometer']],
  [/shehad-limoo|limoo/, ['Manual citrus juicer', 'Insulated water bottle 1 liter', 'Reusable drinking straws']],
  [/dandruff|roosi/, ['Wide tooth comb', 'Silk pillowcase', 'Extra cotton towel set']],
  [/sunscreen|dhabbe/, ['SPF 50 sunscreen', 'Wide brim sun hat', 'Compact umbrella']],
  [/kamar-dard/, ['Electric heating pad', 'Hot water bottle with cover', 'Step counter pedometer']],
  [/acidity|gas/, ['Food diary notebook', 'Meal prep containers']]
];
const DEFAULT = ['Digital kitchen scale', 'Insulated water bottle 1 liter'];

function box(slug) {
  const items = (RULES.find(([re]) => re.test(slug)) || [, DEFAULT])[1];
  const li = items.map(q => `<li><a href="${link(q)}" target="_blank" rel="sponsored nofollow noopener">${q}</a></li>`).join('');
  return `<div class="affiliate-box" style="margin:28px 0;padding:16px 18px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc">` +
    `<h3 style="margin:0 0 8px;font-size:1.05rem">Roz ki madad ke liye kuch cheezen (Amazon)</h3><ul style="margin:0 0 8px 18px">${li}</ul>` +
    `<p style="margin:0;font-size:.8rem;color:#64748b">As an Amazon Associate I earn from qualifying purchases. Yeh links affiliate hain: aap ki qeemat nahi barhti, hamein chhota sa commission mil sakta hai. Yeh cheezen koi bimari theek nahi karti aur doctor ke mashware ka mutabadal nahi.</p></div>`;
}
module.exports = { box };
