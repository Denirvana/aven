/* ════════════════════════════════════════════════════════════════════════════
   AVEN — js/shared.js
   Logique commune à toutes les pages :
   · Vinyl player (lecture, dropdown, sessionStorage)
   · Navbar hamburger (responsive mobile)
   · Filtres SVG aberration chromatique (injectés automatiquement)

   Requiert que data/tracks.js soit chargé avant ce fichier.
   ════════════════════════════════════════════════════════════════════════════ */

/* ── Filtre SVG aberration chromatique (injecté en haut du body) ── */
(function injectSvgDefs() {
  const el = document.createElement('div');
  el.className = 'svg-defs';
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="ca-red" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
      </filter>
      <filter id="ca-blue" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
      </filter>
    </defs>
  </svg>`;
  document.body.insertBefore(el, document.body.firstChild);
})();

/* ── Hamburger navbar (responsive mobile) ── */
(function initHamburger() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  /* Récupère uniquement les <a> enfants directs de nav (pas ceux dans le vinyl zone) */
  const links = Array.from(nav.children).filter(el => el.tagName === 'A');
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-links';
  links.forEach(a => wrapper.appendChild(a));
  nav.insertBefore(wrapper, nav.firstChild);

  /* Marquer le lien actif selon l'URL courante */
  const page = location.pathname.split('/').pop() || 'index.html';
  wrapper.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  const ham = document.createElement('div');
  ham.className = 'nav-hamburger';
  ham.setAttribute('aria-label', 'Menu');
  ham.innerHTML = '<div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>';
  nav.appendChild(ham);

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    wrapper.classList.toggle('open');
  });
  wrapper.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      wrapper.classList.remove('open');
    });
  });
})();

/* ════════════════════════════════════════════════════════════════════════════
   VINYL PLAYER
   Utilise le tableau TRACKS défini dans data/tracks.js
   ════════════════════════════════════════════════════════════════════════════ */
(function initVinyl() {
  /* Éléments DOM */
  const player      = document.getElementById('player');
  const vinyl       = document.getElementById('vinyl');
  const vinylSvg    = document.getElementById('vinyl-svg');
  const coverImg    = document.getElementById('cover-img');
  const trackLabel  = document.getElementById('track-label');
  const trackList   = document.getElementById('track-list');
  const dropdown    = document.getElementById('dropdown');
  const chevronBtn  = document.getElementById('chevron-btn');
  const iPlay       = document.getElementById('i-play');
  const iPause      = document.getElementById('i-pause');
  const vinylPopup  = document.getElementById('vinyl-popup');

  let currentIdx = -1, isPlaying = false, ddOpen = false;

  /* ── Build dropdown depuis TRACKS ── */
  TRACKS.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'track-item';
    el.innerHTML = `<div class="track-thumb"><img src="${t.cover}" alt="${t.title}"></div>
      <div class="track-meta"><div class="track-title">${t.title}</div></div>
      <div class="playing-dot"></div>`;
    el.addEventListener('click', () => selectTrack(i));
    trackList.appendChild(el);
  });

  /* ── Popup d'invitation (apparaît après 2.5s si rien joué) ── */
  let popupTimer = setTimeout(() => {
    if (currentIdx === -1) vinylPopup.classList.add('visible');
  }, 2500);
  function hidePopup() {
    vinylPopup.classList.remove('visible');
    clearTimeout(popupTimer);
  }

  /* ── Sélection d'une piste ── */
  function selectTrack(idx) {
    hidePopup();
    currentIdx = idx;
    const t = TRACKS[idx];
    vinylSvg.style.display = 'none';
    coverImg.src = t.cover;
    coverImg.style.display = 'block';
    trackLabel.textContent = t.title;
    trackLabel.classList.add('on');
    if (t.src) {
      player.src = t.src;
      player.play().then(() => setState(true)).catch(() => setState(true));
    } else {
      setState(true); /* simulation sans fichier audio */
    }
    document.querySelectorAll('.track-item').forEach((el, i) =>
      el.classList.toggle('active', i === idx)
    );
    closeDropdown();
  }

  /* ── Play / Pause ── */
  function setState(on) {
    isPlaying = on;
    vinyl.classList.toggle('spinning', on);
    iPlay.style.display  = on ? 'none'  : 'block';
    iPause.style.display = on ? 'block' : 'none';
  }

  vinyl.addEventListener('click', () => {
    if (currentIdx === -1) { toggleDropdown(); return; }
    if (isPlaying) {
      if (TRACKS[currentIdx].src) player.pause();
      setState(false);
    } else {
      if (TRACKS[currentIdx].src) player.play().catch(() => {});
      setState(true);
    }
  });

  /* ── Fin de piste → suivante (avec boucle) ── */
  player.addEventListener('ended', () => {
    if (TRACKS.length === 1) {
      player.currentTime = 0; player.play().catch(() => {});
    } else {
      selectTrack((currentIdx + 1) % TRACKS.length);
    }
  });

  /* ── Dropdown ── */
  function openDropdown()  { ddOpen = true;  dropdown.classList.add('open');    chevronBtn.classList.add('open');    hidePopup(); }
  function closeDropdown() { ddOpen = false; dropdown.classList.remove('open'); chevronBtn.classList.remove('open'); }
  function toggleDropdown() { ddOpen ? closeDropdown() : openDropdown(); }
  chevronBtn.addEventListener('click', e => { e.stopPropagation(); toggleDropdown(); });
  document.addEventListener('click', e => {
    if (ddOpen && !dropdown.contains(e.target) && !chevronBtn.contains(e.target))
      closeDropdown();
  });

  /* ── Restauration état depuis sessionStorage (navigation entre pages) ── */
  try {
    const saved = JSON.parse(sessionStorage.getItem('aven-player') || 'null');
    if (saved && saved.idx >= 0 && saved.idx < TRACKS.length) {
      const t = TRACKS[saved.idx];
      currentIdx = saved.idx;
      vinylSvg.style.display = 'none';
      coverImg.src = t.cover; coverImg.style.display = 'block';
      trackLabel.textContent = t.title; trackLabel.classList.add('on');
      document.querySelectorAll('.track-item').forEach((el, i) =>
        el.classList.toggle('active', i === saved.idx)
      );
      if (t.src && saved.playing) {
        player.src = t.src;
        if (saved.time) player.currentTime = saved.time;
        player.play().then(() => setState(true)).catch(() => setState(saved.playing));
      } else {
        setState(saved.playing || false);
      }
    }
  } catch(e) {}

  /* ── Sauvegarde avant navigation ── */
  window.addEventListener('beforeunload', () => {
    if (currentIdx >= 0) {
      sessionStorage.setItem('aven-player', JSON.stringify({
        idx: currentIdx,
        playing: isPlaying,
        time: TRACKS[currentIdx].src ? player.currentTime : 0,
      }));
    }
  });
})();
