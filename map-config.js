/* ════════════════════════════════════════════════════════════════════════════
   AVEN — data/map-config.js
   Carte du monde : pins cliquables et silhouettes des continents.
   ════════════════════════════════════════════════════════════════════════════

   ── 1. AJOUTER UN PIN ────────────────────────────────────────────────────
   Un pin = un point cliquable sur la carte.
   Les coordonnées sont en POURCENTAGE (0–100) par rapport à l'image.
   Pour trouver les coordonnées : ouvrir la carte dans un navigateur, zoomer
   sur l'endroit voulu et estimer left (gauche→droite) / top (haut→bas).

   Styles disponibles : 'default'(orange) | 'gold' | 'blue' | 'green' | 'red' | 'purple'

   {
     label: 'Nom du lieu',
     left:  '45%',              // position horizontale
     top:   '30%',              // position verticale
     href:  'ma-page.html',     // page ouverte au clic
     style: 'gold',             // couleur du point
   },

   ── 2. MODIFIER UN POLYGONE ───────────────────────────────────────────────
   Les polygones définissent les zones cliquables sur la carte.
   Les coordonnées sont dans un espace 1000 × 651 (proportionnel à la carte).
   Pour les modifier : utiliser un éditeur SVG (Inkscape / Figma) avec la
   carte en fond, tracer les contours, puis copier les coordonnées.

   ── 3. AJOUTER UN CONTINENT ──────────────────────────────────────────────
   Ajouter une entrée dans CONTINENT_POLYGONS avec :
   - id        : identifiant CSS unique (pas d'espace ni accent)
   - name      : nom affiché sur la carte
   - file      : page HTML destination
   - label_x/y : position du texte sur la carte
   - pts       : coordonnées du polygone (space-separated "x,y x,y ...")

   ════════════════════════════════════════════════════════════════════════════ */

/* ══ PINS ════════════════════════════════════════════════════════════════════
   Modifier ce tableau pour ajouter / déplacer / supprimer des pins.
   ════════════════════════════════════════════════════════════════════════════ */
const PIN_CONFIG = [

  /* ── Bilguel (continent jaune, arc 2) ─────────────────────────────────── */
  { label:'Royaume du Nord',    left:'37%', top:'13%', href:'continent-2.html', style:'default' },
  { label:'Albarossa',          left:'32%', top:'22%', href:'albarossa.html',   style:'gold'    },
  { label:"Royaume de l'Ouest", left:'26%', top:'25%', href:'continent-2.html', style:'green'   },
  { label:'Ville du Désert',    left:'38%', top:'30%', href:'continent-2.html', style:'gold'    },
  { label:'Le Port',            left:'32%', top:'43%', href:'continent-2.html', style:'blue'    },

  /* ── Ajouter vos pins ici ────────────────────────────────────────────────
  { label:'Nom du Lieu', left:'55%', top:'60%', href:'ma-page.html', style:'default' },
  ── */
];

/* Couleurs par style */
const PIN_STYLES = {
  default: { dot:'rgba(200,120,48,.9)',  border:'rgba(255,200,120,.75)', shadow:'rgba(200,120,48,.55)', label:'rgba(255,255,255,.85)',  lborder:'rgba(255,255,255,.15)'   },
  gold:    { dot:'rgba(220,200,40,.9)',  border:'rgba(255,240,100,.75)', shadow:'rgba(220,200,40,.55)', label:'rgba(255,240,100,.88)',  lborder:'rgba(220,200,40,.4)'     },
  blue:    { dot:'rgba(60,140,200,.85)', border:'rgba(120,190,255,.65)', shadow:'rgba(60,140,200,.45)', label:'rgba(140,200,255,.8)',   lborder:'rgba(60,140,200,.35)'    },
  green:   { dot:'rgba(60,160,60,.8)',   border:'rgba(120,220,100,.65)', shadow:'rgba(60,160,60,.45)',  label:'rgba(140,220,120,.8)',   lborder:'rgba(60,160,60,.35)'     },
  red:     { dot:'rgba(200,40,40,.85)',  border:'rgba(255,100,100,.65)', shadow:'rgba(200,40,40,.45)',  label:'rgba(255,120,100,.85)',  lborder:'rgba(200,40,40,.35)'     },
  purple:  { dot:'rgba(140,40,200,.85)', border:'rgba(200,120,255,.65)', shadow:'rgba(140,40,200,.45)', label:'rgba(200,140,255,.85)',  lborder:'rgba(140,40,200,.35)'    },
};

/* ══ POLYGONES DES CONTINENTS ════════════════════════════════════════════════
   Zones cliquables superposées à la carte.
   Espace de coordonnées : 1000 × 651 (même ratio que l'image 3629×2363).
   ════════════════════════════════════════════════════════════════════════════ */
const CONTINENT_POLYGONS = [
  {
    id:'caldris', name:'Caldris', file:'continent-1.html',
    label_x:372, label_y:347,
    pts:'341,294 312,319 312,329 324,349 330,355 336,365 344,370 365,380 412,390 424,395 431,385 436,375 440,355 428,349 408,344 399,324 368,314 350,299 348,294',
  },
  {
    id:'bilguel', name:'Bilguel', file:'continent-2.html',
    label_x:370, label_y:210,
    pts:'283,122 270,140 252,168 252,195 258,213 263,231 261,249 263,258 270,268 276,277 283,286 308,304 326,295 391,268 461,240 479,222 486,195 485,186 456,177 448,168 431,158 416,149 392,140 363,131 352,122',
  },
  {
    id:'tetsuo', name:'Tetsuo', file:'continent-3.html',
    label_x:580, label_y:195,
    pts:'420,65 500,60 580,60 650,72 712,90 713,118 731,130 752,142 753,166 743,178 742,190 735,202 715,214 704,226 704,238 694,249 684,261 660,273 710,285 532,297 508,297 505,285 507,273 515,261 544,249 492,238 491,226 494,214 491,202 485,190 478,178 521,166 544,154 358,130 348,118 390,95',
  },
  {
    id:'cont4', name:'Continent IV', file:'continent-4.html',
    label_x:175, label_y:160,
    pts:'145,48 135,73 120,85 121,98 128,111 126,123 127,149 128,161 166,224 172,237 196,262 195,275 244,300 248,287 237,275 197,237 194,224 192,186 198,161 170,149 175,111 172,98 177,85 161,73 154,60 147,48',
  },
  {
    id:'cont5', name:'Continent V', file:'continent-5.html',
    label_x:572, label_y:334,
    pts:'579,281 573,285 566,300 566,305 576,310 573,315 526,320 509,325 510,330 513,339 491,349 491,354 494,364 500,379 558,379 601,374 614,364 622,359 633,349 635,330 637,320 625,315 613,310 622,305 626,295 620,285 610,281',
  },
  {
    id:'cont6', name:'Continent VI', file:'continent-6.html',
    label_x:760, label_y:220,
    pts:'807,57 802,87 677,118 659,133 653,148 751,163 740,179 714,209 708,224 698,239 760,255 707,285 700,300 698,315 732,331 749,346 754,361 777,346 819,315 828,285 782,255 788,239 782,209 798,179 810,163 812,148 805,118 808,87 819,57',
  },

  /* ── Ajouter un continent ────────────────────────────────────────────────
  {
    id:'mon-continent', name:'Nom Affiché', file:'continent-7.html',
    label_x:500, label_y:400,
    pts:'x1,y1 x2,y2 x3,y3 ...',
  },
  ── */
];
