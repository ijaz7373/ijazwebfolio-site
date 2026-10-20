// Static page generator: `node build.mjs` writes all .html files next to this script.
import { writeFileSync } from 'node:fs';

const EMAIL = 'hello@ijazwebfolio.com'; // TODO: replace with your preferred business email
const LINKEDIN = 'https://www.linkedin.com/in/ijaz-akram-244150263/';
const img = (n, w = 1400) => `assets/img/p${String(n).padStart(2, '0')}.webp`;

const pages = [
  ['index.html', 'Home'], ['about.html', 'About'], ['website-design.html', 'Website Design'],
  ['seo.html', 'SEO'], ['paid-advertising.html', 'Paid Advertising'],
  ['lead-generation.html', 'Lead Generation'], ['portfolio.html', 'Portfolio'], ['contact.html', 'Contact'],
];

const nav = (cur) => `
<header class="nav"><div class="pill">
  <a class="logo" href="index.html" aria-label="Ijaz Web Folio home">ijaz<span>.</span>webfolio</a>
  <button class="mbtn" aria-expanded="false" aria-controls="ovl">Menu <i></i></button>
</div></header>
<div class="ovl" id="ovl"><div class="wrap ovl-in">
  <ul>${pages.map(([h, t], i) => `<li style="--i:${i}"><a href="${h}" class="${h === cur ? 'on' : ''}"><small>0${i + 1}</small>${t}</a></li>`).join('')}</ul>
  <div class="ovl-side"><h4>Services</h4><a href="website-design.html">Website Design &amp; Development</a><a href="seo.html">Search Engine Optimization</a><a href="paid-advertising.html">Google &amp; Meta Ads</a><a href="lead-generation.html">Lead Generation</a>
    <a class="btn btn-p" href="contact.html">Start a Project</a>
    <h4>Connect</h4><a href="mailto:${EMAIL}">${EMAIL}</a><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></div>
</div></div>`;

const footer = `
<footer><div class="wrap">
  <div class="fgrid">
    <div><div class="big">Let's build something that moves you <em>forward.</em></div></div>
    <div><h4>Explore</h4><ul>${pages.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Connect</h4><ul>
      <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
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

const layout = (file, title, desc, rawBody) => { let body = decorate(rawBody, file); if (zoomFor[file]) body = body.replace('</section>', '</section>' + zoom(zoomFor[file]) + (stageFor[file] ? stage(stageFor[file]) : '')); return `<!doctype html>
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

const projCard = (i, src) => `
<article class="proj" data-cursor="View"><div class="pic"><img src="${img(src, 900)}" alt="" loading="lazy" decoding="async" width="900" height="675"><span>PLATFORM</span></div>
  <div class="txt"><h3>Project Name 0${i}</h3><small>Industry · Services delivered</small>
  <p style="opacity:.75">A brief project overview goes here.</p><a class="more" href="portfolio.html">View Project</a></div></article>`;

const deck = ({ items, icons }) => `
<section class="sec sand deck"><div class="wrap"><div class="head"><span class="eyebrow">Services</span><h2 data-split>Everything your business needs to <em>grow online.</em></h2></div>
<div class="deck-list">${items.map((it, i) => `<article class="deck-card" style="--i:${i}"><div><span class="n">0${i + 1} / 0${items.length}</span><h3>${it[0]}</h3><p>${it[1]}</p><a class="more" href="${it[3]}">${it[2]}</a></div><div class="dv">${icons[i]}</div></article>`).join('')}</div></div></section>`;

const gal = () => `
<section class="sec gal"><div class="wrap head"><span class="eyebrow">Design with purpose</span><h2 data-split>Every decision makes the <em>next step clear.</em></h2>
<p class="lead" data-r style="margin-inline:auto">Every website decision should support usability, communicate your value, and make the next step clear to visitors.</p></div>
<div class="gal-row" data-dir="-1">${[1, 6, 7, 8, 9, 3, 1, 6].map((n) => `<img src="${img(n, 700)}" alt="" loading="lazy" decoding="async" width="700" height="467">`).join('')}</div>
<div class="gal-row" data-dir="1">${[2, 4, 5, 10, 11, 13, 2, 4].map((n) => `<img src="${img(n, 700)}" alt="" loading="lazy" decoding="async" width="700" height="467">`).join('')}</div></section>`;

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
const zoomHome = { word: 'GROW', idx: 2, kicker: 'One connected strategy', h: 'Your website is just the beginning.', p: 'Your website and marketing should support each other. I help connect the pieces so your digital efforts work toward shared objectives.', src: 5, scale: 24 };
const zoomFor = {
  'about.html': { word: 'HELLO', idx: 4, kicker: 'A little about me', h: 'Good digital work starts with understanding the business.', p: 'Every business has different goals, customers, and challenges.', src: 3, scale: 24 },
  'website-design.html': { word: 'BUILD', idx: 4, kicker: 'Website design & development', h: 'Design with purpose.', p: 'Every website decision should support usability, communicate your value, and make the next step clear to visitors.', src: 6, scale: 30 },
  'seo.html': { word: 'FOUND', idx: 1, kicker: 'Search engine optimization', h: 'Build a stronger foundation before chasing rankings.', p: 'SEO is a long-term process, and results depend on factors such as competition, website condition, content quality, and search demand.', src: 10, scale: 24 },
  'paid-advertising.html': { word: 'ADS', idx: 1, kicker: 'Google Ads & Meta Ads', h: 'Ads are only one part of the equation.', p: 'The offer, the audience, the message, the landing page and the measurement all play a role.', src: 4, scale: 30 },
  'lead-generation.html': { word: 'CONVERT', idx: 1, kicker: 'Lead generation & conversion', h: 'A clearer path from visitor to customer.', p: 'Small points of friction can create unnecessary barriers. Let\'s find and remove them.', src: 5, scale: 24 },
  'portfolio.html': { word: 'WORK', idx: 1, kicker: 'Selected work', h: 'Ideas turned into digital experiences.', p: 'Each project reflects a unique combination of business requirements, design decisions, user experience, and technical implementation.', src: 7, scale: 24 },
};

const stage = ({ eye = 'One connected strategy', h = 'Every piece, <em>working together.</em>', p = 'Your website and marketing should support each other. I help connect the pieces so your digital efforts work toward shared objectives.', labels = ['Design', 'Visibility', 'Conversion'], shapes = ['ring', 'sphere', 'knot'] } = {}) => `
<section class="stage" data-shapes="${shapes.join(',')}"><div class="stage-pin"><canvas class="stage-cv" aria-hidden="true"></canvas>
  <div class="stage-copy"><span class="eyebrow">${eye}</span><h2 data-split>${h}</h2>
  <p class="lead">${p}</p></div>
  <div class="stage-labs">${labels.map((l, i) => `<span class="stage-lab${i ? '' : ' on'}">${l}</span>`).join('')}</div></div></section>`;
const stageFor = {
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

const ico = ['🌐', '🔎', '📣', '🎯', '⚡', '💬'];

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
    <div class="pin-vis"><div class="card-v"><img src="${img(6)}" alt="" loading="lazy" width="520" height="520"></div><div class="card-v"><img src="${img(2)}" alt="" loading="lazy" width="520" height="520"></div><div class="card-v"><img src="${img(5)}" alt="" loading="lazy" width="520" height="520"></div></div>
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
      <div class="stat" data-r><b data-count="6">6</b><span>Connected digital services</span></div>
      <div class="stat" data-r><b data-count="1">1</b><span>Strategy tying it all together</span></div></div>
  </div></section>` +
  `<section class="sec dark" style="padding-top:0"><div class="wrap head"><span class="eyebrow">Selected Work</span><h2 data-split>Ideas turned into <em>digital experiences.</em></h2>
    <p class="lead" data-r>Explore selected website projects and digital solutions created for businesses across different industries.</p>
    <p class="lead" data-r>Each project reflects a unique combination of business requirements, design decisions, user experience, and technical implementation.</p></div>
    <div class="hs"><div class="hs-track">${[4, 7, 8, 2, 5, 11].map((s, i) => projCard(i + 1, s)).join('')}</div></div>
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
    eye: 'A LITTLE ABOUT ME', h1: 'Your digital partner for <em>what\'s next.</em>', bg: 3, short: true,
    ps: ["I'm Ijaz, an independent website designer and digital growth specialist helping businesses improve how they present, promote, and grow their brands online.",
      'With 4+ years of experience in website design and development, I understand the work that goes into building a strong digital presence — from the first design decision to the technical details behind a functional website.',
      'My focus extends beyond development. I also work across SEO, paid advertising, lead generation, and website conversion optimization to help businesses connect their websites with their broader marketing goals.'],
    ctas: btn('Work With Me', 'contact.html'),
  }) +
  story({
    eye: 'My Approach', h2: 'Good digital work starts with <em>understanding the business.</em>', src: 6, badge: 'Problem first. Tools second.',
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
    eye: 'How I Work', h2: 'Direct collaboration. <em>Clear expectations.</em>', src: 3, rev: true, cls: 'sand',
    ps: ['As an independent professional, I work directly with clients to understand their needs, discuss recommendations, and deliver agreed project work.',
      'You can expect clear communication, a defined scope, practical guidance, and a focus on the details that matter to your business.',
      'I value long-term working relationships built on trust, transparency, and consistent delivery.'],
  }) +
  play() +
  cta("Have an idea, a challenge, or a project in mind?", "I'd love to hear what you're working on and explore whether I can help.", btn('Get in Touch', 'contact.html')));

out['website-design.html'] = layout('website-design.html', 'Website Design & Development', 'Responsive, user-friendly websites on Wix Studio, WordPress, Shopify and more — built for your business.',
  hero({
    eye: 'WEBSITE DESIGN &amp; DEVELOPMENT', h1: 'Websites built for your business, <em>not just your brand.</em>', bg: 6, short: true,
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
    eye: 'SEARCH ENGINE OPTIMIZATION', h1: 'Get found by the people looking for <em>what you offer.</em>', bg: 10, short: true,
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
    eye: 'SEO That Supports Business Goals', h2: 'Visibility matters when it reaches <em>the right audience.</em>', src: 2, badge: 'Quality over volume',
    ps: ["The aim isn't simply to attract more traffic. It's to help relevant people discover your business and find the information they need.",
      'Depending on your business, success may involve stronger rankings for relevant searches, increased organic visits, more service-page engagement, or additional qualified inquiries.',
      'SEO takes time, and no responsible provider can guarantee specific rankings or timelines.'],
  }) +
  cta("Let's improve your website's search visibility.", 'Start with a conversation about your website, your target audience, and the search opportunities that matter to your business.', btn('Request an SEO Review', 'contact.html')));

const ul = (a) => `<ul class="checks" style="margin:20px 0 26px">${a.map((i) => `<li data-r>${i}</li>`).join('')}</ul>`;
out['paid-advertising.html'] = layout('paid-advertising.html', 'Google Ads & Meta Ads', 'Purposeful Google Ads and Meta Ads campaigns built around your audience, budget and goals.',
  hero({
    eye: 'GOOGLE ADS &amp; META ADS', h1: 'Reach the right audience with a <em>clearer advertising strategy.</em>', bg: 4, short: true,
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
    eye: 'LEAD GENERATION &amp; CONVERSION OPTIMIZATION', h1: 'Turn more of your digital opportunities into <em>meaningful action.</em>', bg: 5, short: true,
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
    eye: 'Who Can Benefit?', h2: 'Built for businesses that <em>need results.</em>', src: 11, cls: 'sand', rev: true,
    ps: ['These services can support service businesses, consultants, professional firms, ecommerce businesses, and companies using paid advertising to attract customers.',
      'The right solution depends on your audience, sales process, offer, and current conversion challenges.'],
  }) +
  cta("Let's create a clearer path from visitor to customer.", 'Tell me how your business currently attracts leads and where you\'d like to improve.', btn('Discuss Lead Generation', 'contact.html')));

const cs = [['The Challenge', 'What did the client need to improve, build, or solve?'], ['The Objective', 'What was the agreed goal of the project?'],
  ['The Approach', 'What decisions, tools, design choices, or marketing activities did you use?'], ['The Solution', 'What did you deliver, and how did it address the challenge?'],
  ['The Outcome', 'What changed as a result? Include documented performance data or client feedback where available.']];
out['portfolio.html'] = layout('portfolio.html', 'Portfolio & Case Studies', 'Selected website design and digital marketing projects with the thinking behind the work.',
  hero({
    eye: 'SELECTED WORK', h1: 'Real projects. Thoughtful solutions. <em>Practical execution.</em>', bg: 7, short: true,
    ps: ['Explore selected website design and digital projects that demonstrate my approach to design, development, and online business growth.',
      'Each project starts with its own requirements and challenges. My focus is on understanding those needs and building a solution that fits the business.'],
  }) +
  `<section class="sec sand"><div class="wrap"><div class="head"><span class="eyebrow">Project Portfolio</span><h2 data-split>Website Design &amp; <em>Development</em></h2>
    <p class="lead" data-r>Selected projects across Wix Studio, WordPress, Shopify, and other platforms. Each card shows the project name, industry, platform, services delivered, an overview, and a link to the live website where available.</p></div>
    <div class="grid-proj dark" style="background:none">${[4, 7, 8, 2, 5, 11].map((s, i) => `<div data-r>${projCard(i + 1, s)}</div>`).join('')}</div></div></section>` +
  ring() +
  `<section class="sec dark"><div class="wrap"><div class="head"><span class="eyebrow">Case Studies</span><h2 data-split>More than a <em>finished design.</em></h2>
    <p class="lead" data-r>A case study should explain the thinking behind the work, not just display a screenshot.</p></div>
    <div class="tabs" data-r><div class="tablist" role="tablist">${cs.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === 0}">${c[0]}</button>`).join('')}</div>
    <div>${cs.map((c, i) => `<div class="panel" role="tabpanel" ${i ? 'hidden' : ''}><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div></div></div></section>` +
  checks({
    eye: 'Digital Marketing Projects', h2: 'Evidence of <em>real impact.</em>',
    intro: 'Where suitable examples exist, SEO, advertising, and lead-generation work is showcased separately from website projects. Useful evidence may include:',
    items: ['Organic search performance before and after implementation.', 'Relevant search visibility improvements.', 'Advertising performance and conversion data.', 'Qualified leads generated over a defined period.', 'Landing-page conversion changes.', 'Technical issues resolved.', 'Campaign insights and lessons learned.'],
    note: 'Figures are always shared with context, and only information I have permission to disclose.',
  }) +
  cta('Have a challenge you\'d like to solve?', "Whether you need a new website or want to improve an existing digital marketing setup, let's discuss your project.", btn('Start a Conversation', 'contact.html')));

const fld = (n, l, t = 'text', req = '', full = '') => `<div class="fld ${full}"><input id="${n}" name="${n}" type="${t}" placeholder=" " ${req}><label for="${n}">${l}</label><small>Please check this field.</small></div>`;
out['contact.html'] = layout('contact.html', 'Contact', 'Tell me about your project — website design, SEO, Google Ads, Meta Ads and lead generation.',
  hero({
    eye: "LET'S TALK", h1: 'Tell me what you\'re <em>working on.</em>', bg: 11, short: true,
    ps: ["Have a website project, a marketing challenge, or an idea you'd like to explore?", "Share a few details about your business and goals. I'll review your inquiry and we can discuss the most suitable next steps."],
  }) +
  `<section class="sec"><div class="wrap contact">
    <form class="f" novalidate data-r><h2>Let's discuss your project.</h2>
      ${fld('name', 'Full Name', 'text', 'required')}${fld('business', 'Business Name')}${fld('email', 'Work Email', 'email', 'required')}${fld('url', 'Website URL (optional)', 'url')}
      <div class="fld full"><select id="service" name="service" required><option value="">&nbsp;</option>${['Website Design or Redesign', 'Shopify Store Design or Redesign', 'SEO', 'Google Ads', 'Meta Ads', 'Lead Generation', 'Website Conversion Optimization', 'Social Media Marketing', 'Other'].map((o) => `<option>${o}</option>`).join('')}</select><label for="service">What service are you interested in?</label><small>Please choose a service.</small></div>
      ${fld('budget', 'Estimated Budget (optional)')}${fld('timeline', 'Project Timeline (optional)')}
      <div class="fld full"><textarea id="msg" name="message" placeholder=" " required></textarea><label for="msg">Tell me about your project</label><small>Please tell me a little about your project.</small></div>
      <button class="btn btn-p" type="submit">Send Project Inquiry</button>
      <div class="ok" role="status">Thanks for reaching out. Your inquiry has been submitted, and I'll review the details to determine the next steps.</div></form>
    <aside class="side" data-r><h2 style="font-size:2rem">Prefer email?</h2><p>You can also contact me directly with a brief overview of your requirements.</p>
      <a class="ln" href="mailto:${EMAIL}"><small>Email</small><b>${EMAIL}</b></a>
      <a class="ln" href="https://ijazwebfolio.com"><small>Website</small><b>ijazwebfolio.com</b></a>
      <a class="ln" href="${LINKEDIN}" target="_blank" rel="noopener"><small>LinkedIn</small><b>Ijaz Akram</b></a></aside>
  </div></section>` +
  steps({
    eye: 'What Happens Next?', h2: 'Three simple <em>next steps.</em>', cls: 'dark',
    items: [['I review your inquiry', "I'll look at your requirements and understand what you're hoping to achieve."], ['We discuss your goals', "If the project is a good fit, we'll clarify priorities, scope, and expectations."],
      ['We define the next steps', "We'll discuss the recommended approach, deliverables, timing, and pricing before any work begins."]],
  }) +
  cta("Let's build something that moves your business forward.", 'I look forward to learning more about your project and exploring how I can help.', btn('Back to Home', 'index.html')));

for (const [f, html] of Object.entries(out)) writeFileSync(f, html);
console.log('Built', Object.keys(out).length, 'pages');
