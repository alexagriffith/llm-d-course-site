/* @ds-bundle: {"format":4,"namespace":"InteractiveTechDesignSystem_187b8b","components":[{"name":"ArchBox","sourcePath":"components/arch/ArchBox.jsx"},{"name":"ArchGroup","sourcePath":"components/arch/ArchGroup.jsx"},{"name":"Edge","sourcePath":"components/arch/Edge.jsx"},{"name":"BarChart","sourcePath":"components/charts/BarChart.jsx"},{"name":"DotGrid","sourcePath":"components/charts/DotGrid.jsx"},{"name":"LineChart","sourcePath":"components/charts/LineChart.jsx"},{"name":"RadarChart","sourcePath":"components/charts/RadarChart.jsx"},{"name":"RevealBar","sourcePath":"components/charts/RevealBar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"NoteLink","sourcePath":"components/core/NoteLink.jsx"},{"name":"Callout","sourcePath":"components/diagram/Callout.jsx"},{"name":"DiagramCanvas","sourcePath":"components/diagram/DiagramCanvas.jsx"},{"name":"Figure","sourcePath":"components/diagram/Figure.jsx"},{"name":"IsoStack","sourcePath":"components/diagram/IsoStack.jsx"},{"name":"MetricChip","sourcePath":"components/diagram/MetricChip.jsx"},{"name":"FlowDiagram","sourcePath":"components/flow/FlowDiagram.jsx"},{"name":"IsoCluster","sourcePath":"components/iso/IsoCluster.jsx"},{"name":"IsoCube","sourcePath":"components/iso/IsoCube.jsx"},{"name":"IsoCylinder","sourcePath":"components/iso/IsoCylinder.jsx"},{"name":"IsoGlyph","sourcePath":"components/iso/IsoGlyph.jsx"},{"name":"IsoHub","sourcePath":"components/iso/IsoHub.jsx"},{"name":"Leader","sourcePath":"components/iso/Leader.jsx"},{"name":"NodeBadge","sourcePath":"components/iso/NodeBadge.jsx"},{"name":"ScatterField","sourcePath":"components/iso/ScatterField.jsx"}],"sourceHashes":{"components/arch/ArchBox.jsx":"bb48f290d44a","components/arch/ArchGroup.jsx":"1bfcb56e3da4","components/arch/Edge.jsx":"613b6b156d7f","components/charts/BarChart.jsx":"4cf8abc77935","components/charts/DotGrid.jsx":"4c105bc5ff23","components/charts/LineChart.jsx":"96d98281b0ea","components/charts/RadarChart.jsx":"927083ab9f97","components/charts/RevealBar.jsx":"efea4549dd82","components/core/Button.jsx":"f83bfc7843bd","components/core/NoteLink.jsx":"1dca6ffb5d21","components/diagram/Callout.jsx":"5332f1d4a1d2","components/diagram/DiagramCanvas.jsx":"19cc4e9e3b34","components/diagram/Figure.jsx":"4e0180c75159","components/diagram/IsoStack.jsx":"d57e39e401c5","components/diagram/MetricChip.jsx":"fc7b6cb44a02","components/flow/FlowDiagram.jsx":"41b415595dc8","components/iso/IsoCluster.jsx":"a74b03e32719","components/iso/IsoCube.jsx":"cf385ad2758b","components/iso/IsoCylinder.jsx":"96c582a211dc","components/iso/IsoGlyph.jsx":"576c3228d2a7","components/iso/IsoHub.jsx":"f108a00f6561","components/iso/Leader.jsx":"6b6bf077e71b","components/iso/NodeBadge.jsx":"1fa948218368","components/iso/ScatterField.jsx":"25fc9505551a","ui_kits/demo/animations-v2.jsx":"33e9200b93f5","ui_kits/demo/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[{"name":"isoClusterTop","sourcePath":"components/iso/IsoCluster.jsx"}]} */

(() => {

const __ds_ns = (window.InteractiveTechDesignSystem_187b8b = window.InteractiveTechDesignSystem_187b8b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/arch/ArchBox.jsx
try { (() => {
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}
const TONES = {
  ink: 'var(--ink)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};
const TEXT = {
  ink: 'var(--ink)',
  red: 'var(--stream-red-deep)',
  blue: 'var(--stream-blue-deep)',
  mix: 'var(--mix-deep)',
  spark: 'var(--ink)'
};

/* Labeled block node for 2D architecture diagrams. Position absolutely; connect with Edge. */
function ArchBox({
  label,
  sublabel,
  tone = 'ink',
  filled = false,
  w = 150,
  h = 50,
  depth,
  delay = 0,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    el.style.opacity = '0';
    el.style.translate = '0 8px';
    return onVisible(el, () => {
      el.style.transition = `opacity .5s ease ${delay}s, translate .5s var(--ease-spring) ${delay}s`;
      el.style.opacity = '1';
      el.style.translate = '0 0';
    });
  }, []);
  const c = TONES[tone] || tone;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-depth": depth || undefined,
    style: {
      position: 'absolute',
      width: w,
      height: h,
      borderRadius: 6,
      boxSizing: 'border-box',
      background: filled ? c : 'var(--surface-card)',
      border: `1.5px solid ${filled ? 'var(--ink)' : c}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: filled ? 500 : 400,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: filled ? 'var(--text-on-fill)' : TEXT[tone] || 'var(--ink)'
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: filled ? 'color-mix(in oklab, var(--text-on-fill) 70%, transparent)' : 'var(--text-muted)'
    }
  }, sublabel));
}
Object.assign(__ds_scope, { ArchBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arch/ArchBox.jsx", error: String((e && e.message) || e) }); }

// components/arch/ArchGroup.jsx
try { (() => {
const TONES = {
  ink: 'var(--ink)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};
const TEXT = {
  ink: 'var(--text-muted)',
  red: 'var(--stream-red-deep)',
  blue: 'var(--stream-blue-deep)',
  mix: 'var(--mix-deep)',
  spark: 'var(--ink)'
};

/* Dashed boundary grouping related nodes — a VPC, plane, zone, or subsystem. Nests freely. */
function ArchGroup({
  title,
  tone = 'ink',
  w,
  h,
  style,
  children
}) {
  const c = TONES[tone] || tone;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: w,
      height: h,
      boxSizing: 'border-box',
      borderRadius: 8,
      border: `1.5px dashed ${tone === 'ink' ? 'var(--rule-dashed)' : `color-mix(in oklab, ${c} 55%, var(--surface-diagram))`}`,
      background: `color-mix(in oklab, ${c} 7%, var(--surface-card))`,
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      left: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: TEXT[tone] || 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, title), children);
}
Object.assign(__ds_scope, { ArchGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arch/ArchGroup.jsx", error: String((e && e.message) || e) }); }

// components/arch/Edge.jsx
try { (() => {
const TONES = {
  ink: 'var(--ink-3)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};

/* Elbow connector with arrowhead for 2D architecture diagrams. Render BEFORE boxes so pulses pass under them. */
function Edge({
  points = [],
  color = 'ink',
  width = 1.6,
  arrow = true,
  march = false,
  pulse = false,
  dashed = true,
  duration = 2.4,
  delay = 0,
  style
}) {
  if (points.length < 2) return null;
  const c = TONES[color] || color;
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  const [x2, y2] = points[points.length - 1],
    [x1, y1] = points[points.length - 2];
  const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes aeDash{to{stroke-dashoffset:-24}}@keyframes aeTravel{0%{offset-distance:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{offset-distance:100%;opacity:0}}`), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: c,
    strokeWidth: width,
    strokeDasharray: dashed ? '6 6' : 'none',
    style: march ? {
      animation: 'aeDash 1.4s linear infinite'
    } : null
  }), arrow && /*#__PURE__*/React.createElement("polygon", {
    points: "-1,-4.5 8,0 -1,4.5",
    fill: c,
    transform: `translate(${x2},${y2}) rotate(${ang})`
  }), pulse && /*#__PURE__*/React.createElement("circle", {
    r: "4",
    fill: c,
    style: {
      offsetPath: `path('${d}')`,
      animation: `aeTravel ${duration}s linear ${delay}s infinite`
    }
  }));
}
Object.assign(__ds_scope, { Edge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/arch/Edge.jsx", error: String((e && e.message) || e) }); }

// components/charts/BarChart.jsx
try { (() => {
/* Reveal helper: fires once when el is visible — immediate rect check, IO when it works, scroll + timer fallback. */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}

/* Vertical bar chart; bars grow from the baseline when scrolled into view. */
function BarChart({
  data = [],
  max,
  height = 180,
  color = 'var(--mix)',
  style
}) {
  const ref = React.useRef(null);
  const M = max ?? Math.max(...data.map(d => d.value), 1);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onVisible(el, () => {
      el.querySelectorAll('[data-bar]').forEach(b => {
        b.style.height = b.dataset.bar;
      });
      el.querySelectorAll('[data-val]').forEach(v => {
        v.style.opacity = '1';
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end',
      ...style
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-val": true,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-heading)',
      opacity: 0,
      transition: `opacity .4s ease ${0.4 + i * 0.09}s`
    }
  }, d.display ?? d.value), /*#__PURE__*/React.createElement("div", {
    "data-bar": `${d.value / M * (height - 34)}px`,
    style: {
      width: '100%',
      maxWidth: 56,
      height: '0px',
      background: d.color || color,
      borderRadius: '3px 3px 0 0',
      transition: `height var(--dur-fill) var(--ease-spring) ${i * 0.09}s`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, d.label))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/DotGrid.jsx
try { (() => {
/* Reveal helper: fires once when el is visible — immediate rect check, IO when it works, scroll + timer fallback. */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}

/* Parameter-count dot grid: colored segments fill left-to-right, cells fade in staggered on scroll. */
function DotGrid({
  segments = [],
  total,
  columns = 30,
  label,
  style
}) {
  const ref = React.useRef(null);
  const cells = [];
  segments.forEach(s => {
    for (let i = 0; i < s.count; i++) cells.push(s.color);
  });
  const T = total ?? cells.length;
  while (cells.length < T) cells.push('var(--track)');
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    [...el.children].forEach(c => {
      c.style.opacity = '0';
    });
    return onVisible(el, () => {
      [...el.children].forEach((c, i) => {
        c.style.transition = `opacity .25s ease ${i * 8}ms`;
        c.style.opacity = '1';
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 3
    }
  }, cells.slice(0, T).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '1',
      borderRadius: 2,
      background: c
    }
  }))));
}
Object.assign(__ds_scope, { DotGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DotGrid.jsx", error: String((e && e.message) || e) }); }

// components/charts/LineChart.jsx
try { (() => {
/* Reveal helper: fires once when el is visible — immediate rect check, IO when it works, scroll + timer fallback. */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}

/* Line/area chart that draws its stroke on scroll; area fades in after, end dot lands last. */
function LineChart({
  points = [],
  labels = [],
  width = 400,
  height = 150,
  color = 'var(--mix)',
  area = true,
  style
}) {
  const ref = React.useRef(null);
  const pad = 8;
  const M = Math.max(...points, 1),
    m = Math.min(...points, 0);
  const X = i => pad + i * (width - pad * 2) / Math.max(points.length - 1, 1);
  const Y = v => height - pad - (v - m) / (M - m || 1) * (height - pad * 2 - 14);
  const d = points.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const areaD = `${d} L${X(points.length - 1)},${height - pad} L${X(0)},${height - pad} Z`;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const path = el.querySelector('[data-line]');
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
    el.querySelectorAll('[data-late]').forEach(a => {
      a.style.opacity = '0';
    });
    return onVisible(el, () => {
      path.style.transition = 'stroke-dashoffset var(--dur-draw) var(--ease-spring)';
      path.style.strokeDashoffset = '0';
      el.querySelectorAll('[data-late]').forEach((a, i) => {
        a.style.transition = `opacity .5s ease ${1.1 + i * 0.15}s`;
        a.style.opacity = '1';
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("svg", {
    ref: ref,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad,
    y1: height - pad,
    x2: width - pad,
    y2: height - pad,
    stroke: "var(--grid-line-strong)",
    strokeWidth: "1"
  }), area && /*#__PURE__*/React.createElement("path", {
    "data-late": true,
    d: areaD,
    style: {
      fill: `color-mix(in oklab, ${color} 14%, transparent)`
    }
  }), /*#__PURE__*/React.createElement("path", {
    "data-line": true,
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    "data-late": true,
    cx: X(points.length - 1),
    cy: Y(points[points.length - 1]),
    r: "4.5",
    fill: color,
    stroke: "var(--paper)",
    strokeWidth: "2"
  })), labels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      padding: `4px ${pad}px 0`
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/RadarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Reveal helper: fires once when el is visible — immediate rect check + polling (IO/scroll events are unreliable in embedded previews). */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}

/* Multi-series radar. Primary series draws itself in on scroll; comparison series (dashed, hollow dots)
   fade in after. Legend is live: hover highlights a series, click toggles it. */
function RadarChart({
  axes = [],
  series,
  size = 320,
  rings = 4,
  color = 'var(--mix)',
  dotColors = {},
  legend = true,
  style
}) {
  const S = series && series.length ? series : [{
    name: null,
    values: axes.map(a => a.value ?? 0),
    color
  }];
  const [revealed, setRevealed] = React.useState(false);
  const [hover, setHover] = React.useState(null);
  const [hidden, setHidden] = React.useState({});
  const ref = React.useRef(null);
  React.useEffect(() => onVisible(ref.current, () => setRevealed(true)), []);
  const n = Math.max(axes.length, 1);
  const c = size / 2,
    R = size / 2 - 58;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r];
  };
  const polys = S.map(s => axes.map((_, i) => pt(i, R * (s.values[i] ?? 0))));
  const perim = P => P.reduce((sum, p, i) => {
    const q = P[(i + 1) % P.length];
    return sum + Math.hypot(q[0] - p[0], q[1] - p[1]);
  }, 0);
  const dim = name => name && hidden[name] ? 0 : hover != null && hover !== name ? 0.12 : 1;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    style: {
      display: 'block',
      width: size,
      height: size,
      overflow: 'visible'
    }
  }, Array.from({
    length: rings
  }, (_, r) => /*#__PURE__*/React.createElement("polygon", {
    key: r,
    points: axes.map((_, i) => pt(i, R * (r + 1) / rings).join(',')).join(' '),
    fill: "none",
    stroke: "var(--grid-line-strong)",
    strokeWidth: "1"
  })), axes.map((_, i) => {
    const [x, y] = pt(i, R);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: c,
      y1: c,
      x2: x,
      y2: y,
      stroke: "var(--rule-dashed)",
      strokeWidth: "1",
      strokeDasharray: "2 4"
    });
  }), S.map((s, si) => {
    const P = polys[si],
      primary = si === 0,
      L = perim(P);
    const events = s.name ? {
      onMouseEnter: () => setHover(s.name),
      onMouseLeave: () => setHover(null)
    } : {};
    return /*#__PURE__*/React.createElement("g", _extends({
      key: si
    }, events, {
      style: {
        opacity: dim(s.name),
        transition: 'opacity .25s ease',
        pointerEvents: hidden[s.name] ? 'none' : 'auto'
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: P.map(p => p.join(',')).join(' '),
      style: primary ? {
        fill: `color-mix(in oklab, ${s.color} 18%, transparent)`,
        fillOpacity: revealed ? 1 : 0,
        strokeDasharray: L,
        strokeDashoffset: revealed ? 0 : L,
        transition: 'stroke-dashoffset var(--dur-draw) var(--ease-spring), fill-opacity .7s ease 1.2s'
      } : {
        fill: `color-mix(in oklab, ${s.color} 8%, transparent)`,
        strokeDasharray: '5 5',
        opacity: revealed ? 1 : 0,
        transition: `opacity .6s ease ${(0.8 + si * 0.25).toFixed(2)}s`
      },
      stroke: s.color,
      strokeWidth: primary ? 2.5 : 1.8,
      strokeLinejoin: "round"
    }), P.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: primary ? 4.5 : 4,
      fill: primary ? dotColors[i] || s.color : 'var(--paper)',
      stroke: primary ? 'none' : s.color,
      strokeWidth: primary ? 0 : 2,
      style: {
        opacity: revealed ? 1 : 0,
        transition: `opacity .3s ease ${(primary ? 1.05 + i * 0.08 : 0.9 + si * 0.25).toFixed(2)}s`
      }
    }, /*#__PURE__*/React.createElement("title", null, `${axes[i].label} · ${Math.round((s.values[i] ?? 0) * 100)}`))));
  }), axes.map((ax, i) => {
    const [x, y] = pt(i, R + 26);
    const anchor = Math.abs(x - c) < 8 ? 'middle' : x > c ? 'start' : 'end';
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      textAnchor: anchor,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.08em',
        opacity: revealed ? 1 : 0,
        transition: `opacity .4s ease ${(1.4 + i * 0.05).toFixed(2)}s`
      }
    }, /*#__PURE__*/React.createElement("tspan", {
      x: x,
      y: y,
      style: {
        fill: 'var(--text-heading)'
      }
    }, String(ax.label).toUpperCase(), ax.display != null ? ` ${ax.display}` : ''), ax.sublabel && /*#__PURE__*/React.createElement("tspan", {
      x: x,
      y: y + 13,
      style: {
        fill: 'var(--text-muted)'
      }
    }, String(ax.sublabel).toUpperCase()));
  })), legend && S.some(s => s.name) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, S.map((s, si) => s.name && /*#__PURE__*/React.createElement("button", {
    key: si,
    onClick: () => setHidden(h => ({
      ...h,
      [s.name]: !h[s.name]
    })),
    onMouseEnter: () => setHover(s.name),
    onMouseLeave: () => setHover(null),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'transparent',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-body)',
      opacity: hidden[s.name] ? 0.35 : 1,
      transition: 'opacity .2s ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: s.dashed ? 'transparent' : s.color,
      border: `2px solid ${s.color}`,
      boxSizing: 'border-box'
    }
  }), s.name))));
}
Object.assign(__ds_scope, { RadarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/RadarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/RevealBar.jsx
try { (() => {
/* Reveal helper: fires once when el is visible — immediate rect check, IO when it works, scroll + timer fallback. */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}

/* Progress/benchmark bar that fills when scrolled into view. */
function RevealBar({
  label,
  value,
  display,
  color = 'var(--mix)',
  height = 8,
  style
}) {
  const ref = React.useRef(null);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onVisible(wrapRef.current, () => {
      el.style.width = `${value}%`;
    });
  }, [value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.06em',
      color: 'var(--text-muted)',
      marginBottom: 6,
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-heading)'
    }
  }, display ?? `${value}%`)), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: 'var(--track)',
      borderRadius: height / 2,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      height: '100%',
      width: '0%',
      background: color,
      borderRadius: height / 2,
      transition: 'width var(--dur-fill) var(--ease-spring) .15s'
    }
  })));
}
Object.assign(__ds_scope, { RevealBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/RevealBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'ink',
  children,
  onClick,
  href,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const V = {
    ink: {
      bg: 'var(--ink)',
      hov: 'var(--mix-deep)',
      color: 'var(--paper)',
      border: '1.5px solid transparent'
    },
    mix: {
      bg: 'var(--mix)',
      hov: 'var(--mix-deep)',
      color: 'var(--text-on-fill)',
      border: '1.5px solid transparent'
    },
    ghost: {
      bg: 'transparent',
      hov: 'var(--mix-wash)',
      color: 'var(--ink)',
      border: '1.5px solid var(--ink)'
    }
  }[variant] || {};
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--text-ui)',
      fontFamily: 'var(--font-sans)',
      padding: '10px 20px',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      textDecoration: 'none',
      background: hover ? V.hov : V.bg,
      color: V.color,
      border: V.border,
      transition: 'background .18s ease',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/NoteLink.jsx
try { (() => {
function NoteLink({
  children = 'Read the note',
  href = '#',
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--text-ui)',
      fontFamily: 'var(--font-sans)',
      color: hover ? 'var(--link)' : 'var(--ink)',
      textDecoration: 'none',
      cursor: 'pointer',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      transition: 'translate .18s var(--ease-spring)',
      translate: hover ? '4px 0' : '0 0'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { NoteLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NoteLink.jsx", error: String((e && e.message) || e) }); }

// components/diagram/Callout.jsx
try { (() => {
const TONES = {
  ink: 'var(--ink)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};
const TEXT = {
  ink: 'var(--ink)',
  red: 'var(--stream-red-deep)',
  blue: 'var(--stream-blue-deep)',
  mix: 'var(--mix-deep)',
  spark: 'var(--ink)'
};

/* Static inline mono chip — the non-positioned sibling of MetricChip, for use in prose/legends. */
function Callout({
  tone = 'ink',
  filled = false,
  children,
  style
}) {
  const c = TONES[tone] || TONES.ink;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.04em',
      padding: '3px 8px',
      borderRadius: 'var(--radius-chip)',
      whiteSpace: 'nowrap',
      background: filled ? c : 'var(--chip-surface)',
      color: filled ? 'var(--text-on-fill)' : TEXT[tone] || 'var(--ink)',
      border: `var(--border-chip) solid ${filled ? 'var(--ink)' : c}`,
      verticalAlign: 'middle',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/Callout.jsx", error: String((e && e.message) || e) }); }

// components/diagram/DiagramCanvas.jsx
try { (() => {
/* Graph-paper panel. Children with data-depth get cursor parallax; data-explode-x/y offsets apply while hovered. */
function DiagramCanvas({
  height = 320,
  cell = 28,
  caption,
  explode = true,
  frame = true,
  style,
  children
}) {
  const ref = React.useRef(null);
  const hov = React.useRef(false);
  const apply = (dx, dy) => {
    if (!ref.current) return;
    ref.current.querySelectorAll('[data-depth],[data-explode-x],[data-explode-y]').forEach(c => {
      if (!c.dataset.gpT) {
        c.style.transition = 'transform var(--dur-explode) var(--ease-spring)';
        c.dataset.gpT = '1';
      }
      const d = parseFloat(c.dataset.depth || 0);
      const ex = hov.current && explode ? parseFloat(c.dataset.explodeX || 0) : 0;
      const ey = hov.current && explode ? parseFloat(c.dataset.explodeY || 0) : 0;
      c.style.transform = `translate(${(dx * d + ex).toFixed(1)}px, ${(dy * d + ey).toFixed(1)}px)`;
    });
  };
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    hov.current = true;
    apply((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    hov.current = false;
    apply(0, 0);
  };
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      position: 'relative',
      height,
      overflow: 'hidden',
      cursor: 'crosshair',
      backgroundColor: 'var(--surface-diagram)',
      backgroundImage: `repeating-linear-gradient(0deg, transparent 0 ${cell - 1}px, var(--grid-line) ${cell - 1}px ${cell}px), repeating-linear-gradient(90deg, transparent 0 ${cell - 1}px, var(--grid-line) ${cell - 1}px ${cell}px)`,
      border: frame ? '1px dashed var(--rule-dashed)' : 'none',
      borderRadius: frame ? 8 : 0,
      ...style
    }
  }, children), caption != null && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      padding: '10px 2px 0'
    }
  }, caption));
}
Object.assign(__ds_scope, { DiagramCanvas });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/DiagramCanvas.jsx", error: String((e && e.message) || e) }); }

// components/diagram/Figure.jsx
try { (() => {
/* Section wrapper: mono eyebrow (FIG. N · TITLE), serif heading, figure content, serif note. */
function Figure({
  index,
  eyebrow,
  title,
  note,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      ...style
    }
  }, (index != null || eyebrow) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, index != null ? `FIG. ${index}` : null, index != null && eyebrow ? ' · ' : '', eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-title)',
      color: 'var(--text-heading)',
      textWrap: 'pretty'
    }
  }, title), children, note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-prose)',
      color: 'var(--text-body)',
      maxWidth: 'var(--measure)',
      textWrap: 'pretty'
    }
  }, note));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/Figure.jsx", error: String((e && e.message) || e) }); }

// components/diagram/IsoStack.jsx
try { (() => {
/* Exploded isometric stack (FIG "where the streams meet"). layers[0] is the BOTTOM layer.
   Inside a DiagramCanvas, hovering pulls the stack apart along `axis`. */
function IsoStack({
  layers = [],
  width = 280,
  gap = 46,
  spread = 26,
  axis = 'y',
  axisLine = true,
  style
}) {
  const n = layers.length;
  const hw = width * 0.29,
    hh = hw / 2,
    side = 16,
    pad = 14;
  const cx = width / 2;
  const H = pad * 2 + hh * 2 + side + gap * (n - 1);
  const cy = i => pad + hh + (n - 1 - i) * gap;
  const shade = (c, pct, into) => `color-mix(in oklab, ${c} ${pct}%, ${into})`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${H}`,
    style: {
      display: 'block',
      width,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, axisLine && /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: -8,
    x2: cx,
    y2: H + 8,
    stroke: "var(--ink)",
    strokeWidth: "1",
    strokeDasharray: "3 5",
    opacity: ".4"
  }), layers.map((L, i) => {
    const y = cy(i);
    const ex = axis === 'x' ? (i % 2 ? 1 : -1) * spread : 0;
    const ey = axis === 'y' ? ((n - 1) / 2 - i) * spread : 0;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      "data-depth": 4 + i * 2,
      "data-explode-x": ex || undefined,
      "data-explode-y": ey || undefined
    }, /*#__PURE__*/React.createElement("polygon", {
      points: `${cx - hw},${y} ${cx},${y + hh} ${cx},${y + hh + side} ${cx - hw},${y + side}`,
      style: {
        fill: shade(L.color, 72, 'black')
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${cx + hw},${y} ${cx},${y + hh} ${cx},${y + hh + side} ${cx + hw},${y + side}`,
      style: {
        fill: shade(L.color, 55, 'white')
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${cx},${y - hh} ${cx + hw},${y} ${cx},${y + hh} ${cx - hw},${y}`,
      style: {
        fill: L.color
      }
    }));
  }));
}
Object.assign(__ds_scope, { IsoStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/IsoStack.jsx", error: String((e && e.message) || e) }); }

// components/diagram/MetricChip.jsx
try { (() => {
/* Reveal helper: fires once when el is visible — immediate rect check, IO when it works, scroll + timer fallback. */
function onVisible(el, fire) {
  var done = false,
    io = null,
    poll;
  function go() {
    if (done) return;
    done = true;
    fire();
    cleanup();
  }
  function check() {
    if (!el || done) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) go();
  }
  function cleanup() {
    if (io) io.disconnect();
    clearInterval(poll);
    window.removeEventListener('scroll', check, true);
    window.removeEventListener('resize', check);
    var i = (window.__dtReveals || []).indexOf(check);
    if (i >= 0) window.__dtReveals.splice(i, 1);
  }
  check();
  setTimeout(check, 0);
  poll = setInterval(check, 250);
  window.addEventListener('scroll', check, {
    capture: true,
    passive: true
  });
  window.addEventListener('resize', check);
  (window.__dtReveals = window.__dtReveals || []).push(check);
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) go();
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
  }
  return cleanup;
}
const TONES = {
  ink: 'var(--ink)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};
const TEXT = {
  ink: 'var(--ink)',
  red: 'var(--stream-red-deep)',
  blue: 'var(--stream-blue-deep)',
  mix: 'var(--mix-deep)',
  spark: 'var(--ink)'
};

/* Cursor-tracked mono label chip. Position via style {left, top…} inside a DiagramCanvas. */
function MetricChip({
  label,
  tone = 'ink',
  filled = false,
  depth = 20,
  explodeX = 0,
  explodeY = 0,
  delay = 0,
  reveal = true,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !reveal) return;
    el.style.opacity = '0';
    el.style.translate = '0 10px';
    return onVisible(el, () => {
      el.style.transition = `opacity var(--dur-reveal) ease ${delay}s, translate var(--dur-reveal) var(--ease-spring) ${delay}s`;
      el.style.opacity = '1';
      el.style.translate = '0 0';
    });
  }, []);
  const c = TONES[tone] || TONES.ink;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-depth": depth || undefined,
    "data-explode-x": explodeX || undefined,
    "data-explode-y": explodeY || undefined,
    style: {
      position: 'absolute',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: filled ? 500 : 400,
      letterSpacing: '.04em',
      whiteSpace: 'nowrap',
      padding: '4px 9px',
      borderRadius: 'var(--radius-chip)',
      background: filled ? c : 'var(--chip-surface)',
      color: filled ? 'var(--text-on-fill)' : TEXT[tone] || 'var(--ink)',
      border: `var(--border-chip) solid ${filled ? 'var(--ink)' : c}`,
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { MetricChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/MetricChip.jsx", error: String((e && e.message) || e) }); }

// components/flow/FlowDiagram.jsx
try { (() => {
const HUES = {
  ink: 'var(--ink)',
  red: 'var(--stream-red)',
  blue: 'var(--stream-blue)',
  mix: 'var(--mix)',
  spark: 'var(--spark)'
};
const col = c => HUES[c] || c || 'var(--mix)';

/* Node-and-edge diagram with animated dashed edges and traveling pulses.
   Coordinates are in viewBox units. */
function FlowDiagram({
  width = 400,
  height = 300,
  nodes = [],
  edges = [],
  labels = true,
  style
}) {
  const pos = {};
  nodes.forEach(n => {
    pos[n.id] = n;
  });
  const pathFor = e => {
    const a = pos[e.from],
      b = pos[e.to];
    if (!a || !b) return '';
    const via = e.via ? e.via.map(v => `L${v[0]},${v[1]}`).join(' ') : '';
    return `M${a.x},${a.y} ${via} L${b.x},${b.y}`;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes ftDash{to{stroke-dashoffset:-28}}@keyframes ftTravel{0%{offset-distance:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{offset-distance:100%;opacity:0}}`), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      overflow: 'visible'
    }
  }, edges.map((e, i) => /*#__PURE__*/React.createElement("path", {
    key: `e${i}`,
    d: pathFor(e),
    fill: "none",
    stroke: col(e.color),
    strokeWidth: e.width || 2,
    strokeDasharray: "7 7",
    style: {
      animation: `ftDash ${e.speed || 1.1}s linear infinite`
    }
  })), edges.map((e, i) => e.pulse === false ? null : /*#__PURE__*/React.createElement("circle", {
    key: `p${i}`,
    r: "4.5",
    fill: col(e.color),
    style: {
      offsetPath: `path('${pathFor(e)}')`,
      animation: `ftTravel ${e.duration || 2.4}s linear ${e.delay || 0}s infinite`
    }
  })), nodes.map(n => {
    const s = n.size || 34,
      c = col(n.color);
    return /*#__PURE__*/React.createElement("g", {
      key: n.id,
      "data-depth": n.depth ?? 6
    }, n.shape === 'dot' ? /*#__PURE__*/React.createElement("circle", {
      cx: n.x,
      cy: n.y,
      r: s / 4,
      fill: c,
      stroke: "var(--ink)",
      strokeWidth: "2"
    }) : /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
      points: `${n.x},${n.y - s * 0.55} ${n.x + s},${n.y} ${n.x},${n.y + s * 0.55} ${n.x - s},${n.y}`,
      fill: c,
      stroke: "var(--ink)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${n.x},${n.y - s * 0.32} ${n.x + s * 0.58},${n.y} ${n.x},${n.y + s * 0.32} ${n.x - s * 0.58},${n.y}`,
      style: {
        fill: `color-mix(in oklab, ${c} 45%, white)`
      }
    })), labels && n.label && /*#__PURE__*/React.createElement("text", {
      x: n.x,
      y: n.y + s * 0.55 + 18,
      textAnchor: "middle",
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.1em',
        fill: 'var(--text-muted)'
      }
    }, String(n.label).toUpperCase()));
  })));
}
Object.assign(__ds_scope, { FlowDiagram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/flow/FlowDiagram.jsx", error: String((e && e.message) || e) }); }

// components/iso/IsoCluster.jsx
try { (() => {
/* Cluster of isometric cubes on a grid (i = right-forward, j = left-forward, k = up).
   Omit cells to sculpt the shape; per-cell color overrides. */
function IsoCluster({
  cells = [],
  size = 100,
  gap = 6,
  color = 'var(--mix)',
  depth,
  style
}) {
  const hw = size / 2,
    hh = hw * 0.5,
    dp = hw * 0.9;
  const ux = hw + gap,
    uy = hh + gap / 2,
    uz = dp + gap;
  const pts = cells.map(c => ({
    ...c,
    X: (c.i - c.j) * ux,
    Y: (c.i + c.j) * uy - c.k * uz
  }));
  const minX = Math.min(...pts.map(p => p.X)) - hw,
    maxX = Math.max(...pts.map(p => p.X)) + hw;
  const minY = Math.min(...pts.map(p => p.Y)) - hh,
    maxY = Math.max(...pts.map(p => p.Y)) + hh + dp;
  const W = maxX - minX + 8,
    H = maxY - minY + 8;
  const ord = [...pts].sort((a, b) => a.i + a.j - (b.i + b.j) || a.k - b.k);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    "data-depth": depth || undefined,
    style: {
      display: 'block',
      width: W,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, ord.map((p, n) => {
    const c = p.color || color;
    const x = p.X - minX + 4,
      y = p.Y - minY + 4;
    return /*#__PURE__*/React.createElement("g", {
      key: n,
      "data-depth": 6 + p.k * 3,
      "data-explode-y": p.k ? -14 : 8
    }, /*#__PURE__*/React.createElement("polygon", {
      points: `${x},${y - hh} ${x + hw},${y} ${x},${y + hh} ${x - hw},${y}`,
      style: {
        fill: `color-mix(in oklab, ${c} 10%, var(--surface-card))`,
        stroke: c,
        strokeWidth: 1.5
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${x},${y - hh * 0.55} ${x + hw * 0.55},${y} ${x},${y + hh * 0.55} ${x - hw * 0.55},${y}`,
      style: {
        fill: `color-mix(in oklab, ${c} 26%, var(--surface-card))`
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${x - hw},${y} ${x},${y + hh} ${x},${y + hh + dp} ${x - hw},${y + dp}`,
      style: {
        fill: c
      }
    }), /*#__PURE__*/React.createElement("polygon", {
      points: `${x + hw},${y} ${x},${y + hh} ${x},${y + hh + dp} ${x + hw},${y + dp}`,
      style: {
        fill: `color-mix(in oklab, ${c} 76%, black)`
      }
    }));
  }));
}

/* Positions of top vertices, exported for badge placement: same math as the component. */
function isoClusterTop(cells, size = 100, gap = 6) {
  const hw = size / 2,
    hh = hw * 0.5,
    dp = hw * 0.9;
  const ux = hw + gap,
    uy = hh + gap / 2,
    uz = dp + gap;
  const pts = cells.map(c => ({
    X: (c.i - c.j) * ux,
    Y: (c.i + c.j) * uy - c.k * uz
  }));
  const minX = Math.min(...pts.map(p => p.X)) - hw;
  const minY = Math.min(...pts.map(p => p.Y)) - hh;
  return cells.map(c => ({
    x: (c.i - c.j) * ux - minX + 4,
    y: (c.i + c.j) * uy - c.k * uz - hh - minY + 4
  }));
}
Object.assign(__ds_scope, { IsoCluster, isoClusterTop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/IsoCluster.jsx", error: String((e && e.message) || e) }); }

// components/iso/IsoCube.jsx
try { (() => {
/* Isometric cube with optional nested top tiers (compute units, services, "the box"). */
function IsoCube({
  size = 120,
  color = 'var(--mix)',
  tiers = 2,
  depth,
  style
}) {
  const hw = size / 2,
    hh = hw * 0.5,
    dp = hw * 0.9;
  const W = size,
    H = hh * 2 + dp;
  const diamond = s => `${hw},${hh - hh * s} ${hw + hw * s},${hh} ${hw},${hh + hh * s} ${hw - hw * s},${hh}`;
  const tierFills = [`color-mix(in oklab, ${color} 45%, var(--surface-card))`, color, `color-mix(in oklab, ${color} 70%, black)`];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    "data-depth": depth || undefined,
    style: {
      display: 'block',
      width: W,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: `${hw},0 ${size},${hh} ${hw},${hh * 2} 0,${hh}`,
    style: {
      fill: `color-mix(in oklab, ${color} 14%, var(--surface-card))`,
      stroke: color,
      strokeWidth: 1.5
    }
  }), Array.from({
    length: Math.min(tiers, 2)
  }, (_, k) => /*#__PURE__*/React.createElement("polygon", {
    key: k,
    points: diamond(k === 0 ? 0.55 : 0.3),
    style: {
      fill: tierFills[k]
    }
  })), /*#__PURE__*/React.createElement("polygon", {
    points: `0,${hh} ${hw},${hh * 2} ${hw},${hh * 2 + dp} 0,${hh + dp}`,
    style: {
      fill: `color-mix(in oklab, ${color} 78%, black)`
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${size},${hh} ${hw},${hh * 2} ${hw},${hh * 2 + dp} ${size},${hh + dp}`,
    style: {
      fill: color
    }
  }));
}
Object.assign(__ds_scope, { IsoCube });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/IsoCube.jsx", error: String((e && e.message) || e) }); }

// components/iso/IsoCylinder.jsx
try { (() => {
/* Stacked isometric cylinder (replica stacks, databases, storage tiers). discs[0] is the BOTTOM.
   Inside a DiagramCanvas, hover pulls the discs apart. */
function IsoCylinder({
  discs = [],
  rx = 84,
  gap = 16,
  spread = 24,
  axisLine = true,
  depth,
  style
}) {
  const ry = rx * 0.36,
    pad = 6,
    n = discs.length;
  const heights = discs.map(d => d.h ?? 24);
  const W = rx * 2 + pad * 2;
  const H = heights.reduce((a, b) => a + b, 0) + gap * (n - 1) + ry * 2 + pad * 2;
  const cx = W / 2;
  let acc = H - pad - ry;
  const items = discs.map((d, i) => {
    const h = heights[i],
      yBottom = acc,
      yTop = acc - h;
    acc -= h + gap;
    return {
      d,
      yTop,
      yBottom,
      i
    };
  });
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    "data-depth": depth || undefined,
    style: {
      display: 'block',
      width: W,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, axisLine && /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: -16,
    x2: cx,
    y2: H + 8,
    stroke: "var(--ink)",
    strokeWidth: "1",
    strokeDasharray: "3 5",
    opacity: ".35"
  }), items.map(({
    d,
    yTop,
    yBottom,
    i
  }) => /*#__PURE__*/React.createElement("g", {
    key: i,
    "data-depth": 4 + i * 2,
    "data-explode-y": ((n - 1) / 2 - i) * spread || undefined
  }, /*#__PURE__*/React.createElement("path", {
    d: `M ${cx - rx} ${yTop} L ${cx - rx} ${yBottom} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBottom} L ${cx + rx} ${yTop}`,
    style: {
      fill: d.color
    }
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: yTop,
    rx: rx,
    ry: ry,
    style: {
      fill: `color-mix(in oklab, ${d.color} 24%, var(--surface-card))`,
      stroke: d.color,
      strokeWidth: 1.5
    }
  }))));
}
Object.assign(__ds_scope, { IsoCylinder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/IsoCylinder.jsx", error: String((e && e.message) || e) }); }

// components/iso/IsoGlyph.jsx
try { (() => {
/* Small scatter glyphs (diamonds, layer stacks, fins) that float gently and parallax — ambient detail around a figure. */
function IsoGlyph({
  kind = 'diamond',
  color = 'var(--mix)',
  size = 26,
  hollow = false,
  float = true,
  depth,
  delay = 0,
  style
}) {
  const h = size * 0.55;
  const dia = (y, s, fill, o) => /*#__PURE__*/React.createElement("polygon", {
    key: y,
    points: `${size / 2},${y} ${size / 2 + size / 2 * s},${y + h / 2 * s} ${size / 2},${y + h * s} ${size / 2 - size / 2 * s},${y + h / 2 * s}`,
    style: {
      fill: fill ? color : 'none',
      stroke: color,
      strokeWidth: 1.4,
      opacity: o
    }
  });
  let body,
    H = h;
  if (kind === 'layers') {
    H = h + 14;
    body = [dia(12, 1, false, 0.9), dia(6, 1, false, 0.9), dia(0, 1, true, 1)];
  } else if (kind === 'fins') {
    H = size * 0.9;
    body = [0, 1, 2].map(i => /*#__PURE__*/React.createElement("polygon", {
      key: i,
      points: `${i * (size / 3)},${size * 0.28} ${i * (size / 3) + size / 4.5},${size * 0.08} ${i * (size / 3) + size / 4.5},${size * 0.62} ${i * (size / 3)},${size * 0.82}`,
      style: {
        fill: `color-mix(in oklab, ${color} ${55 + i * 20}%, var(--surface-card))`,
        stroke: color,
        strokeWidth: 1
      }
    }));
  } else {
    body = [dia(0, 1, !hollow, 1)];
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${H}`,
    "data-depth": depth || undefined,
    style: {
      display: 'block',
      width: size,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, float && /*#__PURE__*/React.createElement("style", null, `@keyframes igFloat{0%,100%{translate:0 0}50%{translate:0 -6px}}`), /*#__PURE__*/React.createElement("g", {
    style: float ? {
      animation: `igFloat ${4.5 + delay % 2}s ease-in-out ${delay}s infinite`
    } : null
  }, body));
}
Object.assign(__ds_scope, { IsoGlyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/IsoGlyph.jsx", error: String((e && e.message) || e) }); }

// components/iso/IsoHub.jsx
try { (() => {
const cubeAt = (cx, cy, hw, c, key, tint) => {
  const hh = hw * 0.5,
    dp = hw * 0.9;
  return /*#__PURE__*/React.createElement("g", {
    key: key
  }, /*#__PURE__*/React.createElement("polygon", {
    points: `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`,
    style: {
      fill: tint ? `color-mix(in oklab, ${c} 18%, var(--surface-card))` : `color-mix(in oklab, ${c} 40%, var(--surface-card))`,
      stroke: c,
      strokeWidth: 1.5
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${cx - hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + dp} ${cx - hw},${cy + dp}`,
    style: {
      fill: tint ? `color-mix(in oklab, ${c} 45%, var(--surface-card))` : `color-mix(in oklab, ${c} 78%, black)`
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${cx + hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + dp} ${cx + hw},${cy + dp}`,
    style: {
      fill: tint ? `color-mix(in oklab, ${c} 30%, var(--surface-card))` : c
    }
  }));
};

/* Hub-and-spoke: central cube fanned to small cubes left/right with marching dotted elbows. */
function IsoHub({
  color = 'var(--mix)',
  size = 100,
  left = [],
  right = [],
  spokeSize = 40,
  gapY = 66,
  reach = 150,
  depth,
  style
}) {
  const hw = size / 2,
    hh = hw * 0.5,
    dp = hw * 0.9;
  const sHw = spokeSize / 2;
  const rows = Math.max(left.length, right.length, 1);
  const W = size + reach * 2 + spokeSize + 16;
  const H = Math.max(size * 1.6, rows * gapY + spokeSize) + 24;
  const cx = W / 2,
    cy = H / 2 - dp / 2;
  const yFor = (i, count) => cy - ((count - 1) / 2 - i) * gapY;
  const spoke = (item, i, side, count) => {
    const dir = side === 'left' ? -1 : 1;
    const x = cx + dir * (hw + reach);
    const y = yFor(i, count);
    const sx = cx + dir * hw * 0.75,
      sy = cy + hh * 0.4;
    const midX = cx + dir * (hw + reach * 0.45);
    return /*#__PURE__*/React.createElement("g", {
      key: `${side}${i}`
    }, /*#__PURE__*/React.createElement("path", {
      d: `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${y} L ${x - dir * sHw} ${y}`,
      fill: "none",
      stroke: item.color,
      strokeWidth: "1.2",
      strokeDasharray: "2 4",
      style: {
        animation: 'ihDash 1.6s linear infinite'
      }
    }), cubeAt(x, y - sHw * 0.5, sHw, item.color, undefined, item.tint !== false));
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    "data-depth": depth || undefined,
    style: {
      display: 'block',
      width: W,
      height: H,
      overflow: 'visible',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes ihDash{to{stroke-dashoffset:-24}}`), left.map((it, i) => spoke(it, i, 'left', left.length)), right.map((it, i) => spoke(it, i, 'right', right.length)), /*#__PURE__*/React.createElement("g", {
    "data-depth": "6"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`,
    style: {
      fill: `color-mix(in oklab, ${color} 14%, var(--surface-card))`,
      stroke: color,
      strokeWidth: 1.5
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${cx},${cy - hh * 0.55} ${cx + hw * 0.55},${cy} ${cx},${cy + hh * 0.55} ${cx - hw * 0.55},${cy}`,
    style: {
      fill: color
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${cx - hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + dp} ${cx - hw},${cy + dp}`,
    style: {
      fill: `color-mix(in oklab, ${color} 78%, black)`
    }
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${cx + hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + dp} ${cx + hw},${cy + dp}`,
    style: {
      fill: color
    }
  })));
}
Object.assign(__ds_scope, { IsoHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/IsoHub.jsx", error: String((e && e.message) || e) }); }

// components/iso/Leader.jsx
try { (() => {
/* Dotted leader line tying a chip to the part it measures. Points are px within the DiagramCanvas. */
function Leader({
  points = [],
  color = 'var(--ink-3)',
  width = 1.2,
  march = false,
  dot = true,
  style
}) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none',
      ...style
    }
  }, march && /*#__PURE__*/React.createElement("style", null, `@keyframes ldDash{to{stroke-dashoffset:-18}}`), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: width,
    strokeDasharray: "2 4",
    style: march ? {
      animation: 'ldDash 1.4s linear infinite'
    } : null
  }), dot && /*#__PURE__*/React.createElement("circle", {
    cx: points[0][0],
    cy: points[0][1],
    r: "2.5",
    fill: color
  }));
}
Object.assign(__ds_scope, { Leader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/Leader.jsx", error: String((e && e.message) || e) }); }

// components/iso/NodeBadge.jsx
try { (() => {
/* Circular badge pinned to a diagram element — a service, model, or actor mark. Plain type only, never a drawn logo. */
function NodeBadge({
  label,
  size = 46,
  color = 'var(--ink)',
  bg = 'var(--surface-card)',
  depth,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-depth": depth || undefined,
    style: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      border: `1.5px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.38,
      fontWeight: 600,
      color,
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { NodeBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/NodeBadge.jsx", error: String((e && e.message) || e) }); }

// components/iso/ScatterField.jsx
try { (() => {
function mulberry32(a) {
  return function () {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Ambient field behind an architecture figure: faint scattered glyph letters, dotted ticks,
   and ground-wash diamonds. Deterministic per seed. Decoration budget: one per figure. */
function ScatterField({
  glyphs = 'SBN',
  count = 22,
  seed = 7,
  color = 'var(--mix)',
  ticks = true,
  shadows = true,
  style
}) {
  const rnd = mulberry32(seed);
  const letters = Array.from({
    length: count
  }, () => ({
    ch: glyphs[Math.floor(rnd() * glyphs.length)],
    x: 3 + rnd() * 94,
    y: 4 + rnd() * 88,
    o: 0.35 + rnd() * 0.4
  }));
  const tickItems = ticks ? [{
    x: 2,
    y: 30
  }, {
    x: 88,
    y: 14
  }, {
    x: 90,
    y: 78
  }] : [];
  const diamonds = shadows ? [{
    x: 30,
    w: 180
  }, {
    x: 55,
    w: 260
  }, {
    x: 12,
    w: 120
  }] : [];
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      ...style
    }
  }, diamonds.map((d, i) => /*#__PURE__*/React.createElement("svg", {
    key: `d${i}`,
    viewBox: "0 0 100 50",
    style: {
      position: 'absolute',
      left: `${d.x}%`,
      bottom: 8 + i * 14,
      width: d.w,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "50,0 100,25 50,50 0,25",
    style: {
      fill: `color-mix(in oklab, ${color} 9%, transparent)`
    }
  }))), letters.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: `${l.x}%`,
      top: `${l.y}%`,
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: `color-mix(in oklab, ${color} 42%, var(--surface-diagram))`,
      opacity: l.o
    }
  }, l.ch)), tickItems.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: `t${i}`,
    style: {
      position: 'absolute',
      left: `${t.x}%`,
      top: `${t.y}%`,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: `color-mix(in oklab, ${color} 50%, var(--surface-diagram))`
    }
  }, "//----/")));
}
Object.assign(__ds_scope, { ScatterField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/iso/ScatterField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/demo/animations-v2.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// animations-v2.jsx — timeline animation engine with scene sequencing.
// Exports (on window): Stage, Sprite, TextSprite, ImageSprite, RectSprite,
//   VideoSprite, PlaybackBar, Easing, interpolate, animate, clamp,
//   useTime, useTimeline, useSprite, SceneStage, useScene.
//
// ALWAYS structure the piece as a scene sequence — even a single-scene
// piece is a one-entry list. Do NOT also load animations.jsx: v2 contains
// the whole engine (same globals; loading both means last-wins).
//   <x-import component-from-global-scope="MyPiece"
//             from="./animations-v2.jsx ./my-piece.jsx"></x-import>
//
// THE AUTHORING CONTRACT — this is what makes the host timeline's
// trim and speed gestures write back into YOUR file, so follow it
// exactly:
//   1. Declare the scene list as a JSON string literal in a plain inline
//      <script> of the main document (NOT type="text/babel", NOT a sibling
//      .jsx — only vanilla inline scripts are addressable for write-back):
//        <script>window.OM_SCENES = '[{"name":"Opening","dur":3},{"name":"Peak","dur":4.5}]';</script>
//   2. Pass the string through untouched: <SceneStage scenes={window.OM_SCENES} ...>
//   3. Map scene names to components via the children object.
//   IMPORTANT — the exportable-video contract: SceneStage/Stage OWNS it
//   (the data-om-exportable-video-with-duration-secs attribute, the
//   data-om-seek-to-time-frame listener, the svg/foreignObject wrapper,
//   and font inlining). NEVER put the exportable attribute on any other
//   element — wrapping the stage in a second "exportable root" makes the
//   host timeline and the video exporter bind to the wrong element, and
//   playback control / export silently break.
//   4. ALSO declare the playback setting the same way — this is what makes
//      the host timeline's Repeat control write back into your file:
//        <script>window.OM_PLAYBACK = '{"mode":"loop"}';</script>
//      and pass it through untouched: <SceneStage playback={window.OM_PLAYBACK} ...>
//      Values: '{"mode":"loop"}' (play forever, the default) or
//      '{"mode":"times","count":N}' (play N times, then hold the last
//      frame). Omitting it keeps loop behavior but leaves the host
//      control read-only for this document.
//
//   IMPORTANT — the exportable-video contract: SceneStage/Stage OWNS it
//   (the data-om-exportable-video-with-duration-secs attribute, the
//   data-om-seek-to-time-frame listener, the svg/foreignObject wrapper,
//   and font inlining). NEVER put the exportable attribute on any other
//   element — wrapping the stage in a second "exportable root" makes the
//   host timeline and the video exporter bind to the wrong element, and
//   playback control / export silently break.
//
//   <SceneStage width={1280} height={720} scenes={window.OM_SCENES}
//               bg="#0b0b0e">
//     {{ 'Opening': Opening, 'Peak': Peak }}
//   </SceneStage>
//
// SceneStage({width, height, scenes, bg, autoplay=true, loop=true,
//   transition='cut', children}) — wraps Stage. Scenes play in authored order; total
// duration is the sum of durs, kept in sync with the exportable attr
// automatically. The host timeline shows the scenes as blocks: dragging
// an edge retimes one scene, clicking a block opens rename/speed — and every
// edit lands in the JSON literal in source, then the composition reflows
// live (no reload) via the data-om-timeline-scenes-update event. (The
// time ruler above the blocks is a seek surface — click or drag scrubs;
// it never edits timing.)
//
// TIMING IS USER-EDITABLE (time-stretch): when the user changes a scene's
// length, the engine remaps your scene clock so the SAME choreography
// plays faster or slower — never cut off. That only works for motion
// driven by the scene clock, so inside a scene component ALWAYS animate
// from useScene()'s {localTime, progress} (never your own clock, never
// useTime directly).
//
// The same rule is what makes video export exact AND fast: the exporter
// seeks each frame with a synchronous commit and may serialize the stage
// the moment the seek event returns — anything painted from useEffect or
// your own requestAnimationFrame lags that commit and exports stale.
// Render everything visible from the scene clock's values and this is
// automatic. (Nested <VideoSprite> videos are handled by the exporter.)
//
// TRANSITIONS: scene boundaries are hard cuts by default
// (transition="cut") — exactly one scene is mounted at any time. Scene
// layers are keyed by scene index, so inactive scenes are fully unmounted
// (they do zero per-frame work) and a scene never leaks component state
// into a neighbor, even when two adjacent scenes use the same component.
//   transition="overlap" is opt-in and for OPAQUE scenes only: during
// playback the outgoing scene stays mounted beneath the incoming one for
// ~2 frames, frozen at the frame it had just rendered, so the moments
// where the incoming scene hasn't painted real content yet (an <img>
// still decoding, a <video> before its first frame) show the outgoing
// scene rather than a flash of stage background. It cannot fix content
// that paints WRONG — a video whose first frame paints black paints
// black over the underlay too. Only use it
// when every scene paints the full frame — a scene on a transparent stage
// background will show the previous scene through it (ghosting); keep
// "cut" for those. Paused seeks and video-export frame seeks
// (data-om-seek-to-time-frame) never overlap — a seeked frame always
// renders exactly one scene's state. Playback driven by the EDITOR's
// play bar counts as playback too: the host marks its play-loop seeks
// (detail.playing === true on the same seek event) and the engine reads
// the marked stream as continuous playback, so overlap may engage —
// including across the loop seam, matching self-driven playback — while
// unmarked seeks (scrubs, steps, export frames) keep the
// exactly-one-scene rule. A tick-sized forward step or drag
// WHILE PLAYING reads as playback and may briefly overlap (bounded, ~2
// frames). The loop wrap (last scene back to the first, when loop is on —
// the default) is a boundary like any other and overlaps too, so the
// frame-match contract below applies across the loop seam as well.
//
// THE FRAME-MATCH CONTRACT (this is what makes boundaries seamless, in
// BOTH modes): a scene's entry/exit effects must be 0 at progress 0 and
// at progress 1 — its first and last rendered frames are the settled
// composition, with entrances and exits choreographed strictly inside
// (0, 1). No entry-only squash/rotation/opacity: a scene whose frame at
// progress 0 is mid-squash, rotated, or transparent pops at every cut and
// ghosts under overlap.
//
// The provided sprites bake in entry/exit fades (entryDur/exitDur), so a
// sprite that spans a scene edge violates the contract by construction:
// set entryDur={0} on sprites alive at the scene's first frame and
// exitDur={0} on sprites alive at its last, or inset the sprite's span so
// its fades complete inside the scene. The flip side: a scene that exits
// to fully transparent shows NOTHING at its last frame, so "overlap"
// would hold an empty underlay — following the contract is what makes
// overlap worth turning on.
//
// Scene entries are independent component instances, even when two names
// map to the same component — state never carries across a boundary. For
// one continuous component spanning a retimable stretch (a <video> that
// must keep playing through), use a single scene entry with extra fields
// driving its phases, not two entries of the same component.
//
// Each scene entry may carry extra fields ({"name":"Peak","dur":4,
// "text":"ACME"}) — the active scene component receives the whole entry as
// `scene` plus {localTime, progress, dur, index, count}, and can call
// useScene() anywhere below. Scenes own their entrances/exits — ramp any
// effect up only AFTER progress 0 and settle it back to 0 BEFORE progress
// 1, per THE FRAME-MATCH CONTRACT above. The optional "nat" field is the engine's
// time-stretch anchor — the host timeline manages it; don't set it by
// hand.
/* END USAGE */

// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}

// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try {
          cssRules = ss.cssRules;
        } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => {
                if (!r.ok) throw 0;
                return r.text();
              });
              for (const ff of txt.match(/@font-face\s*{[^}]*}/g) || []) rules.push({
                css: ff,
                base: ss.href
              });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({
              css: r.cssText,
              base: ss.href || location.href
            });
          }
        }
      }
      const toDataURL = url => fetch(url).then(r => {
        if (!r.ok) throw 0;
        return r.blob();
      }).then(b => new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => res(url);
        fr.readAsDataURL(b);
      })).catch(() => url);
      const parts = await Promise.all(rules.map(async ({
        css,
        base
      }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css,
          m;
        while (m = re.exec(css)) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs;
          try {
            abs = new URL(u, base).href;
          } catch {
            continue;
          }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  // Parsed playback object ({mode:'loop'} | {mode:'times',count:N}) or
  // null. When present it overrides the legacy loop prop — SceneStage
  // passes the validated value from the OM_PLAYBACK authoring contract.
  playback = null,
  persistKey = 'animstage',
  children
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280;
  height = +height || 720;
  duration = +duration || 10;
  fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';
  const playTimes = playback && playback.mode === 'times' ? playback.count : null;
  const loopEff = playback ? playback.mode === 'loop' : loop;
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  // The external-playback latch: true while the HOST play bar is driving
  // time forward as genuine continuous playback (its play-loop seeks
  // carry detail.playing === true). The engine's own clock stays paused
  // the whole time — exactly one clock ever drives — so this is a
  // separate bit, not a second meaning for `playing`. Set and cleared
  // in the seek handler below; decays via SS_EXT_PLAY_MS when the
  // marked stream stops without a parting unmarked seek.
  const [extPlay, setExtPlay] = React.useState(false);
  const extPlayTimerRef = React.useRef(null);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Passes completed since playback last started. Lives in a ref so the
  // per-frame wrap can count without re-running this effect; reset on
  // every (re)start so a fresh play (or a host restart) gets the full
  // run count again.
  const passesRef = React.useRef(0);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    passesRef.current = 0;
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (playTimes !== null) {
            // Play N times then hold the last frame — the partial pass a
            // mid-timeline start produces counts as a pass, so the piece
            // never runs longer than N full durations.
            passesRef.current += 1;
            if (passesRef.current >= playTimes) {
              next = duration;
              setPlaying(false);
            } else {
              next = next % duration;
            }
          } else if (loopEff) {
            next = next % duration;
          } else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loopEff, playTimes]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol + the editor's play bar: hosts dispatch this
  // event per frame; pause + sync the playhead so the frame shows exactly
  // that timestamp. The host play bar marks its play-loop seeks with
  // detail.playing === true — the mark latches extPlay (playback is
  // playback even when a host clock drives it), while ANY unmarked seek
  // (scrub, step, export frame, the transport's pause park) clears the
  // latch in the same commit it retimes, so a seeked frame still renders
  // exactly one scene's state. The engine's own clock pauses either way.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    // Sync-seek capability: a dispatcher that marks its seek with
    // detail.sync === true gets the commit applied via ReactDOM.flushSync,
    // so the stage DOM reflects the seeked frame the moment dispatchEvent
    // returns. The video exporter keys off the data-om-sync-seek
    // advertisement to drop its two-display-refresh settle (that wait only
    // exists to let React's async commit land — serialization needs the
    // committed DOM, not the paint). Feature-detected: a runtime without
    // ReactDOM.flushSync never advertises and every seek takes the async
    // path. Unmarked seeks (scrubs, the host play bar) stay async — a
    // forced sync render per pointermove would tax the editor for no one.
    const canSyncSeek = typeof ReactDOM !== 'undefined' && typeof ReactDOM.flushSync === 'function';
    const onSeek = e => {
      const apply = () => {
        setPlaying(false);
        const hostPlay = !!(e.detail && e.detail.playing === true);
        if (extPlayTimerRef.current) {
          clearTimeout(extPlayTimerRef.current);
          extPlayTimerRef.current = null;
        }
        if (hostPlay) {
          // Watchdog: the latch is only as alive as its seek stream. If the
          // host stops without a parting seek (tab jank, bar unmount), the
          // latch decays on its own — and the expiry setState is itself the
          // render that lets SceneSwitch drop an open window, so expiry can
          // never strand a frozen two-layer frame.
          extPlayTimerRef.current = setTimeout(() => {
            extPlayTimerRef.current = null;
            setExtPlay(false);
          }, SS_EXT_PLAY_MS);
        }
        setExtPlay(hostPlay);
        setTime(clamp(e.detail.time, 0, duration));
      };
      // flushSync is safe here: a native DOM listener runs outside React's
      // lifecycle, and the exporter's dispatchEvent is synchronous, so the
      // commit lands in the same JS task — the engine's own rAF loop can
      // never interleave between seek and serialize.
      if (canSyncSeek && e.detail && e.detail.sync === true) {
        ReactDOM.flushSync(apply);
      } else {
        apply();
      }
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    if (canSyncSeek) el.setAttribute('data-om-sync-seek', 'true');
    return () => {
      el.removeEventListener('data-om-seek-to-time-frame', onSeek);
      el.removeAttribute('data-om-sync-seek');
      if (extPlayTimerRef.current) {
        clearTimeout(extPlayTimerRef.current);
        extPlayTimerRef.current = null;
      }
      // Drop the latch too: this cleanup runs on every duration change
      // (an agent edit can retime mid-host-play, no gesture involved) and
      // the new effect instance arms no watchdog — clearing only the
      // timer could strand extPlay true forever if the marked stream died
      // in the gap. Fail toward cut: the next marked seek re-latches.
      setExtPlay(false);
    };
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(
  // extPlaying is ADDITIVE: "time is advancing under an external
  // driver's continuous playback". `playing` keeps meaning the
  // engine's OWN clock — the hidden PlaybackBar glyph (and through it
  // the host's clock-reporter/adoption channel) reads that — and
  // SceneSwitch is the one consumer that widens to either.
  () => ({
    time: displayTime,
    duration,
    playing,
    extPlaying: extPlay,
    setTime,
    setPlaying
  }), [displayTime, duration, playing, extPlay]);
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      ref: stageRef,
      "data-om-starter": "animations-v2",
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      ref: canvasRef,
      width: width,
      height: height,
      "data-om-exportable-video-with-duration-secs": duration,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("foreignObject", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement("div", {
      xmlns: "http://www.w3.org/1999/xhtml",
      style: {
        width,
        height,
        background,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
      value: ctxValue
    }, children))))), /*#__PURE__*/React.createElement(PlaybackBar, {
      time: displayTime,
      actualTime: time,
      duration: duration,
      playing: playing,
      onPlayPause: () => setPlaying(p => !p),
      onReset: () => {
        setTime(0);
      },
      onSeek: t => setTime(t),
      onHover: t => setHoverTime(t)
    }))
  );
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    "data-omelette-chrome": true,
    style: {
      // Slimmed to visually match the host editor bar's basic row (the
      // single-scrubber look): transport first, tighter metrics, quieter
      // chrome. Shown only outside the app — the host bar suppresses this
      // whenever it is present.
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 12px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 6,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)), typeof VideoEncoder !== 'undefined' && /*#__PURE__*/React.createElement(IconButton, {
    title: "Export video",
    onClick: () => window.parent.postMessage({
      type: 'omelette:request-video-export'
    }, '*')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v7m0 0L4 6m3 3l3-3M2 12h10",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}

// ── VideoSprite ─────────────────────────────────────────────────────────────
// Renders a <video> that loops within [start,end] of its source at `speed`,
// kept in sync with the Stage's playhead. Carries the
// data-om-exportable-video-play-* attrs so video export can mix its audio.
//
//   <VideoSprite src="clip.mp4" start={2} end={5} speed={1}
//     style={{ width: 640, height: 360 }} />

function VideoSprite({
  src,
  start = 0,
  end,
  speed = 1,
  style,
  ...rest
}) {
  start = +start || 0;
  speed = +speed || 1;
  if (end != null) end = +end || undefined;
  const t = useTime();
  const ref = React.useRef(null);
  const span = Math.max(0.001, (end ?? start + 1) - start);
  React.useEffect(() => {
    const v = ref.current;
    if (!v || v.readyState < 1) return;
    const target = start + t * speed % span;
    if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target;
  }, [t, start, span, speed]);
  return /*#__PURE__*/React.createElement("video", _extends({
    ref: ref,
    src: src,
    muted: true,
    playsInline: true,
    preload: "auto",
    "data-om-exportable-video-play-start": start,
    "data-om-exportable-video-play-end": end ?? start + span,
    "data-om-exportable-video-play-speed": speed,
    style: {
      display: 'block',
      objectFit: 'cover',
      ...style
    }
  }, rest));
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  VideoSprite,
  Stage,
  PlaybackBar
});

// ── Scene sequencing ─────────────────────────────────────────────────────
// Guest-side validation of a scene list (the engine's own inputs: the
// authored prop, and host-dispatched updates). Mirrors the host parser's
// shape rules and constants — keep in sync with parseTimelineScenes in
// apps/web/src/shared/timeline.ts (16KB raw cap, 50 entries, dur finite in
// (0, 300]); returns null on any violation.
function ssParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 16 * 1024) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 50) return null;
  for (var i = 0; i < parsed.length; i++) {
    var s = parsed[i];
    if (typeof s !== 'object' || s === null) return null;
    if (typeof s.name !== 'string' || typeof s.dur !== 'number') return null;
    if (!isFinite(s.dur) || s.dur <= 0 || s.dur > 300) return null;
  }
  return parsed;
}

// Guest-side validation of the playback value — mirrors the host parser
// (shared/timeline.ts parseTimelinePlayback): {"mode":"loop"} or
// {"mode":"times","count":1..99}, strict all-or-nothing, null otherwise.
// Callers treat null as the loop default.
function ppParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 256) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
  var keys = Object.keys(parsed);
  if (parsed.mode === 'loop') return keys.length === 1 ? {
    mode: 'loop'
  } : null;
  if (parsed.mode === 'times') {
    if (keys.length !== 2) return null;
    var c = parsed.count;
    if (typeof c !== 'number' || c !== Math.floor(c) || c < 1 || c > 99) return null;
    return {
      mode: 'times',
      count: c
    };
  }
  return null;
}

// Stamps the playback attribute VERBATIM from the authored raw string (the
// host's write-back anchors on that exact value) and listens for the
// host's post-write update event. Same shape as SceneSync; only rendered
// when the document authors a playback literal — an absent contract means
// the attribute stays absent and the document plays its default.
function PlaybackSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-playback', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      if (ppParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-playback-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-playback-update', onEvent);
      root.removeAttribute('data-om-timeline-playback');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}
var SceneContext = React.createContext(null);
function useScene() {
  return React.useContext(SceneContext);
}

// Renders inside the Stage (so it can reach the exportable root via
// closest()): stamps the scenes attribute VERBATIM from the current raw
// string — the host's write-back anchors on that exact value — and listens
// for the host's post-write update event.
function SceneSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-scenes', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      // Ignore anything that doesn't validate — a bad update must not tear
      // down a working composition.
      if (ssParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-scenes-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-scenes-update', onEvent);
      root.removeAttribute('data-om-timeline-scenes');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}

// ── Scene transitions ────────────────────────────────────────────────────
// A boundary tick only counts as "natural playback" when the playhead
// advanced by at most this many seconds. The guard keeps scrubs and long
// jumps (which move time arbitrarily) from reading as playback, and it is
// deliberately loose: half a second admits playback down to 2fps, because
// a false negative silently disables overlap on exactly the heavy scenes
// it serves, while a false positive (a slow forward drag while playing)
// costs two cosmetic frames.
var SS_MAX_TICK = 0.5;
// How many engine ticks the outgoing scene stays mounted under
// transition="overlap": the boundary commit plus one more frame.
var SS_OVERLAP_TICKS = 2;
// Wall-clock ceiling on a window, backstopping the tick budget: ticks are
// only spent by renders, and a pinned clock (the PlaybackBar's hover
// preview holds displayTime still even while playing) stops producing
// them — without this ceiling, both layers could persist for as long as
// the mouse rests on the scrub track. 500ms keeps the tick budget intact
// for playback down to ~4fps; the nudge effect in SceneSwitch guarantees
// a render arrives to enforce it even when the clock is pinned.
var SS_OVERLAP_MAX_MS = 500;
// How long a marked (detail.playing === true) host seek keeps the
// external-playback latch alive with no successor. The host play bar's
// seek pump is one-in-flight/latest-wins, so its inter-seek gap is tens
// of milliseconds in the worst case — 400ms is far above that, and it
// sits below SS_OVERLAP_MAX_MS so a stream that dies mid-window decays
// the latch (and with it the window) no later than the window's own
// wall-clock ceiling would have closed it.
var SS_EXT_PLAY_MS = 400;

// True only for a boundary crossed by what reads as natural forward
// playback: the engine advancing one tick from scene i into scene i+1, or
// wrapping last→first under loop. Export seeks can never pass — the
// export protocol pauses before it retimes, and arming requires playing —
// and neither can paused scrubs or arrow-steps, host scene-edit events
// (dt === 0), or long jumps. A forward drag or arrow-step WHILE PLAYING
// that lands just past a boundary does pass — it is indistinguishable
// from a playback tick by design — and costs a bounded, cosmetic
// two-frame window.
function ssNaturalAdvance(last, idx, t, count, total, playing, loopOn) {
  if (!playing || count < 2) return false;
  if (idx === last.idx + 1) {
    var dt = t - last.t;
    return dt > 0 && dt <= SS_MAX_TICK;
  }
  if (last.idx === count - 1 && idx === 0 && loopOn && t > 0) {
    // Without loop the engine never wraps (it clamps and pauses at the
    // end), so a wrap-shaped pair can only be a user gesture — a cut. And
    // the transport's reset gestures (return-to-start, Home, '0') land on
    // exactly t = 0 without pausing, while a genuine modulo wrap is almost
    // surely fractional — t > 0 rejects resets, and the cheap failure mode
    // is one skipped cosmetic overlap at the seam.
    var dtWrap = t + total - last.t;
    // Two layered defenses against a fake wrap after a mid-play trim
    // shrinks the total. When the wrap happens on the rAF loop's dt=0
    // re-priming tick (the engine path), t is exactly last.t % total, so
    // dtWrap is exactly 0 in IEEE arithmetic and the > 0 test rejects it.
    // When the clock is PINNED instead (the PlaybackBar hover preview sets
    // the displayed time directly, no re-priming tick), dtWrap can land
    // positive while t sits deep inside scene 0 — the t <= one-tick guard
    // is what rejects that path.
    return dtWrap > 0 && dtWrap <= SS_MAX_TICK && t <= SS_MAX_TICK;
  }
  return false;
}

// A scene's inner tree: the scene component under its two context
// providers. The nested TimelineContext.Provider exists in EVERY layer,
// not just frozen ones, for two reasons. Context propagation bypasses
// React's identical-element bailout, so a frozen layer needs a provider
// whose value has stopped changing — without one, Sprite/VideoSprite
// inside the frozen scene would keep reading the live clock through the
// outer provider, see time run past their spans, and blank out (or
// re-seek a video) mid-overlap. And the tree at a layer's keyed position
// must never change shape between roles: a current→previous type change
// would remount the subtree, the very thing the scene key exists to
// prevent. For the current layer the provider re-provides the live value
// unchanged, which is invisible to consumers.
function ssSceneInner(scenes, idx, wallTime, total, map, timelineValue) {
  var scene = scenes[idx];
  // TIME-STRETCH: when the entry carries "nat" (its natural/authored
  // duration — the host timeline stamps it on the first trim), the user's
  // dur edits retime the choreography rather than cutting it: localTime
  // runs 0..nat over dur wall-seconds, so compressing a scene plays the
  // SAME motion faster and stretching slows it. progress is unchanged
  // either way (localTime/nat === wallTime/dur). No nat → factor 1.
  var nat = typeof scene.nat === 'number' && isFinite(scene.nat) && scene.nat > 0 ? scene.nat : scene.dur;
  var stretch = scene.dur > 0 ? nat / scene.dur : 1;
  var localTime = wallTime * stretch;
  var ctx = {
    scene: scene,
    localTime: localTime,
    progress: nat > 0 ? localTime / nat : 0,
    dur: nat,
    index: idx,
    count: scenes.length,
    total: total
  };
  // Own-property lookup: a scene named "constructor" or "toString" must hit
  // the unmapped-scene diagnostic, not a prototype-chain member.
  var Comp = Object.prototype.hasOwnProperty.call(map, scene.name) ? map[scene.name] : null;
  return /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: timelineValue
  }, /*#__PURE__*/React.createElement(SceneContext.Provider, {
    value: ctx
  }, Comp ? /*#__PURE__*/React.createElement(Comp, ctx) :
  /*#__PURE__*/
  // An unmapped name renders a quiet diagnostic instead of a dead
  // frame — the mismatch is an authoring bug worth seeing.
  React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.25)',
      font: '500 18px Inter, system-ui, sans-serif'
    }
  }, "unmapped scene: ", scene.name)));
}

// One scene layer: the positioned wrapper that gives a scene its stable
// keyed identity (the scene's index in the authored list) and its role
// styling. The SAME entry keeps its DOM when its role changes (current →
// previous under "overlap" — no unmount/remount, so CSS transitions and
// <video>/<canvas> state survive), while DIFFERENT entries never share
// DOM, even when two adjacent scenes map to the same component type.
// zIndex is set only while an overlap window is active (frozen beneath,
// current above); outside a window the wrapper adds no stacking context.
function ssSceneLayer(idx, z, frozen, inner) {
  return /*#__PURE__*/React.createElement("div", {
    key: idx,
    "data-om-scene-layer": idx,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: z,
      pointerEvents: frozen ? 'none' : undefined
    }
  }, inner);
}

// The active-scene selector. Lives INSIDE Stage so useTime sees the
// timeline context. Renders the current scene's layer — plus, under
// transition="overlap" and only across a naturally-played boundary, the
// outgoing scene's layer beneath it for SS_OVERLAP_TICKS engine ticks.
// The outgoing scene is frozen EXACTLY as last rendered: its stored inner
// element is reused by reference, so the underlay is the frame that was
// just on screen (no synthesized end state), React bails out of the
// identical element (the inactive scene does zero per-frame work), and
// its clock — both contexts — stays pinned at the pre-boundary values.
// The scene's own internal state updates still render: the clock is
// frozen, the subtree isn't dead.
function SceneSwitch(props) {
  var scenes = props.scenes;
  var map = props.map || {};
  var overlapMode = props.transition === 'overlap';
  var timeline = useTimeline();
  var t = timeline.time;
  // Playback is playback whichever clock drives it: the engine's own rAF
  // loop (timeline.playing) or the host play bar's marked seek stream
  // (timeline.extPlaying). Nothing that must stay a cut sets either bit —
  // scrubs, steps, and export frames arrive without the playing mark (an
  // export seek may carry detail.sync, which changes WHEN the commit
  // happens, not what it commits), and clear extPlaying in the same
  // commit they retime — so the window invariant's "a paused render is a
  // SEEK frame" reading is unchanged.
  var playing = timeline.playing || timeline.extPlaying === true;
  var starts = [0];
  for (var i = 0; i < scenes.length; i++) starts.push(starts[i] + scenes[i].dur);
  var total = starts[starts.length - 1];
  // The playhead's scene; the t === total edge (export's last frame, a
  // scrub parked at the end) belongs to the last scene, not to nothing.
  var idx = scenes.length - 1;
  for (var j = 0; j < scenes.length; j++) {
    if (t < starts[j + 1]) {
      idx = j;
      break;
    }
  }
  var wallTime = Math.min(Math.max(t - starts[idx], 0), scenes[idx].dur);
  var inner = ssSceneInner(scenes, idx, wallTime, total, map, timeline);

  // Overlap bookkeeping. It lives in refs and mutates during render, which
  // is safe here because the mutating branches are gated on (t, idx)
  // differing from the previous render's values — a double-invoked render
  // re-runs them as a no-op. (A discarded concurrent render could advance
  // the refs for a frame that never commits; this engine drives time with
  // urgent setState from rAF, so renders aren't interleaved — and the
  // worst case is an overlap window skipped or cut short, never a wrong
  // seeked frame.)
  var lastRef = React.useRef(null); // {idx, t, inner} as of the previous render
  var overlayRef = React.useRef(null); // the active window; invariant below

  // THE OVERLAP WINDOW INVARIANT. A window may exist only while ALL hold:
  //   1. the transition mode is 'overlap';
  //   2. this render is playing — a paused render is a SEEK frame (the
  //      export protocol pauses in the same commit as it retimes), and a
  //      seeked frame must show exactly one scene's state;
  //   3. the current scene is still the one the window opened into
  //      (idx === toIdx);
  //   4. the scenes array is the same object the window opened under (a
  //      host scene edit mid-window invalidates the frozen layer);
  //   5. fewer than SS_OVERLAP_TICKS distinct engine ticks have rendered
  //      since the boundary.
  // The clause below drops the window the moment ANY of these fails, and
  // dropping is terminal: a new window takes a new natural boundary.
  if (overlapMode && lastRef.current) {
    var last = lastRef.current;
    if (last.idx !== idx) {
      // Boundary crossed since the previous render: open a window only for
      // a natural advance, freezing the outgoing scene's last-rendered
      // tree. Anything else (seek, jump, edit) is a cut and clears any
      // window already open.
      overlayRef.current = ssNaturalAdvance(last, idx, t, scenes.length, total, playing, props.loop === true) ? {
        fromIdx: last.idx,
        toIdx: idx,
        scenes: scenes,
        ticks: 0,
        bornAt: Date.now(),
        inner: last.inner
      } : null;
    } else if (overlayRef.current && last.t !== t) {
      overlayRef.current.ticks += 1;
    }
  }
  var ov = overlayRef.current;
  if (ov && (!overlapMode || !playing || idx !== ov.toIdx || scenes !== ov.scenes || ov.ticks >= SS_OVERLAP_TICKS || Date.now() - ov.bornAt > SS_OVERLAP_MAX_MS)) {
    overlayRef.current = ov = null;
  }
  lastRef.current = {
    idx: idx,
    t: t,
    inner: inner
  };

  // The nudge: while a window exists, guarantee a future render so the
  // checks above get a chance to run even if the clock pins (see
  // SS_OVERLAP_MAX_MS). On the normal path the window dies of its tick
  // budget first and the armed timeout is cleaned up without firing.
  var nudgeState = React.useState(0);
  var setNudge = nudgeState[1];
  React.useEffect(function () {
    if (!overlayRef.current) return undefined;
    var id = setTimeout(function () {
      setNudge(function (n) {
        return n + 1;
      });
    }, SS_OVERLAP_MAX_MS + 17);
    return function () {
      clearTimeout(id);
    };
  });
  if (!ov) return [ssSceneLayer(idx, undefined, false, inner)];
  return [ssSceneLayer(ov.fromIdx, 0, true, ov.inner), ssSceneLayer(idx, 1, false, inner)];
}
function SceneStage(props) {
  var width = +props.width || 1280;
  var height = +props.height || 720;
  var bg = props.bg || '#0b0b0e';
  var autoplay = props.autoplay == null ? true : String(props.autoplay) !== 'false';
  var loop = props.loop == null ? true : String(props.loop) !== 'false';
  // Anything other than the exact string 'overlap' means the default 'cut'
  // — a typo must degrade to today's behavior, never to a new one.
  var transition = props.transition === 'overlap' ? 'overlap' : 'cut';
  // The raw string is state: a host write (trim, speed, rename) arrives as
  // the scenes-update event and re-renders the whole composition from the
  // new value — durations AND the Stage duration — without a reload.
  var state = React.useState(props.scenes);
  var raw = state[0];
  var setRaw = state[1];
  var scenes = React.useMemo(function () {
    return ssParse(raw);
  }, [raw]);
  // Playback raw string is state for the same reason the scenes raw is:
  // a host write arrives as the update event and re-renders the engine
  // with the new mode, no reload. Invalid or absent degrades to the
  // legacy loop prop.
  var pstate = React.useState(props.playback);
  var praw = pstate[0];
  var setPraw = pstate[1];
  var pb = React.useMemo(function () {
    return ppParse(praw);
  }, [praw]);
  if (!scenes) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0e',
        color: '#c96442',
        font: '500 16px Inter, system-ui, sans-serif',
        textAlign: 'center'
      }
    }, "animations-v2: the scenes prop isn't a valid JSON scene list", /*#__PURE__*/React.createElement("br", null), "(expected '[", '{', "\"name\":\"\u2026\",\"dur\":N", '}', ", \u2026]')");
  }
  var total = 0;
  for (var i = 0; i < scenes.length; i++) total += scenes[i].dur;
  total = Math.round(total * 1000) / 1000;
  // The loop-seam behavior (SceneSwitch's wrap overlap) follows the
  // EFFECTIVE mode: a run-N composition doesn't wrap on its final pass,
  // but its intermediate wraps cross the seam like any loop.
  var loopEff = pb ? pb.mode !== 'times' || pb.count > 1 : loop;
  var inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SceneSync, {
    raw: raw,
    onUpdate: setRaw
  }), typeof praw === 'string' && praw !== '' && /*#__PURE__*/React.createElement(PlaybackSync, {
    raw: praw,
    onUpdate: setPraw
  }), /*#__PURE__*/React.createElement(SceneSwitch, {
    scenes: scenes,
    map: props.children,
    transition: transition,
    loop: loopEff
  }));
  return /*#__PURE__*/React.createElement(Stage, {
    width: width,
    height: height,
    duration: total,
    background: bg,
    autoplay: autoplay,
    loop: loop,
    playback: pb
  }, inner);
}
Object.assign(window, {
  SceneStage,
  useScene
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/demo/animations-v2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/demo/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/demo/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArchBox = __ds_scope.ArchBox;

__ds_ns.ArchGroup = __ds_scope.ArchGroup;

__ds_ns.Edge = __ds_scope.Edge;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DotGrid = __ds_scope.DotGrid;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.RadarChart = __ds_scope.RadarChart;

__ds_ns.RevealBar = __ds_scope.RevealBar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.NoteLink = __ds_scope.NoteLink;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.DiagramCanvas = __ds_scope.DiagramCanvas;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.IsoStack = __ds_scope.IsoStack;

__ds_ns.MetricChip = __ds_scope.MetricChip;

__ds_ns.FlowDiagram = __ds_scope.FlowDiagram;

__ds_ns.IsoCluster = __ds_scope.IsoCluster;

__ds_ns.IsoCube = __ds_scope.IsoCube;

__ds_ns.IsoCylinder = __ds_scope.IsoCylinder;

__ds_ns.IsoGlyph = __ds_scope.IsoGlyph;

__ds_ns.IsoHub = __ds_scope.IsoHub;

__ds_ns.Leader = __ds_scope.Leader;

__ds_ns.NodeBadge = __ds_scope.NodeBadge;

__ds_ns.ScatterField = __ds_scope.ScatterField;

})();
