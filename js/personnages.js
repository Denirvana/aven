/* ============================================================
   AVEN — js/personnages.js
   Moteur de rendu des fiches personnages.
   Requiert data/characters.js chargé avant.
   ============================================================ */

/* ══ HELPERS HTML ══ */
function field(label,value,unknown=false){
  return `<div class="info-field">
    <div class="info-label">${label}</div>
    <div class="info-value${unknown?' unknown':''}">${value}</div>
  </div>`;
}
function fieldFull(label,value,unknown=false){
  return `<div class="info-field full">
    <div class="info-label">${label}</div>
    <div class="info-value${unknown?' unknown':''}">${value}</div>
  </div>`;
}
function tagHtml(t){ return `<span class="ctag ctag-${t.style}">${t.label}</span>`; }

/* ════════════════════════════════════════════════════════════════════
   ██  HELPERS SECTIONS — utilisables dans render:()  ██
   ════════════════════════════════════════════════════════════════════

   infoGrid(fields_html)
     Wraps des field() / fieldFull() dans une grille.
     Usage : infoGrid( field('Age','18') + field('Genre','Homme') )

   infoSection(title, fields_html)
     Même chose mais avec un titre de sous-section au-dessus.
     Usage : infoSection('Mieux le Connaître', field('Likes','—',true) + ...)

   divineEye(deity, imgSrc, desc)
     Bloc "Pupille Divine" pour un personnage marqué.
     deity  : nom de la divinité (ex: 'Scylla')
     imgSrc : chemin vers l'image de la pupille, ou '' pour placeholder
     desc   : description texte du marqueur

   descWithImage(imgSrc, paragraphsHtml)
     Description avec image du personnage sur la gauche.
     imgSrc : chemin vers l'image, ou '' pour placeholder
     paragraphsHtml : balises <p>...</p>

   buildTimeline(events)
     Timeline cliquable. events = tableau d'objets :
     {
       label:   'Nom du point' (court, affiché sous le dot),
       title:   'Titre complet affiché dans le bloc',
       event:   'Texte décrivant ce qui se passe (1–2 phrases)',
       dev:     'Texte sur le développement du personnage',
       linked:  ['id1','id2']  — ids de personnages liés (optionnel)
     }
   ════════════════════════════════════════════════════════════════════ */

function infoGrid(fieldsHtml){
  return `<div class="info-grid">${fieldsHtml}</div>`;
}
function infoSection(title, fieldsHtml){
  return `<p class="info-section-title">${title}</p><div class="info-grid">${fieldsHtml}</div>`;
}

function divineEye(deity, imgSrc='', desc=''){
  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="Pupille divine"/>`
    : `<div class="divine-eye-img-placeholder">Image de la<br>pupille<br>·</div>`;
  return `<div class="divine-eye-block">
    <div class="divine-eye-header">
      <span class="divine-eye-title">Pupille Divine</span>
      <span class="divine-eye-deity">${deity}</span>
    </div>
    <div class="divine-eye-body">
      <div class="divine-eye-img">${imgHtml}</div>
      <div class="divine-eye-desc">${desc}</div>
    </div>
  </div>`;
}

function descWithImage(imgSrc='', paragraphsHtml=''){
  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt=""/>`
    : `<div class="desc-char-img-ph">Image<br>du personnage<br>·</div>`;
  return `<div class="desc-with-image">
    <div class="desc-char-img">${imgHtml}</div>
    <div class="desc-text">${paragraphsHtml}</div>
  </div>`;
}

function buildTimeline(events){
  if(!events||!events.length) return '';
  /* Génère un id unique pour cette timeline (plusieurs persos peuvent en avoir) */
  const uid = 'tl_'+Math.random().toString(36).slice(2,7);
  const dots = events.map((e,i)=>`
    <div class="tl-point${i===0?' active':''}" data-tl="${uid}" data-idx="${i}" onclick="tlClick('${uid}',${i})">
      <div class="tl-dot"></div>
      <span class="tl-label">${e.label}</span>
    </div>`).join('');

  /* Pré-render tous les blocs de contenu, cachés sauf le premier */
  const contents = events.map((e,i)=>{
    const linkedHtml = (e.linked&&e.linked.length)
      ? `<div class="tl-linked">
          <span class="tl-linked-label">Liés</span>
          ${e.linked.map(lid=>{
            const lc = charById[lid];
            if(!lc) return '';
            return `<div class="tl-linked-char" onclick="openPanel(charById['${lid}'])">
              <div class="tl-linked-avatar">${lc.avatar}</div>
              <span class="tl-linked-name">${lc.name}</span>
            </div>`;
          }).join('')}
        </div>`
      : '';
    return `<div class="timeline-content" data-tl-content="${uid}" data-idx="${i}"
        style="${i!==0?'display:none':''}">
      <div class="tl-event-title">${e.title||e.label}</div>
      ${e.event?`<div class="tl-event-body">${e.event}</div>`:''}
      ${e.dev?`<p class="tl-dev-label">Développement du personnage</p>
               <div class="tl-dev-body">${e.dev}</div>`:''}
      ${linkedHtml}
    </div>`;
  }).join('');

  return `<div class="timeline-wrap">
    <div class="timeline-track">${dots}</div>
    <div id="tlc_${uid}">${contents}</div>
  </div>`;
}

/* Appelé par les points de la timeline */
function tlClick(uid, idx){
  /* Dots */
  document.querySelectorAll(`[data-tl="${uid}"]`).forEach((el,i)=>{
    el.classList.toggle('active', i===idx);
  });
  /* Contenus */
  document.querySelectorAll(`[data-tl-content="${uid}"]`).forEach((el,i)=>{
    el.style.display = i===idx ? '' : 'none';
  });
}

/* Avatar SVG placeholder — remplacer par <img src="..."> dans characters[].avatar */
function makeAvatar(c1,c2,initials='?'){
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="url(#ag${initials})"/>
    <defs><radialGradient id="ag${initials}" cx="35%" cy="30%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </radialGradient></defs>
    <text x="30" y="36" text-anchor="middle" font-family="serif" font-size="18"
      fill="rgba(255,255,255,.85)" letter-spacing="1">${initials}</text>
  </svg>`;
}

/* Lookup rapide : id → character (pour les liens de relation) */
const charById=allCharsById;

/* Rendu d'un bloc relation avec mini-avatar cliquable */
function relationBlockHtml(charId, role, bodyHtml){
  const target=charById[charId];
  const avatarHtml=target
    ? `<div class="rel-avatar">${target.avatar}</div>`
    : '';
  const nameHtml=target
    ? `<span class="relation-name">${target.name}</span>`
    : `<span class="relation-name">${charId}</span>`;

  return `<div class="relation-block">
    <div class="relation-header">
      <a class="rel-link" href="#" onclick="openPanel(charById['${charId}']);return false;">
        ${avatarHtml}
        <div class="rel-meta">
          ${nameHtml}
          <span class="relation-role">${role}</span>
        </div>
      </a>
    </div>
    <div class="relation-body">${bodyHtml}</div>
  </div>`;
}

/* ══ BUILD FILTRES + GROUPES + CARDS ══ */
const filterBar    = document.getElementById('filter-bar');
const groupsCont   = document.getElementById('groups-container');

/* Collecte tous les labels de tags uniques */
const allTags=[];
const tagSeen=new Set();
groups.forEach(g=>{
  g.ids.forEach(id=>{
    const ch=charById[id];
    if(!ch) return;
    ch.tags.forEach(t=>{
      if(!tagSeen.has(t.label)){ tagSeen.add(t.label); allTags.push(t); }
    });
  });
});

let activeFilter=null; // null = tout afficher

/* Bouton "Tous" */
const btnAll=document.createElement('button');
btnAll.className='filter-btn all active';
btnAll.textContent='Tous';
btnAll.addEventListener('click',()=>{ activeFilter=null; applyFilter(); setActiveBtn(btnAll); });
filterBar.appendChild(btnAll);

const filterBtns=[btnAll];
allTags.forEach(t=>{
  const btn=document.createElement('button');
  btn.className=`filter-btn`;
  btn.textContent=t.label;
  btn.addEventListener('click',()=>{
    if(activeFilter===t.label){ activeFilter=null; setActiveBtn(btnAll); }
    else{ activeFilter=t.label; setActiveBtn(btn); }
    applyFilter();
  });
  filterBar.appendChild(btn);
  filterBtns.push(btn);
});

function setActiveBtn(target){
  filterBtns.forEach(b=>b.classList.toggle('active',b===target));
}

/* Build groupes */
const groupEls={};
groups.forEach(g=>{
  const groupEl=document.createElement('div');
  groupEl.className='char-group';
  groupEl.dataset.groupId=g.id;
  groupEl.innerHTML=`<div class="char-group-label">${g.label}</div>`;
  const grid=document.createElement('div');
  grid.className='chars-grid';
  g.ids.forEach(id=>{
    const ch=charById[id];
    if(!ch) return;
    const card=document.createElement('div');
    card.className='char-card';
    card.dataset.tags=ch.tags.map(t=>t.label).join('|');
    card.innerHTML=`
      <div class="char-card-img" style="background:${ch.cardBg};">${ch.cardSvg||''}</div>
      <div class="char-card-overlay"></div>
      <div class="char-card-body">
        <div class="char-card-name">${ch.name}</div>
        <div class="char-card-title">${ch.title}</div>
        <div class="char-card-tags">${ch.tags.map(tagHtml).join('')}</div>
      </div>`;
    card.addEventListener('click',()=>openPanel(ch));
    grid.appendChild(card);
  });
  groupEl.appendChild(grid);
  groupsCont.appendChild(groupEl);
  groupEls[g.id]=groupEl;
});

function applyFilter(){
  groups.forEach(g=>{
    const groupEl=groupEls[g.id];
    if(!groupEl) return;
    const cards=groupEl.querySelectorAll('.char-card');
    let anyVisible=false;
    cards.forEach(card=>{
      const tags=card.dataset.tags.split('|');
      const show=!activeFilter||tags.includes(activeFilter);
      card.style.display=show?'':'none';
      if(show) anyVisible=true;
    });
    groupEl.classList.toggle('hidden',!anyVisible);
  });
}

/* ══ PANNEAU LATÉRAL ══ */
const backdrop=document.getElementById('modal-backdrop');
const panel   =document.getElementById('char-panel');
const pName   =document.getElementById('panel-name');
const pTitle  =document.getElementById('panel-title');
const pTags   =document.getElementById('panel-tags');
const pBody   =document.getElementById('panel-body');

function openPanel(ch){
  if(!ch) return;
  document.getElementById('panel-avatar').innerHTML=ch.avatar;
  pName.textContent=ch.name;
  pTitle.textContent=ch.title;
  pTags.innerHTML=ch.tags.map(tagHtml).join('');
  pBody.innerHTML='';
  ch.sections.forEach(sec=>{
    const wrap=document.createElement('div');
    wrap.className='cs-section';
    wrap.innerHTML=`
      <button class="cs-section-header${sec.open?' open':''}" onclick="toggleSection(this)">
        <span>${sec.title}</span>
        <svg class="cs-chevron" viewBox="0 0 14 8"><path d="M1 1l6 6 6-6"/></svg>
      </button>
      <div class="cs-section-wrap${sec.open?' open':''}">
        <div class="cs-section-body">
          <div class="cs-section-inner">${sec.render()}</div>
        </div>
      </div>`;
    pBody.appendChild(wrap);
  });
  backdrop.classList.add('open');
  panel.classList.add('open');
  document.body.style.overflow='hidden';
  /* Injecte les mini-avatars dans les blocs relation */
  requestAnimationFrame(()=>{
    panel.querySelectorAll('[id^="rel-av-"]').forEach(el=>{
      const parts=el.id.split('-');
      const cid=parts[2];
      const target=charById[cid];
      if(target) el.innerHTML=target.avatar;
    });
  });
}

function closePanel(){
  backdrop.classList.remove('open');
  panel.classList.remove('open');
  document.body.style.overflow='';
}

function toggleSection(header){
  const wrap=header.nextElementSibling;
  const isOpen=wrap.classList.contains('open');
  wrap.classList.toggle('open',!isOpen);
  header.classList.toggle('open',!isOpen);
}

document.addEventListener('keydown',e=>{ if(e.key==='Escape') closePanel(); });