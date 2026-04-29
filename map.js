/* ════════════════════════════════════════════════════════════════════════════
   AVEN — js/map.js
   Carte interactive : zoom, pan, pins, polygones cliquables.
   Requiert data/map-config.js chargé avant.
   ════════════════════════════════════════════════════════════════════════════ */

/* ── Navigation avec sauvegarde audio ── */
function goTo(url) {
  /* La sauvegarde audio est gérée par beforeunload dans shared.js */
  window.location.href = url;
}

/* ── Build SVG overlay (polygones cliquables par-dessus la carte) ── */
(function buildSvgOverlay() {
  const style = `<style>
    .ca{fill:rgba(255,255,255,0);stroke:rgba(255,255,255,.22);stroke-width:2;cursor:pointer;transition:fill .3s,stroke .3s;}
    .ca-caldris:hover{fill:rgba(50,220,50,.32);stroke:rgba(100,255,100,.7);}
    .ca-bilguel:hover{fill:rgba(220,200,0,.32);stroke:rgba(255,235,50,.7);}
    .ca-tetsuo:hover{fill:rgba(140,20,220,.32);stroke:rgba(190,80,255,.7);}
    .ca-cont4:hover{fill:rgba(20,80,220,.32);stroke:rgba(80,140,255,.7);}
    .ca-cont5:hover{fill:rgba(0,200,220,.32);stroke:rgba(60,240,255,.7);}
    .ca-cont6:hover{fill:rgba(220,130,200,.32);stroke:rgba(255,180,240,.7);}
    .cl{font-family:'Raleway',sans-serif;font-size:13px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;
        fill:rgba(255,255,255,.85);text-anchor:middle;pointer-events:none;
        paint-order:stroke fill;stroke:rgba(0,0,0,.65);stroke-width:3.5;stroke-linejoin:round;}
  </style>`;

  const paths = CONTINENT_POLYGONS.map(c => `
    <g>
      <polygon class="ca ca-${c.id}" points="${c.pts}" onclick="goTo('${c.file}')"/>
      <text class="cl" x="${c.label_x}" y="${c.label_y}">${c.name}</text>
    </g>`).join('');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'map-overlay');
  svg.setAttribute('viewBox', '0 0 1000 651');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  svg.innerHTML = style + `<g pointer-events="all">${paths}</g>`;

  const inner = document.getElementById('map-inner');
  if (inner) inner.appendChild(svg);
})();

/* ── Build pins depuis PIN_CONFIG ── */
(function buildPins() {
  const container = document.getElementById('pins-container');
  if (!container) return;
  PIN_CONFIG.forEach(pin => {
    const s = PIN_STYLES[pin.style] || PIN_STYLES.default;
    const el = document.createElement('div');
    el.className = 'map-pin';
    el.style.cssText = `left:${pin.left};top:${pin.top};`;
    el.innerHTML = `
      <div class="pin-body">
        <div class="pin-label" style="border-color:${s.lborder};color:${s.label};">${pin.label}</div>
        <div class="pin-line" style="background:${s.dot};opacity:.5;"></div>
        <div class="pin-dot" style="background:${s.dot};border-color:${s.border};box-shadow:0 0 10px ${s.shadow};"></div>
      </div>`;
    el.addEventListener('click', () => goTo(pin.href));
    container.appendChild(el);
  });
})();

/* ── Zoom + Pan ── */
(function initMap() {
  const mapWrap  = document.getElementById('map-wrap');
  const mapInner = document.getElementById('map-inner');
  if (!mapWrap || !mapInner) return;

  const MIN = 0.85, MAX = 5;
  let scale = 1, panX = 0, panY = 0;
  let dragging = false, startX = 0, startY = 0, startPX = 0, startPY = 0;

  function apply(smooth = false) {
    mapInner.style.transition = smooth ? 'transform .35s cubic-bezier(.22,1,.36,1)' : 'none';
    mapInner.style.transform  = `translate(${panX}px,${panY}px) scale(${scale})`;
  }

  function clamp() {
    const W = mapWrap.offsetWidth, H = mapWrap.offsetHeight;
    panX = Math.min(W * .25,  Math.max(panX, W  - W * scale  - W * .25));
    panY = Math.min(H * .25,  Math.max(panY, H  - H * scale  - H * .25));
  }

  function zoomAt(cx, cy, factor) {
    const ns = Math.min(MAX, Math.max(MIN, scale * factor));
    const r  = ns / scale;
    panX = cx - (cx - panX) * r;
    panY = cy - (cy - panY) * r;
    scale = ns; clamp(); apply(true);
  }

  /* Wheel */
  mapWrap.addEventListener('wheel', e => {
    e.preventDefault();
    const r = mapWrap.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.15 : 1 / 1.15);
  }, { passive: false });

  /* Mouse drag */
  mapWrap.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX; startY = e.clientY; startPX = panX; startPY = panY;
    mapWrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    panX = startPX + (e.clientX - startX);
    panY = startPY + (e.clientY - startY);
    clamp(); apply();
  });
  window.addEventListener('mouseup', () => { dragging = false; mapWrap.style.cursor = 'grab'; });

  /* Touch */
  let lastDist = 0;
  mapWrap.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      dragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      startPX = panX; startPY = panY;
    } else if (e.touches.length === 2) {
      dragging = false;
      lastDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });
  mapWrap.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging) {
      panX = startPX + (e.touches[0].clientX - startX);
      panY = startPY + (e.touches[0].clientY - startY);
      clamp(); apply();
    } else if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const r = mapWrap.getBoundingClientRect();
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
      zoomAt(cx, cy, d / lastDist); lastDist = d;
    }
  }, { passive: false });
  mapWrap.addEventListener('touchend', () => { dragging = false; });

  /* Boutons */
  const W = () => mapWrap.offsetWidth, H = () => mapWrap.offsetHeight;
  document.getElementById('zoom-in')   ?.addEventListener('click', () => zoomAt(W()/2, H()/2, 1.3));
  document.getElementById('zoom-out')  ?.addEventListener('click', () => zoomAt(W()/2, H()/2, 1/1.3));
  document.getElementById('zoom-reset')?.addEventListener('click', () => { scale=1; panX=0; panY=0; apply(true); });
})();
