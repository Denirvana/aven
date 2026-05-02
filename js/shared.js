/* ============================================================
   AVEN — js/shared.js
   Chargé sur toutes les pages. Requiert data/tracks.js avant.
   ============================================================ */

(function() {
  'use strict';

  /* ── Hamburger ── */
  var nav = document.querySelector('nav');
  if (nav) {
    var links = [];
    Array.from(nav.children).forEach(function(el) {
      if (el.tagName === 'A') links.push(el);
    });

    var wrapper = document.createElement('div');
    wrapper.className = 'nav-links';
    links.forEach(function(a) { wrapper.appendChild(a); });
    nav.insertBefore(wrapper, nav.firstChild);

    /* Lien actif */
    var page = location.pathname.split('/').pop() || 'index.html';
    wrapper.querySelectorAll('a').forEach(function(a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* Hamburger button */
    var ham = document.createElement('div');
    ham.className = 'nav-hamburger';
    ham.innerHTML = '<div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>';
    nav.appendChild(ham);

    ham.addEventListener('click', function() {
      ham.classList.toggle('open');
      wrapper.classList.toggle('open');
    });

    wrapper.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        ham.classList.remove('open');
        wrapper.classList.remove('open');
      });
    });
  }

  /* ── SVG Filtres aberration chromatique ── */
  var defs = document.createElement('div');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  defs.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><defs>'
    + '<filter id="ca-red" color-interpolation-filters="sRGB">'
    + '<feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter>'
    + '<filter id="ca-blue" color-interpolation-filters="sRGB">'
    + '<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>'
    + '</defs></svg>';
  document.body.insertBefore(defs, document.body.firstChild);

  /* ── Vinyl Player ── */
  var player     = document.getElementById('player');
  var vinyl      = document.getElementById('vinyl');
  var vinylSvg   = document.getElementById('vinyl-svg');
  var coverImg   = document.getElementById('cover-img');
  var trackLabel = document.getElementById('track-label');
  var trackList  = document.getElementById('track-list');
  var dropdown   = document.getElementById('dropdown');
  var chevronBtn = document.getElementById('chevron-btn');
  var iPlay      = document.getElementById('i-play');
  var iPause     = document.getElementById('i-pause');
  var vinylPopup = document.getElementById('vinyl-popup');

  if (!player || !vinyl) return;

  var currentIdx = -1;
  var isPlaying  = false;
  var ddOpen     = false;

  /* Build tracklist dropdown */
  if (typeof TRACKS !== 'undefined') {
    TRACKS.forEach(function(t, i) {
      var el = document.createElement('div');
      el.className = 'track-item';
      el.innerHTML = '<div class="track-thumb"><img src="' + t.cover + '" alt=""></div>'
        + '<div class="track-meta"><div class="track-title">' + t.title + '</div></div>'
        + '<div class="playing-dot"></div>';
      el.addEventListener('click', function() { selectTrack(i); });
      trackList.appendChild(el);
    });
  }

  /* Popup invitation */
  var popupTimer = setTimeout(function() {
    if (currentIdx === -1 && vinylPopup) vinylPopup.classList.add('visible');
  }, 2500);

  function hidePopup() {
    if (vinylPopup) vinylPopup.classList.remove('visible');
    clearTimeout(popupTimer);
  }

  function selectTrack(idx) {
    hidePopup();
    if (typeof TRACKS === 'undefined') return;
    currentIdx = idx;
    var t = TRACKS[idx];
    if (vinylSvg) vinylSvg.style.display = 'none';
    if (coverImg) { coverImg.src = t.cover; coverImg.style.display = 'block'; }
    if (trackLabel) { trackLabel.textContent = t.title; trackLabel.classList.add('on'); }

    if (t.src) {
      player.src = t.src;
      player.play().then(function() { setState(true); }).catch(function() { setState(true); });
    } else {
      setState(true);
    }

    document.querySelectorAll('.track-item').forEach(function(el, i) {
      el.classList.toggle('active', i === idx);
    });
    closeDropdown();
  }

  function setState(on) {
    isPlaying = on;
    vinyl.classList.toggle('spinning', on);
    if (iPlay)  iPlay.style.display  = on ? 'none'  : 'block';
    if (iPause) iPause.style.display = on ? 'block' : 'none';
  }

  vinyl.addEventListener('click', function() {
    if (currentIdx === -1) { toggleDropdown(); return; }
    if (isPlaying) {
      if (TRACKS[currentIdx].src) player.pause();
      setState(false);
    } else {
      if (TRACKS[currentIdx].src) player.play().catch(function(){});
      setState(true);
    }
  });

  player.addEventListener('ended', function() {
    if (typeof TRACKS === 'undefined') return;
    if (TRACKS.length === 1) {
      player.currentTime = 0;
      player.play().catch(function(){});
    } else {
      selectTrack((currentIdx + 1) % TRACKS.length);
    }
  });

  function openDropdown()  { ddOpen = true;  if(dropdown) dropdown.classList.add('open');    if(chevronBtn) chevronBtn.classList.add('open');    hidePopup(); }
  function closeDropdown() { ddOpen = false; if(dropdown) dropdown.classList.remove('open'); if(chevronBtn) chevronBtn.classList.remove('open'); }
  function toggleDropdown() { if (ddOpen) closeDropdown(); else openDropdown(); }

  if (chevronBtn) {
    chevronBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleDropdown(); });
  }

  document.addEventListener('click', function(e) {
    if (ddOpen && dropdown && !dropdown.contains(e.target) && chevronBtn && !chevronBtn.contains(e.target)) {
      closeDropdown();
    }
  });

  /* Restaurer état depuis sessionStorage */
  try {
    var saved = JSON.parse(sessionStorage.getItem('aven-player') || 'null');
    if (saved && typeof TRACKS !== 'undefined' && saved.idx >= 0 && saved.idx < TRACKS.length) {
      var t = TRACKS[saved.idx];
      currentIdx = saved.idx;
      if (vinylSvg) vinylSvg.style.display = 'none';
      if (coverImg) { coverImg.src = t.cover; coverImg.style.display = 'block'; }
      if (trackLabel) { trackLabel.textContent = t.title; trackLabel.classList.add('on'); }
      document.querySelectorAll('.track-item').forEach(function(el, i) {
        el.classList.toggle('active', i === saved.idx);
      });
      if (t.src && saved.playing) {
        player.src = t.src;
        if (saved.time) player.currentTime = saved.time;
        player.play().then(function() { setState(true); }).catch(function() { setState(!!saved.playing); });
      } else {
        setState(!!saved.playing);
      }
    }
  } catch(e) {}

  /* Sauvegarder avant navigation */
  window.addEventListener('beforeunload', function() {
    if (currentIdx >= 0 && typeof TRACKS !== 'undefined') {
      sessionStorage.setItem('aven-player', JSON.stringify({
        idx: currentIdx,
        playing: isPlaying,
        time: TRACKS[currentIdx].src ? player.currentTime : 0
      }));
    }
  });

})();
