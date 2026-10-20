// Static page generator: `node build.mjs` writes all .html files next to this script.
import { writeFileSync } from 'node:fs';

const EMAIL = 'info@ijazwebfolio.com';
const WA = 'https://wa.me/923051925258';
const WA_TXT = '+92 305 1925258';
const LINKEDIN = 'https://www.linkedin.com/in/ijaz-akram-244150263/';
const img = (n, w = 1400) => `assets/img/p${String(n).padStart(2, '0')}.webp`;

const pages = [
  ['index.html', 'Home'], ['about.html', 'About'], ['website-design.html', 'Website Design'],
  ['seo.html', 'SEO'], ['paid-advertising.html', 'Paid Advertising'],
  ['lead-generation.html', 'Lead Generation'], ['wix-white-label.html', 'White Label'], ['portfolio.html', 'Portfolio'], ['contact.html', 'Contact'],
];


/* ---------- svg icon set (replaces emoji) ---------- */
const P = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l8 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 10.5c0 2.6 2 4.5 4.5 4.5l1.3-1.3-1.8-.9-.9.7c-.9-.4-1.6-1-2-1.9l.7-.9-.9-1.8z"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4m2 3v-4h-4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  building: '<path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 9h5a1 1 0 0 1 1 1v11M2 21h20M8 8h2M8 12h2M8 16h2"/>',
  sparkle: '<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
  puzzle: '<path d="M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4h2a2 2 0 1 0 0-4H6V6h4z"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8H18a1 1 0 0 0 1-.8L21 7H6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7"/>',
  repeat: '<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>',
};
const EMOJI = { '🌐': 'globe', '🔎': 'search', '📣': 'megaphone', '🎯': 'target', '⚡': 'bolt', '💬': 'chat', '🏢': 'building', '✨': 'sparkle', '🧩': 'puzzle', '📝': 'pen', '🛒': 'cart', '🛍': 'bag', '🔄': 'refresh', '🛠': 'wrench', '📄': 'doc', '💡': 'bulb', '🔗': 'link', '📈': 'trend', '🧭': 'compass', '⚙': 'cog', '📊': 'chart', '🔑': 'key', '✍': 'pen', '📍': 'pin', '📱': 'phone', '✉': 'mail', '🏆': 'award', '🔒': 'shield', '🔁': 'repeat', '📚': 'layers', '👤': 'user', '🏷': 'tag' };
const svg = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const emojiRe = new RegExp(Object.keys(EMOJI).join('|'), 'g');
const iconize = (html) => html.replace(/\uFE0F/g, '').replace(emojiRe, (m) => svg(EMOJI[m])).replace('✋ ', '');

const nav = (cur) => `
<header class="nav"><div class="pill">
  <a class="logo" href="index.html" aria-label="Ijaz Web Folio home">ijaz<span>.</span>webfolio</a>
  <button class="mbtn" aria-expanded="false" aria-controls="ovl">Menu <i></i></button>
</div></header>
<div class="ovl" id="ovl"><div class="wrap ovl-in">
  <ul>${pages.map(([h, t], i) => `<li style="--i:${i}"><a href="${h}" class="${h === cur ? 'on' : ''}"><small>0${i + 1}</small>${t}</a></li>`).join('')}</ul>
  <div class="ovl-side"><h4>Services</h4><a href="website-design.html">Website Design &amp; Development</a><a href="seo.html">Search Engine Optimization</a><a href="paid-advertising.html">Google &amp; Meta Ads</a><a href="lead-generation.html">Lead Generation</a><a href="wix-white-label.html">Wix White Label</a>
    <a class="btn btn-p" href="contact.html">Start a Project</a>
    <h4>Connect</h4><a href="mailto:${EMAIL}">${EMAIL}</a><a href="${WA}" target="_blank" rel="noopener">WhatsApp ${WA_TXT}</a><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></div>
</div></div>`;

const footer = `
<footer><div class="wrap">
  <div class="fgrid">
    <div><div class="big">Let's build something that moves you <em>forward.</em></div></div>
    <div><h4>Explore</h4><ul>${pages.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Connect</h4><ul>
      <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
      <li><a href="${WA}" target="_blank" rel="noopener">WhatsApp ${WA_TXT}</a></li>
      <li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="https://ijazwebfolio.com">ijazwebfolio.com</a></li></ul></div>
  </div>
  <div class="copy"><span>© ${new Date().getFullYear()} Ijaz — Website Design &amp; Digital Growth</span><span>Build. Market. Grow.</span></div>
</div></footer>`;

const shapeSets = [
  [['c', 'width:120px;height:120px;right:5%;top:8%', -.7], ['q o', 'width:70px;height:70px;left:3%;bottom:10%', .8, 160], ['t', 'width:46px;height:46px;left:48%;top:6%', -.5, 200]],
  [['r', 'width:200px;height:200px;left:-60px;top:10%', .5, 90], ['p', 'width:50px;height:50px;right:8%;bottom:14%', -.9, 180], ['c pk', 'width:34px;height:34px;right:20%;top:12%', .6]],
  [['q', 'width:110px;height:110px;right:3%;bottom:8%', -.6, 40], ['c am', 'width:30px;height:30px;left:6%;top:14%', .9], ['z', 'right:12%;top:8%', -.4]],
];
let fxN = 0;
const fx = () => { const set = shapeSets[fxN++ % shapeSets.length]; return `<div class="fx">${set.map(([c, st, sp, rot]) => `<i class="s ${c}" style="${st}" data-speed="${sp}"${rot ? ` data-rot="${rot}"` : ''}></i>`).join('')}</div>`; };
const bandWords = ['Design · Market · Grow', 'Build · Rank · Convert'];
const band = (w, f) => `<div class="band ${f}" aria-hidden="true"><div class="t" data-dir="${f ? 1 : -1}">${[0, 1, 2].map(() => `<span>${w}</span>`).join('')}</div></div>`;
const decorate = (body, file) => body
  .replace(/(<section class="(?:sec|pin)[^"]*">)/g, (m) => m + fx())
  .replace('<section class="sec cta">', band(bandWords[0], '') + band(bandWords[1], 'f') + '<section class="sec cta">');

const layout = (file, title, desc, rawBody) => { let body = iconize(decorate(rawBody, file)); if (zoomFor[file]) body = body.replace('</section>', '</section>' + zoom(zoomFor[file]) + (stageFor[file] ? stage(stageFor[file]) : '')); return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | Ijaz Web Folio</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#EF6927"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23EF6927'/%3E%3Ccircle cx='23' cy='22' r='4' fill='%23ffffff'/%3E%3Cpath d='M8 8h4v16H8z' fill='%23fff'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;700&display=swap">
<link rel="stylesheet" href="assets/css/style.css">
<script>var h=document.documentElement;h.classList.add('js');try{var z=sessionStorage;if(z.getItem('pre')||z.getItem('wipe'))h.classList.add('nopre');else z.setItem('pre','1');if(z.getItem('wipe')){h.classList.add('wiped');z.removeItem('wipe')}}catch(e){h.classList.add('nopre')}setTimeout(function(){h.classList.add('ready');var p=document.querySelector('.pre');if(p)p.style.display='none'},4500)</script>
</head><body>
<div class="pre"><div class="pre-in"><div class="pre-logo">ijaz<span>.</span>webfolio</div><b class="pre-n">0</b></div><i class="pre-bar"></i></div>
<div class="wipe"><i></i><i></i><i></i><i></i><i></i></div>
<div id="bar"></div><div id="cur"></div>
${nav(file)}
<main>${body}</main>
${footer}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js" defer></script>
<script src="assets/js/main.js" defer></script>
</body></html>`; };

/* ---------- section helpers ---------- */
const btn = (t, h, c = 'btn-p') => `<a class="btn ${c}" href="${h}">${t}</a>`;
const chips = [['🌐', 'Design'], ['🔎', 'SEO'], ['📣', 'Ads'], ['🎯', 'Leads']];
const hero = ({ eye, h1, ps, ctas = '', tags, bg, video, short }) => `
<section class="hero ${short ? 'short' : ''}">
  <div class="fx"><i class="s c" style="width:80px;height:80px;left:49%;top:56%" data-speed="-.6"></i><i class="s q o" style="width:60px;height:60px;left:46%;top:12%" data-speed=".8" data-rot="120"></i><i class="s p" style="width:44px;height:44px;left:40%;bottom:12%" data-speed="-.9" data-rot="180"></i><i class="s c pk" style="width:26px;height:26px;left:8%;bottom:20%" data-speed=".5"></i><i class="s z" style="right:6%;bottom:10%" data-speed="-.4"></i></div>
  <div class="wrap hero-grid"><div class="hero-copy"><span class="eyebrow">${eye}</span>
    <h1 data-split>${h1}</h1>
    ${ps.map((p) => `<p class="lead" data-r>${p}</p>`).join('')}
    <div class="row" data-r>${ctas}</div>
    ${tags ? `<div class="tags" data-r>${tags.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}
  </div>
  <div class="hero-vis"><i class="s r"></i><div class="frame"><img src="${img(bg)}" alt="" fetchpriority="high" decoding="async" width="1400" height="1750">${video ? '<video muted loop playsinline preload="none" data-src="assets/video/hero.mp4" aria-hidden="true"></video>' : ''}</div>
    ${chips.map((c, i) => `<span class="chip c${i + 1}" style="--d:${[28, -34, 22, -26][i]}" data-speed="${[.5, -.7, .8, -.4][i]}"><b>${c[0]}</b>${c[1]}</span>`).join('')}</div>
  </div><i class="scrollcue"></i>
</section>`;

const marquee = (words) => { const w = words.map((x) => `<span>${x}</span>`).join(''); return `<div style="overflow:hidden;padding:30px 0"><div class="marquee"><div>${w}${w}</div></div></div>`; };

const story = ({ eye, h2, ps, src, badge, rev, cls = '', cta = '' }) => `
<section class="sec ${cls}"><div class="wrap split ${rev ? 'rev' : ''}">
  <div><span class="eyebrow">${eye}</span><h2 data-split>${h2}</h2>${ps.map((p) => `<p data-scrub class="lead">${p}</p>`).join('')}${cta ? `<div class="row" data-r>${cta}</div>` : ''}</div>
  <div class="media">${badge ? `<span class="badge">${badge}</span>` : ''}<img src="${img(src)}" alt="" loading="lazy" decoding="async" width="1400" height="1750"></div>
</div></section>`;

const cards = ({ eye, h2, intro, items, cols = '', cls = '', icons }) => `
<section class="sec ${cls}"><div class="wrap">
  <div class="head">${eye ? `<span class="eyebrow">${eye}</span>` : ''}<h2 data-split>${h2}</h2>${intro ? `<p class="lead" data-r>${intro}</p>` : ''}</div>
  <div class="cards ${cols}">${items.map((it, i) => `
    <article class="card" data-r>
      ${icons ? `<div class="ic">${icons[i]}</div>` : `<div class="n"><span>${String(i + 1).padStart(2, '0')}</span></div>`}
      <h3>${it[0]}</h3><p>${it[1]}</p>${it[2] ? `<a class="more" href="${it[3]}">${it[2]}</a>` : ''}
    </article>`).join('')}</div>
</div></section>`;

const steps = ({ eye, h2, items, cls = '', plain }) => `
<section class="sec ${cls}"><div class="wrap">
  <div class="head" style="margin-inline:auto;text-align:center"><span class="eyebrow">${eye}</span><h2 data-split>${h2}</h2></div>
  <div class="steps ${plain ? 'plain' : ''}"><i class="fill"></i>${items.map((it, i) => `
    <div class="step" data-r><div class="dot">${plain ? i + 1 : String(i + 1).padStart(2, '0')}</div><div><h3>${it[0]}</h3>${it[1] ? `<p>${it[1]}</p>` : ''}</div></div>`).join('')}</div>
</div></section>`;

const checks = ({ eye, h2, intro, items, note, x, cls = '', after }) => `
<section class="sec ${cls}"><div class="wrap split">
  <div><span class="eyebrow">${eye}</span><h2 data-split>${h2}</h2>${intro ? `<p class="lead" data-r>${intro}</p>` : ''}${after ? `<p data-r>${after}</p>` : ''}${note ? `<div class="note" data-r>${note}</div>` : ''}</div>
  <ul class="checks ${x ? 'x' : ''}">${items.map((i) => `<li data-r>${i}</li>`).join('')}</ul>
</div></section>`;

const cta = (h2, p, c1, c2) => `
<section class="sec cta"><div class="wrap"><h2 data-split>${h2}</h2><p data-r>${p}</p>
  <div class="row" data-r>${c1}${c2 || ''}</div></div></section>`;

const projects = [
  { img: 'w1.jpg', img2: 'x1.jpg', tag: 'Luxury Interiors', name: 'Luxe Interiors', kind: 'Wix website · Interior design', url: 'https://zcorebit5.wixsite.com/luxe-interiors' },
  { img: 'w2.jpg', img2: 'x2.jpg', tag: 'Personal Brand', name: 'Selin Bilgen', kind: 'Wix Studio · Portfolio site', url: 'https://selinbilgen2.wixstudio.com/selin-bilgen' },
  { img: 'w3.jpg', img2: 'x3.jpg', tag: 'Tech & Digital', name: 'Zcorebit', kind: 'Full website · Tech business', url: 'https://www.zcorebit.com/' },
  { img: 'w4.jpg', img2: 'x4.jpg', tag: 'Home Services', name: 'Pinnacle House Painters', kind: 'Business website · Home services', url: 'https://www.pinnaclehousepainters.com/' },
  { img: 'w5.jpg', img2: 'x5.jpg', tag: 'Design Studio', name: 'AGF Interior Design', kind: 'Full website · Interior design', url: 'https://www.agfinteriordesign.com/' },
  { img: 'w6.jpg', img2: 'x6.jpg', tag: 'Creative Studio', name: 'Papelite Studio', kind: 'Wix Studio · Interior design', url: 'https://papelitestudio.wixstudio.com/interiordesign' },
];
const projCard = (p) => `
<article class="proj" data-cursor="Visit"><a class="pic" href="${p.url}" target="_blank" rel="noopener" aria-label="${p.name} live site"><img src="assets/img/${p.img}" alt="${p.name} website preview" loading="lazy" decoding="async" width="1280" height="800"><span>${p.tag}</span></a>
  <div class="txt"><h3>${p.name}</h3><small>${p.kind}</small><a class="more" href="${p.url}" target="_blank" rel="noopener">View Live Site</a></div></article>`;

const deck = ({ items, icons }) => `
<section class="sec sand deck"><div class="wrap"><div class="head"><span class="eyebrow">Services</span><h2 data-split>Everything your business needs to <em>grow online.</em></h2></div>
<div class="deck-list">${items.map((it, i) => `<article class="deck-card" style="--i:${i}"><div><span class="n">0${i + 1} / 0${items.length}</span><h3>${it[0]}</h3><p>${it[1]}</p><a class="more" href="${it[3]}">${it[2]}</a></div><div class="dv">${icons[i]}</div></article>`).join('')}</div></div></section>`;

const gal = () => `
<section class="sec gal"><div class="wrap head"><span class="eyebrow">Design with purpose</span><h2 data-split>Every decision makes the <em>next step clear.</em></h2>
<p class="lead" data-r style="margin-inline:auto">Every website decision should support usability, communicate your value, and make the next step clear to visitors.</p></div>
<div class="gal-row" data-dir="-1">${[23, 24, 25, 26, 27, 28].map((n) => `<img src="${img(n, 700)}" alt="" loading="lazy" decoding="async" width="700" height="467">`).join('')}</div>
<div class="gal-row" data-dir="1">${[29, 30, 31, 32, 33, 34].map((n) => `<img src="${img(n, 700)}" alt="" loading="lazy" decoding="async" width="700" height="467">`).join('')}</div></section>`;

const tools = ['Wix Studio', 'WordPress', 'Elementor', 'Shopify Design', 'Shopify Redesign', 'WooCommerce', 'Wix Ecommerce', 'Velo', 'CMS Collections', 'Google Ads', 'Meta Ads', 'Technical SEO', 'Landing Pages', 'Lead Capture', 'Conversion Tracking'];
const tc = [['#EF6927', '#1b1411'], ['#fff', '#1b1411']];
const play = () => `
<section class="sec"><div class="wrap head" style="margin-bottom:40px"><span class="eyebrow">Platforms &amp; Tools</span><h2 data-split>The right tools for <em>your project.</em></h2>
<p class="lead" data-r>I select the tools and methods according to the project, rather than forcing every business into the same solution.</p></div>
<div class="wrap"><div class="play">${tools.map((t, i) => `<span class="pill-t" style="--c:${tc[i % 2][0]};--tc:${tc[i % 2][1]}">${t}</span>`).join('')}</div><p class="hint">✋ Grab a tag and throw it around</p></div></section>`;

const zoom = ({ word, idx, kicker, h, p, src, scale = 24 }) => {
  const letters = word.split('').map((ch, i) => (i === idx ? `<span>${ch}</span>` : ch)).join('');
  const fs = `min(27rem,${(96 / (word.length * 0.66)).toFixed(1)}vw)`;
  return `
<section class="zoom" data-scale="${scale}" aria-label="${word}"><div class="zoom-pin"><img class="zoom-img" src="${img(src)}" alt="" loading="lazy" decoding="async" width="1400" height="933">
  <div class="zoom-mask" aria-hidden="true"><div class="zoom-k">${kicker}</div><h2 class="zoom-t" style="--fs:${fs}">${letters}</h2></div>
  <div class="zoom-cap"><h2>${h}</h2><p>${p}</p></div></div></section>`;
};
const zoomHome = { word: 'GROW', idx: 2, kicker: 'One connected strategy', h: 'Your website is just the beginning.', p: 'Your website and marketing should support each other. I help connect the pieces so your digital efforts work toward shared objectives.', src: 9, scale: 24 };
const zoomFor = {
  'about.html': { word: 'HELLO', idx: 4, kicker: 'A little about me', h: 'Good digital work starts with understanding the business.', p: 'Every business has different goals, customers, and challenges.', src: 10, scale: 24 },
  'website-design.html': { word: 'BUILD', idx: 4, kicker: 'Website design & development', h: 'Design with purpose.', p: 'Every website decision should support usability, communicate your value, and make the next step clear to visitors.', src: 11, scale: 30 },
  'seo.html': { word: 'FOUND', idx: 1, kicker: 'Search engine optimization', h: 'Build a stronger foundation before chasing rankings.', p: 'SEO is a long-term process, and results depend on factors such as competition, website condition, content quality, and search demand.', src: 12, scale: 24 },
  'paid-advertising.html': { word: 'ADS', idx: 1, kicker: 'Google Ads & Meta Ads', h: 'Ads are only one part of the equation.', p: 'The offer, the audience, the message, the landing page and the measurement all play a role.', src: 13, scale: 30 },
  'lead-generation.html': { word: 'CONVERT', idx: 1, kicker: 'Lead generation & conversion', h: 'A clearer path from visitor to customer.', p: 'Small points of friction can create unnecessary barriers. Let\'s find and remove them.', src: 14, scale: 24 },
  'wix-white-label.html': { word: 'YOURS', idx: 1, kicker: 'Your agency. Your credit.', h: 'Your brand. Your credit. My craft.', p: "Every deliverable goes out under your agency's name and branding.", src: 42, scale: 24 },
  'portfolio.html': { word: 'WORK', idx: 1, kicker: 'Selected work', h: 'Ideas turned into digital experiences.', p: 'Each project reflects a unique combination of business requirements, design decisions, user experience, and technical implementation.', src: 15, scale: 24 },
};

const stage = ({ eye = 'One connected strategy', h = 'Every piece, <em>working together.</em>', p = 'Your website and marketing should support each other. I help connect the pieces so your digital efforts work toward shared objectives.', labels = ['Design', 'Visibility', 'Conversion'], shapes = ['ring', 'sphere', 'knot'] } = {}) => `
<section class="stage" data-shapes="${shapes.join(',')}"><div class="stage-pin"><canvas class="stage-cv" aria-hidden="true"></canvas>
  <div class="stage-copy"><span class="eyebrow">${eye}</span><h2 data-split>${h}</h2>
  <p class="lead">${p}</p></div>
  <div class="stage-labs">${labels.map((l, i) => `<span class="stage-lab${i ? '' : ' on'}">${l}</span>`).join('')}</div></div></section>`;
const stageFor = {
  'wix-white-label.html': { eye: 'How it works', h: 'From brief to handoff, <em>invisibly.</em>', p: "A clean, professional workflow designed to fit seamlessly inside your agency's existing process.", labels: ['Brief & scope', 'Design & build', 'Handoff'], shapes: ['cube', 'wave', 'sphere'] },
  'about.html': { eye: 'My Approach', h: 'Understand first, <em>then build.</em>', p: 'My approach is to understand what needs to improve, recommend a practical direction, and focus on work that serves a clear purpose.', labels: ['Understand', 'Recommend', 'Deliver'], shapes: ['spiral', 'helix', 'sphere'] },
  'website-design.html': { eye: 'My Process', h: 'From first call <em>to launch day.</em>', p: 'Discovery, structure, design, testing and launch, shaped around the scope and complexity of your project.', labels: ['Discovery', 'Design & build', 'Launch'], shapes: ['wave', 'cube', 'sphere'] },
  'seo.html': { eye: 'My SEO Approach', h: 'Strong foundations, <em>steady growth.</em>', p: 'Review the website, identify opportunities, and organize recommendations into a practical action plan.', labels: ['Audit', 'Prioritize', 'Monitor'], shapes: ['spiral', 'bars', 'ring'] },
  'paid-advertising.html': { eye: 'A Practical Campaign Process', h: 'Every part of the campaign <em>working together.</em>', p: 'Audience targeting, campaign structure, messaging, landing pages, tracking, and ongoing optimization all play a role.', labels: ['Audience', 'Message', 'Measurement'], shapes: ['torus', 'funnel', 'sphere'] },
  'lead-generation.html': { eye: 'Marketing Funnel Alignment', h: 'Visitors in, <em>leads out.</em>', p: 'Connect ads, landing pages, and follow-up actions into a more consistent customer journey.', labels: ['Visit', 'Engage', 'Inquire'], shapes: ['wave', 'funnel', 'ring'] },
};

const ringImgs = [4, 7, 8, 2, 5, 11, 6, 9, 10, 3, 1, 4];
const ring = () => `
<section class="ring"><div class="ring-pin"><div class="wrap head" style="text-align:center;margin-inline:auto"><span class="eyebrow">Project Portfolio</span><h2 data-split>Spin through <em>selected work.</em></h2></div>
  <div class="ring-scene"><div class="ring-r">${ringImgs.map((n, i) => `<figure class="ring-c" style="--i:${i}"><img src="${img(n, 700)}" alt="" loading="lazy" decoding="async" width="700" height="467"><figcaption><b>Project Name ${String(i + 1).padStart(2, '0')}</b><span>Industry · Platform</span></figcaption></figure>`).join('')}</div></div></div></section>`;

const ico = ['🌐', '🔎', '📣', '🎯', '⚡', '💬', '📚'];

/* ---------- pages ---------- */
const out = {};

out['index.html'] = layout('index.html', 'Build. Market. Grow. — Website Design & Digital Growth',
  'Ijaz helps businesses build professional websites, attract the right audience and turn their digital presence into real business opportunities.',
  hero({
    eye: 'WEBSITE DESIGN &amp; DIGITAL GROWTH', h1: 'Build. <em>Market.</em> Grow.', bg: 1, video: true,
    ps: ['I help businesses build professional websites, attract the right audience, and turn their digital presence into real business opportunities.',
      'From website design and SEO to paid advertising and lead generation, I bring your digital efforts together to help your business move forward.'],
    ctas: btn("Let's Discuss Your Project", 'contact.html') + btn('Explore My Work', 'portfolio.html', 'btn-g'),
    tags: ['Website Design', 'SEO', 'Google Ads', 'Meta Ads', 'Lead Generation'],
  }) +
  marquee(['Website Design', 'SEO', 'Google Ads', 'Meta Ads', 'Lead Generation', 'Conversion']) +
  /* pinned storytelling: Your digital growth partner */
  `<section class="pin dark"><div class="wrap grid">
    <div><span class="eyebrow">Your Digital Growth Partner</span>
      <div class="pin-copy">
        <div class="pin-step"><b>01</b><h2>Your website is just the <em>beginning.</em></h2><p class="lead">A great website is important, but it shouldn't work in isolation. Your online presence needs the right design, visibility, messaging, and conversion strategy to support your business goals.</p></div>
        <div class="pin-step"><b>02</b><h2>Design meets <em>marketing.</em></h2><p class="lead">I combine website development with digital marketing to help businesses create a stronger foundation for sustainable growth.</p></div>
        <div class="pin-step"><b>03</b><h2>The right approach for <em>your goals.</em></h2><p class="lead">Whether you're launching a new business, redesigning an existing website, or looking to generate more leads, I'll help you identify the right approach.</p></div>
      </div><div class="dots"><i class="on"></i><i></i><i></i></div></div>
    <div class="pin-vis"><div class="card-v"><img src="${img(16)}" alt="" loading="lazy" width="520" height="520"></div><div class="card-v"><img src="${img(17)}" alt="" loading="lazy" width="520" height="520"></div><div class="card-v"><img src="${img(18)}" alt="" loading="lazy" width="520" height="520"></div></div>
  </div></section>` +
  zoom(zoomHome) +
  stage() +
  gal() +
  deck({
    icons: ico,
    items: [
      ['Website Design &amp; Development', 'Professional, responsive websites designed to communicate your value, build trust, and encourage visitors to take action.', 'Explore Website Design', 'website-design.html'],
      ['Search Engine Optimization (SEO)', "Improve your website's technical foundation, search visibility, and ability to attract relevant organic traffic.", 'Explore SEO Services', 'seo.html'],
      ['Google Ads &amp; Meta Ads', 'Reach potential customers through targeted advertising campaigns built around your audience, budget, and business objectives.', 'Explore Paid Advertising', 'paid-advertising.html'],
      ['Lead Generation', 'Create a more effective path from discovering your business to becoming a qualified prospect through landing pages, forms, and campaign strategy.', 'Explore Lead Generation', 'lead-generation.html'],
      ['Website Conversion Optimization', 'Identify friction in your website experience and improve the pages, messaging, and calls to action that guide visitors toward conversion.', 'Improve My Website', 'lead-generation.html'],
      ['Social Media Marketing', 'Build a more consistent online presence and align your social media activity with your wider marketing goals.', 'Discuss Social Media Marketing', 'contact.html'],
      ['Wix White Label Services', 'Agency-grade Wix and Wix Studio websites delivered in your name. A silent design and SEO partner for agencies and freelancers.', 'Explore White Label', 'wix-white-label.html'],
    ],
  }) +
  play() +
  `<section class="sec dark"><div class="wrap">
    <div class="head"><span class="eyebrow">Why Work With Me?</span><h2 data-split>Practical solutions. Clear communication. <em>Business-focused thinking.</em></h2></div>
    <div class="cards c2">
      ${[['A personalized approach', 'You work directly with me throughout the project, with solutions tailored to your business rather than a one-size-fits-all package.'],
        ['Design with purpose', 'Every website decision should support usability, communicate your value, and make the next step clear to visitors.'],
        ['Marketing beyond the launch', 'A website is a starting point. SEO, paid campaigns, and conversion improvements can help you build on that foundation over time.'],
        ['One connected strategy', 'Your website and marketing should support each other. I help connect the pieces so your digital efforts work toward shared objectives.']]
        .map((c, i) => `<article class="card" data-r><div class="n"><span>0${i + 1}</span></div><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join('')}
    </div>
    <div class="stats"><div class="stat" data-r><b data-count="4" data-suf="+">4+</b><span>Years in website design &amp; development</span></div>
      <div class="stat" data-r><b data-count="7">7</b><span>Connected digital services</span></div>
      <div class="stat" data-r><b data-count="1">1</b><span>Strategy tying it all together</span></div></div>
  </div></section>` +
  `<section class="sec dark" style="padding-top:0"><div class="wrap head"><span class="eyebrow">Selected Work</span><h2 data-split>Ideas turned into <em>digital experiences.</em></h2>
    <p class="lead" data-r>Explore live websites built and delivered for businesses across interiors, home services, tech and creative studios.</p>
    <p class="lead" data-r>Each project reflects a unique combination of business requirements, design decisions, user experience, and technical implementation.</p></div>
    <div class="hs"><div class="hs-track">${projects.map(projCard).join('')}</div></div>
    <div class="wrap row"><a class="btn btn-p" href="portfolio.html">View All Projects</a></div></section>` +
  steps({
    eye: 'My Process', h2: 'A straightforward approach from <em>start to launch.</em>',
    items: [['Discover', 'We discuss your business, audience, challenges, and goals to understand what you actually need.'],
      ['Plan', 'I define the project scope, priorities, structure, and recommended approach.'],
      ['Build', 'I design, develop, or implement the agreed solution, keeping you informed throughout the process.'],
      ['Refine', 'We review the work, address agreed feedback, and make sure the final delivery aligns with the project requirements.'],
      ['Improve', 'Where relevant, we identify opportunities for ongoing SEO, advertising, maintenance, and conversion optimization.']],
  }) +
  cta('Ready to strengthen your online presence?', "Whether you need a new website, better search visibility, or a more effective way to generate leads, let's discuss what your business needs next.",
    btn("Let's Talk About Your Project", 'contact.html'), btn('Explore My Portfolio', 'portfolio.html', 'btn-g')));

out['about.html'] = layout('about.html', 'About Ijaz', 'Independent website designer and digital growth specialist with 4+ years of experience.',
  hero({
    eye: 'A LITTLE ABOUT ME', h1: 'Your digital partner for <em>what\'s next.</em>', bg: 2, short: true,
    ps: ["I'm Ijaz, an independent website designer and digital growth specialist helping businesses improve how they present, promote, and grow their brands online.",
      'With 4+ years of experience in website design and development, I understand the work that goes into building a strong digital presence — from the first design decision to the technical details behind a functional website.',
      'My focus extends beyond development. I also work across SEO, paid advertising, lead generation, and website conversion optimization to help businesses connect their websites with their broader marketing goals.'],
    ctas: btn('Work With Me', 'contact.html'),
  }) +
  story({
    eye: 'My Approach', h2: 'Good digital work starts with <em>understanding the business.</em>', src: 19, badge: 'Problem first. Tools second.',
    ps: ["Every business has different goals, customers, and challenges. That's why I believe the right solution starts with understanding the problem before choosing the tools.",
      'Sometimes that means building a website from scratch. Sometimes it means improving an existing site, fixing technical issues, strengthening search visibility, or creating a better landing page for an advertising campaign.',
      'My approach is to understand what needs to improve, recommend a practical direction, and focus on work that serves a clear purpose.'],
  }) +
  checks({
    eye: 'What I Bring to the Table', h2: 'One partner, <em>many strengths.</em>', cls: 'dark',
    items: ['Website design and development across modern website platforms.', 'SEO improvements that support technical quality and organic visibility.', 'Google Ads and Meta Ads campaign support.', 'Landing pages and lead-generation experiences.', 'Website usability and conversion optimization.', 'Ongoing website support and digital improvements.'],
    note: 'I select the tools and methods according to the project, rather than forcing every business into the same solution.',
  }) +
  story({
    eye: 'How I Work', h2: 'Direct collaboration. <em>Clear expectations.</em>', src: 20, rev: true, cls: 'sand',
    ps: ['As an independent professional, I work directly with clients to understand their needs, discuss recommendations, and deliver agreed project work.',
      'You can expect clear communication, a defined scope, practical guidance, and a focus on the details that matter to your business.',
      'I value long-term working relationships built on trust, transparency, and consistent delivery.'],
  }) +
  play() +
  cta("Have an idea, a challenge, or a project in mind?", "I'd love to hear what you're working on and explore whether I can help.", btn('Get in Touch', 'contact.html')));

out['website-design.html'] = layout('website-design.html', 'Website Design & Development', 'Responsive, user-friendly websites on Wix Studio, WordPress, Shopify and more — built for your business.',
  hero({
    eye: 'WEBSITE DESIGN &amp; DEVELOPMENT', h1: 'Websites built for your business, <em>not just your brand.</em>', bg: 3, short: true,
    ps: ['Your website is often the first place potential customers learn about your business. It should communicate your value clearly, create a professional impression, and make it easy for visitors to take the next step.',
      'I design and develop responsive, user-friendly websites that align with your brand, business objectives, and customer needs.'],
    ctas: btn('Discuss Your Website', 'contact.html') + btn('View My Work', 'portfolio.html', 'btn-g'),
  }) +
  cards({
    eye: 'Website Services', h2: 'The right website solution for <em>your needs.</em>', cls: 'sand', icons: ['🏢', '✨', '🧩', '📝', '🛒', '🛍️', '🔄', '🎯', '🛠️'],
    items: [['Business Website Design', 'Professional websites that explain your services, establish credibility, and make it easier for potential customers to contact you.'],
      ['Website Redesign', 'Refresh an outdated website with a more modern design, improved structure, clearer messaging, and a better user experience.'],
      ['Wix Studio &amp; Wix Development', 'Custom Wix Studio and Wix Editor websites, CMS collections, dynamic pages, repeaters, responsive layouts, and Velo functionality where required.'],
      ['WordPress &amp; Elementor', 'Flexible WordPress websites, Elementor-based page design, content management, and website improvements tailored to your requirements.'],
      ['Ecommerce Website Development', 'Online stores and product experiences using suitable platforms such as Shopify, WooCommerce, and Wix Ecommerce.'],
      ['Shopify Store Design', 'Custom Shopify stores built around your products and brand, with clear product pages, easy navigation, and a checkout journey that makes buying simple.'],
      ['Shopify Store Redesign', 'Refresh an existing Shopify store with a cleaner layout, stronger product presentation, a better mobile experience, and a clearer path from browsing to purchase.'],
      ['Landing Pages', 'Focused landing pages designed around a particular service, offer, campaign, or conversion objective.'],
      ['Website Maintenance', 'Ongoing updates, content changes, troubleshooting, responsive adjustments, and technical support.']],
  }) +
  cards({
    eye: 'My Website Philosophy', h2: 'More than <em>attractive visuals.</em>', cls: 'dark', cols: 'c4',
    items: [['Clear messaging', 'Visitors should quickly understand what you offer, who you help, and why they should consider your business.'],
      ['Intuitive user experience', 'Navigation, page structure, and calls to action should make the next step easy to understand.'],
      ['Responsive design', 'Your website should provide a consistent experience across desktop, tablet, and mobile devices.'],
      ['Conversion awareness', 'Forms, contact options, service information, and landing pages should support the actions that matter to your business.'],
      ['A manageable foundation', 'Where appropriate, I build websites with practical content management and future updates in mind.']],
  }).replace('c4', 'c4') +
  steps({
    eye: 'My Process', h2: 'From first call to <em>launch day.</em>', plain: true,
    items: [['Discovery and requirements'], ['Sitemap and content structure'], ['Design and development'], ['Responsive testing and refinements'], ['Launch and handover'], ['Optional ongoing maintenance and improvements']],
  }).replace('</div></section>', '<p style="text-align:center;margin-top:20px;opacity:.7">The exact process depends on the scope and complexity of your project.</p></div></section>') +
  checks({
    eye: 'Is It Time for a New Website?', h2: 'You may benefit from a redesign if…', x: true, cls: 'sand',
    items: ['Your existing site looks outdated.', 'Visitors struggle to understand your services.', 'Your mobile experience needs improvement.', 'Your business has outgrown its current website.', "Your landing pages aren't supporting your marketing goals.", 'Updating your website has become difficult.'],
  }) +
  cta("Let's build a website that moves your business forward.", "Tell me about your business, your current website, and what you'd like to improve.", btn('Request a Website Consultation', 'contact.html')));

out['seo.html'] = layout('seo.html', 'Search Engine Optimization (SEO)', 'Technical SEO, on-page SEO, keyword research, content optimization and local SEO support.',
  hero({
    eye: 'SEARCH ENGINE OPTIMIZATION', h1: 'Get found by the people looking for <em>what you offer.</em>', bg: 4, short: true,
    ps: ['A useful website needs more than good design. Your potential customers must also be able to discover it.',
      "I help businesses improve their website's SEO foundation, strengthen relevant search visibility, and create a clearer path for search visitors to discover their products or services.",
      'SEO is a long-term process, and results depend on factors such as competition, website condition, content quality, and search demand.'],
    ctas: btn('Discuss My SEO Goals', 'contact.html'),
  }) +
  cards({
    eye: 'SEO Services', h2: 'Everything search needs, <em>done properly.</em>', cls: 'sand', icons: ['⚙️', '📄', '🔑', '✍️', '📍', '📊'],
    items: [['Technical SEO', 'Identify technical issues affecting crawlability, indexing, site structure, and search performance, then prioritize improvements based on their impact.'],
      ['On-Page SEO', 'Improve page titles, meta descriptions, headings, internal links, content structure, and relevant on-page elements.'],
      ['Keyword Research &amp; Search Intent', 'Identify relevant search opportunities and understand what potential customers are looking for before creating or optimizing pages.'],
      ['Content Optimization', 'Improve existing service pages and other relevant content so they communicate value clearly and address useful search topics.'],
      ['Local SEO Support', 'Improve relevant local search signals and business information for businesses targeting customers in specific geographic areas.'],
      ['SEO Audits &amp; Reporting', 'Review the website, identify opportunities, and organize recommendations into a practical action plan.']],
  }) +
  steps({
    eye: 'My SEO Approach', h2: 'Build a stronger foundation <em>before chasing rankings.</em>', cls: 'dark',
    items: [['Audit', "Review the website's existing condition, structure, and visible SEO issues."], ['Research', 'Identify relevant keywords, search intent, and opportunities based on your market.'],
      ['Prioritize', 'Create a roadmap of technical, on-page, and content improvements.'], ['Implement', 'Make the agreed changes or provide clear implementation guidance.'],
      ['Monitor', 'Review available performance data and identify the next opportunities for improvement.']],
  }) +
  story({
    eye: 'SEO That Supports Business Goals', h2: 'Visibility matters when it reaches <em>the right audience.</em>', src: 21, badge: 'Quality over volume',
    ps: ["The aim isn't simply to attract more traffic. It's to help relevant people discover your business and find the information they need.",
      'Depending on your business, success may involve stronger rankings for relevant searches, increased organic visits, more service-page engagement, or additional qualified inquiries.',
      'SEO takes time, and no responsible provider can guarantee specific rankings or timelines.'],
  }) +
  cta("Let's improve your website's search visibility.", 'Start with a conversation about your website, your target audience, and the search opportunities that matter to your business.', btn('Request an SEO Review', 'contact.html')));

const ul = (a) => `<ul class="checks" style="margin:20px 0 26px">${a.map((i) => `<li data-r>${i}</li>`).join('')}</ul>`;
out['paid-advertising.html'] = layout('paid-advertising.html', 'Google Ads & Meta Ads', 'Purposeful Google Ads and Meta Ads campaigns built around your audience, budget and goals.',
  hero({
    eye: 'GOOGLE ADS &amp; META ADS', h1: 'Reach the right audience with a <em>clearer advertising strategy.</em>', bg: 5, short: true,
    ps: ['Paid advertising can help businesses put their offers in front of potential customers. But successful campaigns require more than launching ads.',
      'Audience targeting, campaign structure, messaging, landing pages, tracking, and ongoing optimization all play a role.',
      'I help businesses plan and improve paid advertising campaigns around defined objectives and measurable performance.'],
    ctas: btn('Discuss My Advertising Goals', 'contact.html'),
  }) +
  `<section class="sec sand"><div class="wrap cards c2" style="align-items:start">
    <article class="card" data-r><div class="ic">🔎</div><span class="eyebrow">Google Ads</span><h3>Connect with people actively searching.</h3>
      <p>Google Ads can help your business reach people searching for relevant products and services. My Google Ads support can include:</p>
      ${ul(['Campaign planning and account structure.', 'Keyword research and search intent analysis.', 'Search campaign setup and optimization.', 'Ad copy and messaging improvements.', 'Landing-page alignment.', 'Conversion tracking review.', 'Performance monitoring and reporting.'])}
      <p>The objective is to align your campaigns with relevant searches and make better-informed decisions about budget and performance.</p></article>
    <article class="card" data-r><div class="ic">📱</div><span class="eyebrow">Meta Ads</span><h3>Reach audiences across Facebook and Instagram.</h3>
      <p>Meta Ads can help businesses introduce their services, promote offers, and reconnect with relevant audiences. My Meta Ads support can include:</p>
      ${ul(['Campaign planning and objectives.', 'Audience and targeting strategy.', 'Ad creative direction and messaging.', 'Campaign setup and optimization.', 'Landing-page alignment.', 'Pixel and conversion measurement review.', 'Performance analysis and reporting.'])}
      <p>Campaign structure and creative choices depend on your audience, offer, budget, and business objectives.</p></article>
  </div></section>` +
  cards({
    eye: 'What Makes Campaigns Work?', h2: 'Ads are only <em>one part of the equation.</em>', cls: 'dark', cols: '',
    items: [['The offer', 'Potential customers need a clear reason to consider your business.'], ['The audience', 'Your campaign should reach people who are relevant to the offer.'],
      ['The message', 'Ad copy and creative should communicate the value clearly.'], ['The landing page', 'Visitors need a useful, consistent experience after clicking the ad.'],
      ['The measurement', 'Reliable tracking helps you understand what is working and where improvements may be needed.']],
  }) +
  steps({
    eye: 'A Practical Campaign Process', h2: 'Five steps to <em>purposeful ads.</em>', plain: true,
    items: [['Understand your offer, audience, and goals.'], ['Review existing campaigns or plan the initial setup.'], ['Align ads with relevant landing pages and conversion actions.'], ['Review available tracking and measurement.'], ['Monitor results and optimize based on evidence.']],
  }).replace('</div></section>', '<p style="text-align:center;margin-top:20px;opacity:.7">Advertising performance depends on many variables. Results and return on ad spend are not guaranteed.</p></div></section>') +
  cta('Ready to make your advertising more purposeful?', "Let's discuss your goals, target audience, budget, and what you need your campaigns to achieve.", btn('Discuss Paid Advertising', 'contact.html')));

out['lead-generation.html'] = layout('lead-generation.html', 'Lead Generation & Conversion Optimization', 'Landing pages, lead capture forms, conversion messaging and tracking to turn visitors into customers.',
  hero({
    eye: 'LEAD GENERATION &amp; CONVERSION OPTIMIZATION', h1: 'Turn more of your digital opportunities into <em>meaningful action.</em>', bg: 6, short: true,
    ps: ['Getting visitors to your website is only one part of growing a business. You also need a clear path that helps potential customers understand your offer and take the next step.',
      'I help businesses improve their lead-generation journeys through focused landing pages, clearer messaging, better calls to action, and practical website conversion improvements.'],
    ctas: btn('Improve My Lead Generation', 'contact.html'),
  }) +
  cards({
    eye: 'Lead Generation Services', h2: 'A clearer path from <em>click to inquiry.</em>', cls: 'sand', icons: ['📄', '📝', '💡', '🔗', '📈', '🧭'],
    items: [['Landing Page Development', 'Create focused pages that communicate a specific offer and guide visitors toward a relevant action.'],
      ['Lead Capture Forms', 'Improve inquiry forms by making them clear, relevant, and easy to complete.'],
      ['Conversion-Focused Messaging', 'Clarify service descriptions, headlines, value propositions, and calls to action.'],
      ['Marketing Funnel Alignment', 'Connect ads, landing pages, and follow-up actions into a more consistent customer journey.'],
      ['Conversion Tracking', 'Review whether important actions, such as form submissions or calls, are being measured correctly.'],
      ['Website Conversion Optimization', 'Identify usability issues and opportunities to improve the path from website visit to inquiry.']],
  }) +
  checks({
    eye: 'Understand Where Leads Are Lost', h2: 'Small points of friction create <em>unnecessary barriers.</em>', cls: 'dark', x: true,
    intro: 'Potential customers may leave when:',
    items: ["Your offer isn't clear.", "Your website doesn't establish enough trust.", "Your landing page doesn't match the advertisement.", 'Your contact form asks for too much information.', 'Your calls to action are difficult to find.', 'Your website experience is frustrating on mobile.', 'You cannot reliably measure important conversions.'],
    after: 'I help identify relevant issues and prioritize practical improvements based on the available evidence.',
  }) +
  steps({
    eye: 'My Optimization Process', h2: 'Review, improve, <em>measure, repeat.</em>',
    items: [['Review', 'Understand the current website, traffic sources, and conversion goals.'], ['Identify', 'Review page structure, messaging, forms, user journeys, and available analytics.'],
      ['Prioritize', 'Focus on improvements that are practical and relevant to your goals.'], ['Implement', 'Make agreed changes to landing pages, calls to action, forms, and other conversion elements.'],
      ['Measure', 'Use available data to evaluate performance and determine what to test or improve next.']],
  }) +
  story({
    eye: 'Who Can Benefit?', h2: 'Built for businesses that <em>need results.</em>', src: 22, cls: 'sand', rev: true,
    ps: ['These services can support service businesses, consultants, professional firms, ecommerce businesses, and companies using paid advertising to attract customers.',
      'The right solution depends on your audience, sales process, offer, and current conversion challenges.'],
  }) +
  cta("Let's create a clearer path from visitor to customer.", 'Tell me how your business currently attracts leads and where you\'d like to improve.', btn('Discuss Lead Generation', 'contact.html')));

const cs = [['The Challenge', 'What did the client need to improve, build, or solve?'], ['The Objective', 'What was the agreed goal of the project?'],
  ['The Approach', 'What decisions, tools, design choices, or marketing activities did you use?'], ['The Solution', 'What did you deliver, and how did it address the challenge?'],
  ['The Outcome', 'What changed as a result? Include documented performance data or client feedback where available.']];
out['portfolio.html'] = layout('portfolio.html', 'Portfolio', 'Live websites built and delivered for businesses across interiors, home services, tech and creative studios.',
  hero({
    eye: 'SELECTED WORK', h1: 'Real projects. Thoughtful solutions. <em>Practical execution.</em>', bg: 7, short: true,
    ps: ['Explore selected website design and digital projects that demonstrate my approach to design, development, and online business growth.',
      'Each project starts with its own requirements and challenges. My focus is on understanding those needs and building a solution that fits the business.'],
  }) +
  `<section class="sec sand"><div class="wrap"><div class="head"><span class="eyebrow">Project Portfolio</span><h2 data-split>Website Design &amp; <em>Development</em></h2>
    <p class="lead" data-r>Websites built and delivered across interiors, home services, tech and creative studios. Each card opens the live website.</p></div>
    <div class="grid-proj dark" style="background:none">${projects.map((p) => `<div data-r>${projCard({ ...p, img: p.img2 })}</div>`).join('')}</div></div></section>` +
  cta('Have a challenge you\'d like to solve?', "Whether you need a new website or want to improve an existing digital marketing setup, let's discuss your project.", btn('Start a Conversation', 'contact.html')));


const WA_MSG = 'https://wa.me/923051925258?text=Hi%20Ijaz%2C%20I%20found%20your%20white%20label%20services%20and%20I%27m%20interested%20in%20partnering.';
const capCards = (items) => `<div class="cards">${items.map((it) => `
  <article class="card" data-r><div class="ic">${it[0]}</div><h3>${it[1]}</h3><p>${it[2]}</p><div class="mini">${it[3].map((t) => `<span>${t}</span>`).join('')}</div></article>`).join('')}</div>`;
const whyCards = (items) => `<div class="cards">${items.map((it) => `
  <article class="card" data-r><div class="ic">${it[0]}</div><h3>${it[1]}</h3><p>${it[2]}</p></article>`).join('')}</div>`;
const sec = (eye, h2, intro, inner, cls = '') => `<section class="sec ${cls}"><div class="wrap"><div class="head"><span class="eyebrow">${eye}</span><h2 data-split>${h2}</h2>${intro ? `<p class="lead" data-r>${intro}</p>` : ''}</div>${inner}</div></section>`;

out['wix-white-label.html'] = layout('wix-white-label.html', 'Wix White Label Services', 'White label Wix and Wix Studio website design and SEO for agencies and freelancers. Your agency, your credit, my craft.',
  hero({
    eye: 'WHITE LABEL WEB SERVICES', h1: 'Agency-grade websites, <em>delivered in your name.</em>', bg: 41, short: true,
    ps: ["I'm Ijaz, a solo web design specialist powering agencies behind the scenes. You win the clients. I build the work.", 'Your brand. Your credit. My craft.'],
    ctas: btn('Partner With Me', 'contact.html') + btn('See Live Projects', 'portfolio.html', 'btn-g'),
    tags: ['Wix Design', 'Wix Studio', 'SEO Services', 'White Label', 'Agency Partnership'],
  }) +
  `<section class="sec sand"><div class="wrap"><div class="stats s4">
    <div class="stat" data-r><b data-count="500" data-suf="+">500+</b><span>Sites delivered</span></div>
    <div class="stat" data-r><b data-count="5">5</b><span>Years of agency work, since 2021</span></div>
    <div class="stat" data-r><b data-count="100" data-suf="%">100%</b><span>White label</span></div>
    <div class="stat" data-r><b>Solo</b><span>Direct. No middlemen.</span></div></div></div></section>` +
  story({
    eye: 'The Model', h2: 'Built for agencies. <em>Invisible to your clients.</em>', src: 43, badge: 'You bring the business. I deliver the websites.',
    ps: ["I operate as a silent partner for web agencies of all sizes, from boutique studios to growing multi-client firms. You bring the business, I deliver the websites. Your clients never know I exist.",
      "Every deliverable goes out under your agency's name and branding. Your reputation grows, your margins stay healthy, and your capacity scales without hiring.",
      "With deep expertise in Wix, Wix Studio, and technical SEO, I cover everything from concept to live site, including revisions, mobile optimization, and search engine setup."],
  }) +
  sec('Why It Works', 'A solo partner, <em>your brand always.</em>', '', `<div class="cards c2">
    <article class="card" data-r><div class="ic">👤</div><h3>Solo operator</h3><p>No agency overhead. No project manager lag. You communicate directly with the person doing the actual work, which means faster turnarounds, cleaner communication, and no telephone-game errors.</p></article>
    <article class="card" data-r><div class="ic">🏷</div><h3>Your brand, always</h3><p>All deliverables are brandless by design. Files, invoices, communications, and live sites carry zero trace of my involvement. You keep full ownership of the client relationship and all project assets.</p></article></div>`, 'dark') +
  sec('Capabilities', 'What I <em>deliver.</em>', 'Everything your agency needs to offer premium web services, without expanding your team.', capCards([
    ['🏢', 'Wix Website Design', "Full-build Wix websites tailored to your client's brand and goals. Responsive, polished, and built to convert, from landing pages to multi-page business sites.", ['Responsive', 'Custom layouts', 'CMS setup', 'Mobile-first']],
    ['✨', 'Wix Studio Design', 'Advanced, pixel-perfect builds using Wix Studio for clients demanding elevated design fidelity, complex animations, and developer-grade control.', ['Advanced layouts', 'Animations', 'Breakpoints', 'Design systems']],
    ['🔎', 'SEO Services', 'On-page SEO, technical optimization, keyword research, and metadata setup. Deliver measurable search visibility improvements your clients will notice.', ['On-page SEO', 'Technical SEO', 'Keywords', 'Meta optimization']],
    ['🔄', 'Redesigns & Revamps', 'Migrate and modernize existing client websites onto Wix or Wix Studio. Preserve their brand equity while dramatically improving design quality and performance.', ['Migration', 'Rebrand', 'UX upgrade']],
    ['📄', 'Landing Pages', 'High-converting single-page builds for campaigns, product launches, and lead generation. Fast turnaround, built to spec, optimized for conversions.', ['Conversion', 'Fast delivery', 'A/B ready']],
    ['🔁', 'Agency Retainer', 'Ongoing white-label capacity for agencies with consistent project flow. Priority queue, stable rates, and a partner who understands your workflow and standards.', ['Priority', 'Consistent rates', 'Overflow ready']],
  ]), 'sand') +
  steps({
    eye: 'How It Works', h2: 'A clean workflow that fits <em>inside yours.</em>',
    items: [['Brief & Scope', 'You send me the client brief, design references, and your agency scope. I ask the right questions and confirm requirements before starting.'],
      ['Quote & Timeline', 'I provide a competitive white-label quote for your internal reference, with a realistic delivery timeline you can confidently present to your client.'],
      ['Design & Build', 'I design, build, and QA the full website. Regular progress check-ins so you are never in the dark on status. All feedback goes through you.'],
      ['Review Rounds', 'You review the build and relay client feedback. I implement revisions efficiently and professionally until your client signs off.'],
      ['Handoff', 'The completed project is handed off to you clean and client-ready, with zero mention of third-party involvement. Your agency takes all the credit.']],
  }) +
  sec('The Advantage', 'Why agencies <em>choose me.</em>', '', whyCards([
    ['⚡', 'Competitive rates', "Priced for agency margins. Whether you're a solo freelancer or a 20-person studio, my rates leave you room to profit on every project."],
    ['🔒', 'Total confidentiality', 'I never contact your clients, never claim credit publicly, and never reference your projects without explicit permission. Your clients stay 100% yours.'],
    ['💬', 'Direct communication', "You're always talking directly to the builder. No account managers, no project coordinators. Fast decisions, fast responses, fast results."],
    ['📈', 'Scale without hiring', 'Take on more web projects than your team can handle, without the overhead of hiring. Expand your service offering with zero infrastructure cost.'],
    ['🏆', 'Proven quality', 'Real delivered websites across diverse industries: interiors, home services, design studios, and more. Work that holds up under real client scrutiny.'],
    ['🔁', 'Long-term partnership', 'Most of my agency partners work with me across multiple projects. Consistency in quality, process, and rates is the foundation of a reliable partnership.'],
  ]), 'dark') +
  `<section class="sec sand"><div class="wrap head" style="margin-bottom:0"><span class="eyebrow">Recent Work</span><h2 data-split>Live projects, <em>white label.</em></h2>
    <p class="lead" data-r>Websites built and delivered across interiors, home services, design studios and tech, each one a white-label product presented under the client's brand.</p>
    <div class="note" data-r>These are my older projects. Please <a href="contact.html" style="text-decoration:underline;font-weight:700">contact me</a> for links to my newer work.</div>
    <div class="row" data-r><a class="btn btn-p" href="portfolio.html">See the live projects</a><a class="btn btn-g" href="${WA_MSG}" target="_blank" rel="noopener">Ask for new work links</a></div></div></section>` +
  checks({
    eye: 'Pricing Philosophy', h2: 'Rates built for <em>agency margins.</em>',
    intro: "I don't charge agency rates, I charge partner rates. Whether you're handling a single overflow project or building a reliable outsource channel, my pricing keeps your margins healthy and your clients happy.",
    items: ['No hidden costs', 'Per-project or retainer options', 'Custom quotes for every scope', 'Small agency friendly', 'Enterprise volume accommodated', 'Revisions included'],
  }) +
  cta("Ready to partner? Let's build.", 'Partner with me and offer premium Wix design and SEO to your clients, without expanding your team. Let\'s talk scope, rates, and how to make this work for your agency.',
    `<a class="btn btn-p" href="mailto:${EMAIL}?subject=White%20Label%20Partnership%20Enquiry">Send Project Brief</a>`, `<a class="btn btn-g" href="${WA_MSG}" target="_blank" rel="noopener">WhatsApp Me</a>`));

const fld = (n, l, t = 'text', req = '', full = '') => `<div class="fld ${full}"><input id="${n}" name="${n}" type="${t}" placeholder=" " ${req}><label for="${n}">${l}</label><small>Please check this field.</small></div>`;
out['contact.html'] = layout('contact.html', 'Contact', 'Tell me about your project — website design, SEO, Google Ads, Meta Ads and lead generation.',
  hero({
    eye: "LET'S TALK", h1: 'Tell me what you\'re <em>working on.</em>', bg: 8, short: true,
    ps: ["Have a website project, a marketing challenge, or an idea you'd like to explore?", "Message me a few details about your business and goals. I'll review them and we can discuss the most suitable next steps."],
  }) +
  `<section class="sec"><div class="wrap"><div class="head"><span class="eyebrow">Get in touch</span><h2 data-split>Prefer to <em>talk directly?</em></h2>
    <p class="lead" data-r>Send me a brief overview of your requirements by email or WhatsApp and I'll review it and get back to you with the most suitable next steps.</p></div>
    <div class="contact-cards">
      <a class="ln" data-r href="mailto:${EMAIL}"><span class="ci">✉️</span><small>Email</small><b>${EMAIL}</b><i>Write to me →</i></a>
      <a class="ln" data-r href="${WA}" target="_blank" rel="noopener"><span class="ci">💬</span><small>WhatsApp</small><b>${WA_TXT}</b><i>Start a chat →</i></a>
      <a class="ln" data-r href="${LINKEDIN}" target="_blank" rel="noopener"><span class="ci">🔗</span><small>LinkedIn</small><b>Ijaz Akram</b><i>Connect →</i></a>
      <a class="ln" data-r href="https://ijazwebfolio.com"><span class="ci">🌐</span><small>Website</small><b>ijazwebfolio.com</b><i>Visit →</i></a>
    </div></div></section>` +
  steps({
    eye: 'What Happens Next?', h2: 'Three simple <em>next steps.</em>', cls: 'dark',
    items: [['I review your inquiry', "I'll look at your requirements and understand what you're hoping to achieve."], ['We discuss your goals', "If the project is a good fit, we'll clarify priorities, scope, and expectations."],
      ['We define the next steps', "We'll discuss the recommended approach, deliverables, timing, and pricing before any work begins."]],
  }) +
  cta("Let's build something that moves your business forward.", 'I look forward to learning more about your project and exploring how I can help.', btn('Back to Home', 'index.html')));

for (const [f, html] of Object.entries(out)) writeFileSync(f, html);
console.log('Built', Object.keys(out).length, 'pages');
