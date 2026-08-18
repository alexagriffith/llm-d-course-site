// Shared logic for the home page and chapter pages. One source of truth.

// --- theme toggle ---
(function initTheme() {
  const root = document.documentElement;
  const tbtn = document.getElementById('theme-toggle');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    if (tbtn) tbtn.textContent = t === 'dark' ? 'Light' : 'Dark';
    try { localStorage.setItem('dt-theme', t); } catch (e) {}
  }
  const start = (() => { try { return localStorage.getItem('dt-theme') || 'light'; } catch (e) { return 'light'; } })();
  setTheme(start);
  if (tbtn) tbtn.addEventListener('click', () =>
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
})();

// --- scroll reveal (shared spring easing lives in CSS) ---
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.12 });

function observeReveals(rootEl = document) {
  rootEl.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));
}

// --- data + video source resolution ---
async function loadData() {
  let res = await fetch('chapters.local.json', { cache: 'no-store' });
  if (!res.ok) res = await fetch('chapters.json', { cache: 'no-store' });
  return res.json();
}

function makeSrcResolver(data) {
  const base = (data.videoBase || '').replace(/\/+$/, '');
  const isUrl = (s) => /^https?:\/\//i.test(s);
  return {
    hasBase: base.length > 0 || false,
    isUrl,
    src: (s) => isUrl(s) ? s : (base ? base + '/' + s : s),
    playable: (s) => base.length > 0 || isUrl(s),
  };
}

// --- a single video figure: graph-paper panel + serif caption ---
function figureEl(item, resolver) {
  const figure = document.createElement('article');
  figure.className = 'figure reveal';
  figure.id = item.id;

  const panel = document.createElement('div');
  panel.className = 'panel';

  if (resolver.playable(item.src)) {
    const v = document.createElement('video');
    v.controls = true; v.preload = 'none'; v.playsInline = true;
    v.src = resolver.src(item.src);
    // Poster: a frame grabbed a few seconds in, so each tile shows a real image
    // without downloading the whole clip. Path mirrors src under assets/posters/.
    v.poster = item.poster || ('assets/posters/' + item.src.replace(/\.[^.]+$/, '.jpg'));
    panel.appendChild(v);
  } else {
    const m = document.createElement('div');
    m.className = 'missing';
    m.textContent = 'Set videoBase to play';
    panel.appendChild(m);
  }
  figure.appendChild(panel);

  const cap = document.createElement('div');
  cap.className = 'caption';
  cap.textContent = item.title;
  figure.appendChild(cap);

  return figure;
}

// --- a walkthrough part: label · serif title · lead · embedded video ---
function walkPartEl(item, resolver, index) {
  const part = document.createElement('article');
  part.className = 'walk-part reveal';
  part.id = item.id;

  const head = document.createElement('div');
  head.className = 'walk-head';

  if (item.label) {
    const label = document.createElement('div');
    label.className = 'walk-label';
    label.textContent = item.label;
    head.appendChild(label);
  }

  const t = document.createElement('h2');
  t.className = 'walk-title';
  t.textContent = item.title;
  head.appendChild(t);

  if (item.lead) {
    const lead = document.createElement('p');
    lead.className = 'walk-lead';
    lead.textContent = item.lead;
    head.appendChild(lead);
  }
  part.appendChild(head);

  const panel = document.createElement('div');
  panel.className = 'panel';
  if (resolver.playable(item.src)) {
    const v = document.createElement('video');
    v.controls = true; v.preload = 'none'; v.playsInline = true;
    v.src = resolver.src(item.src);
    v.poster = item.poster || ('assets/posters/' + item.src.replace(/\.[^.]+$/, '.jpg'));
    panel.appendChild(v);
  } else {
    const m = document.createElement('div');
    m.className = 'missing';
    m.textContent = 'Set videoBase to play';
    panel.appendChild(m);
  }
  part.appendChild(panel);

  return part;
}

// Render a chapter as an ordered, embedded walkthrough.
function walkthroughEl(chapter, resolver) {
  const wrap = document.createElement('div');
  wrap.className = 'walkthrough';
  chapter.items.forEach((item, i) => wrap.appendChild(walkPartEl(item, resolver, i)));
  return wrap;
}

// A small isometric-cube glyph in the "mix" accent, tying sections to the
// design system's diagram language.
function isoGlyphSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'glyph');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML =
    '<path d="M12 2 22 8v8L12 22 2 16V8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M12 2v8m0 0 10-2M12 10 2 8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>';
  return svg;
}

// --- an inline section: number + title, optional blurb, grid of video figures ---
function sectionEl(section, resolver, num) {
  const sec = document.createElement('section');
  sec.className = 'section';
  sec.id = section.id;

  if (section.title) {
    if (num != null) {
      const eyebrow = document.createElement('div');
      eyebrow.className = 'section-num';
      eyebrow.appendChild(isoGlyphSVG());
      const label = document.createElement('span');
      label.textContent = 'Section ' + String(num).padStart(2, '0');
      eyebrow.appendChild(label);
      sec.appendChild(eyebrow);
    }
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    sec.appendChild(h2);
  }

  if (section.blurb) {
    const b = document.createElement('p');
    b.className = 'blurb';
    b.textContent = section.blurb;
    sec.appendChild(b);
  }

  const grid = document.createElement('div');
  grid.className = 'grid';
  section.items.forEach((item) => grid.appendChild(figureEl(item, resolver)));
  sec.appendChild(grid);
  return sec;
}
