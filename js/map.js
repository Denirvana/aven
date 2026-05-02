/* ============================================================
   AVEN — js/map.js
   Requiert data/map-config.js chargé avant.
   ============================================================ */

(function() {
  'use strict';

  function goTo(url) { window.location.href = url; }

  /* ── Polygones SVG cliquables ── */
  var mapInner = document.getElementById('map-inner');
  if (mapInner && typeof CONTINENT_POLYGONS !== 'undefined') {
    var style = '<style>'
      + '.ca{fill:rgba(255,255,255,0);stroke:rgba(255,255,255,.2);stroke-width:2;cursor:pointer;transition:fill .3s,stroke .3s;}'
      + '.ca-caldris:hover{fill:rgba(50,220,50,.3);stroke:rgba(100,255,100,.7);}'
      + '.ca-bilguel:hover{fill:rgba(220,200,0,.3);stroke:rgba(255,235,50,.7);}'
      + '.ca-tetsuo:hover{fill:rgba(140,20,220,.3);stroke:rgba(190,80,255,.7);}'
      + '.ca-cont4:hover{fill:rgba(20,80,220,.3);stroke:rgba(80,140,255,.7);}'
      + '.ca-cont5:hover{fill:rgba(0,200,220,.3);stroke:rgba(60,240,255,.7);}'
      + '.ca-cont6:hover{fill:rgba(220,130,200,.3);stroke:rgba(255,180,240,.7);}'
      + '.cl{font-family:Raleway,sans-serif;font-size:13px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;fill:rgba(255,255,255,.85);text-anchor:middle;pointer-events:none;paint-order:stroke fill;stroke:rgba(0,0,0,.6);stroke-width:3;stroke-linejoin:round;}'
      + '</style>';

    var paths = '';
    CONTINENT_POLYGONS.forEach(function(c) {
      paths += '<g><polygon class="ca ca-' + c.id + '" points="' + c.pts + '" onclick="window.location.href=\'' + c.file + '\'"/>'
        + '<text class="cl" x="' + c.lx + '" y="' + c.ly + '">' + c.name + '</text></g>';
    });

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1000 651');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    svg.innerHTML = style + '<g pointer-events="all">' + paths + '</g>';
    mapInner.appendChild(svg);
  }

  /* ── Pins ── */
  var pinsContainer = document.getElementById('pins-container');
  if (pinsContainer && typeof PIN_CONFIG !== 'undefined') {
    PIN_CONFIG.forEach(function(pin) {
      var s = (PIN_STYLES && PIN_STYLES[pin.style]) || PIN_STYLES.default;
      var el = document.createElement('div');
      el.className = 'map-pin';
      el.style.cssText = 'position:absolute;left:' + pin.left + ';top:' + pin.top + ';transform:translate(-50%,-100%);cursor:pointer;z-index:10;';
      el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,.7));transition:transform .2s;">'
        + '<div style="font-family:Raleway,sans-serif;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:' + s.label + ';background:rgba(4,4,16,.8);border:.5px solid ' + s.lborder + ';padding:4px 9px;border-radius:4px;white-space:nowrap;margin-bottom:4px;">' + pin.label + '</div>'
        + '<div style="width:1.5px;height:12px;background:' + s.dot + ';opacity:.5;"></div>'
        + '<div style="width:11px;height:11px;border-radius:50%;background:' + s.dot + ';border:2px solid ' + s.border + ';box-shadow:0 0 10px ' + s.shadow + ';"></div>'
        + '</div>';
      el.addEventListener('click', function() { goTo(pin.href); });
      pinsContainer.appendChild(el);
    });
  }

  /* ── Zoom + Pan ── */
  var mapWrap  = document.getElementById('map-wrap');
  var mapInner2 = document.getElementById('map-inner');
  if (!mapWrap || !mapInner2) return;

  var scale = 1, panX = 0, panY = 0;
  var MIN = 0.85, MAX = 5;
  var dragging = false, startX = 0, startY = 0, startPX = 0, startPY = 0;

  function applyTransform(smooth) {
    mapInner2.style.transition = smooth ? 'transform .35s cubic-bezier(.22,1,.36,1)' : 'none';
    mapInner2.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + scale + ')';
  }

  function clamp() {
    var W = mapWrap.offsetWidth, H = mapWrap.offsetHeight;
    panX = Math.min(W * 0.25, Math.max(panX, W - W * scale - W * 0.25));
    panY = Math.min(H * 0.25, Math.max(panY, H - H * scale - H * 0.25));
  }

  function zoomAt(cx, cy, factor) {
    var ns = Math.min(MAX, Math.max(MIN, scale * factor));
    var r = ns / scale;
    panX = cx - (cx - panX) * r;
    panY = cy - (cy - panY) * r;
    scale = ns;
    clamp();
    applyTransform(true);
  }

  mapWrap.addEventListener('wheel', function(e) {
    e.preventDefault();
    var r = mapWrap.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.15 : 1 / 1.15);
  }, { passive: false });

  mapWrap.addEventListener('mousedown', function(e) {
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    startPX = panX; startPY = panY;
    mapWrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    panX = startPX + (e.clientX - startX);
    panY = startPY + (e.clientY - startY);
    clamp();
    applyTransform(false);
  });

  window.addEventListener('mouseup', function() {
    dragging = false;
    mapWrap.style.cursor = 'grab';
  });

  var lastDist = 0;
  mapWrap.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      dragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      startPX = panX; startPY = panY;
    } else if (e.touches.length === 2) {
      dragging = false;
      lastDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });

  mapWrap.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (e.touches.length === 1 && dragging) {
      panX = startPX + (e.touches[0].clientX - startX);
      panY = startPY + (e.touches[0].clientY - startY);
      clamp(); applyTransform(false);
    } else if (e.touches.length === 2) {
      var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      var r = mapWrap.getBoundingClientRect();
      var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
      var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
      zoomAt(cx, cy, d / lastDist);
      lastDist = d;
    }
  }, { passive: false });

  mapWrap.addEventListener('touchend', function() { dragging = false; });

  var W = function() { return mapWrap.offsetWidth; };
  var H = function() { return mapWrap.offsetHeight; };

  var zi = document.getElementById('zoom-in');
  var zo = document.getElementById('zoom-out');
  var zr = document.getElementById('zoom-reset');

  if (zi) zi.addEventListener('click', function() { zoomAt(W()/2, H()/2, 1.3); });
  if (zo) zo.addEventListener('click', function() { zoomAt(W()/2, H()/2, 1/1.3); });
  if (zr) zr.addEventListener('click', function() { scale=1; panX=0; panY=0; applyTransform(true); });

})();
