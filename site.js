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

  // The part number (e.g. "1.1") reads as a quiet prefix inside the title rather
  // than a separate eyebrow, to keep the header uncluttered.
  const t = document.createElement('h2');
  t.className = 'walk-title';
  if (item.label) {
    const num = document.createElement('span');
    num.className = 'walk-num';
    num.textContent = item.label;
    t.appendChild(num);
    t.appendChild(document.createTextNode(' ' + item.title));
  } else {
    t.textContent = item.title;
  }
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

// A connective line between parts: "what you just saw → what's next".
// Reads item.bridge; renders nothing when absent so it never leaves a ghost line.
function bridgeEl(text) {
  const b = document.createElement('p');
  b.className = 'walk-bridge reveal';
  b.textContent = text;
  return b;
}

// A meta sub-section header inside a chapter: serif title + optional blurb.
// Groups consecutive parts under a named idea (e.g. "Intro", "The problem it
// solves", "Building blocks") so a long chapter has structure.
function groupHeadEl(group) {
  const head = document.createElement('div');
  head.className = 'walk-group-head reveal';
  head.id = group.id;

  const h2 = document.createElement('h2');
  h2.className = 'walk-group-title';
  h2.textContent = group.title;
  head.appendChild(h2);

  if (group.blurb) {
    const b = document.createElement('p');
    b.className = 'walk-group-blurb';
    b.textContent = group.blurb;
    head.appendChild(b);
  }
  return head;
}

// A small "contents" list at the top of a grouped chapter: one jump link per
// group. Purely navigational; rendered only when a chapter defines groups.
function chapterNavEl(groups) {
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav reveal';
  nav.setAttribute('aria-label', 'Sections');

  const kicker = document.createElement('div');
  kicker.className = 'chapter-nav-kicker';
  kicker.textContent = 'Sections';
  nav.appendChild(kicker);

  const list = document.createElement('ol');
  list.className = 'chapter-nav-list';
  groups.forEach((g) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + g.id;
    a.textContent = g.title;
    li.appendChild(a);
    list.appendChild(li);
  });
  nav.appendChild(list);
  return nav;
}

// Render a chapter as an ordered, embedded walkthrough, with a bridge line
// leading into each part that has one. When the chapter defines `groups`, the
// parts are rendered under meta sub-section headers (in group order) and a
// jump-nav is placed at the top. Any item not listed in a group still renders,
// in its original order, after the grouped parts.
function walkthroughEl(chapter, resolver) {
  const wrap = document.createElement('div');
  wrap.className = 'walkthrough';

  const items = chapter.items || [];
  const groups = chapter.groups || [];

  if (!groups.length) {
    items.forEach((item, i) => {
      if (item.bridge) wrap.appendChild(bridgeEl(item.bridge));
      wrap.appendChild(walkPartEl(item, resolver, i));
    });
    return wrap;
  }

  const byId = new Map(items.map((it) => [it.id, it]));
  const claimed = new Set();

  wrap.appendChild(chapterNavEl(groups));

  let idx = 0;
  groups.forEach((group) => {
    wrap.appendChild(groupHeadEl(group));
    (group.items || []).forEach((id, i) => {
      const item = byId.get(id);
      if (!item) return;                 // unknown id in group → skip, don't break
      claimed.add(id);
      // Keep the connective bridges between parts, but skip the one on a group's
      // first part — it introduces the section, which the header already does.
      if (item.bridge && i > 0) wrap.appendChild(bridgeEl(item.bridge));
      wrap.appendChild(walkPartEl(item, resolver, idx++));
    });
  });

  // Safety net: any part the groups forgot still shows, in file order.
  items.forEach((item) => {
    if (claimed.has(item.id)) return;
    if (item.bridge) wrap.appendChild(bridgeEl(item.bridge));
    wrap.appendChild(walkPartEl(item, resolver, idx++));
  });

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
