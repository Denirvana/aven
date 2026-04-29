/* ════════════════════════════════════════════════════════════════════════════
   AVEN — data/tracks.js
   ════════════════════════════════════════════════════════════════════════════
   C'est ici que tu gères toute ta musique.
   Ce fichier est chargé par toutes les pages — un seul endroit à modifier.

   ── AJOUTER UNE PISTE ────────────────────────────────────────────────────
   Copier un bloc et remplir :

   {
     title: 'Nom affiché dans le player',
     src:   'audio/mon-fichier.mp3',   // chemin relatif depuis la racine du site
     cover: 'img/cover-mon-titre.jpg', // image de couverture (carré recommandé)
     //
     // Si tu n'as pas encore de cover, tu peux utiliser une couleur de secours :
     // cover: makeSvgCover('#couleur1', '#couleur2')
     // Exemples : makeSvgCover('#c84030','#e8a020')
     //            makeSvgCover('#1a3a8c','#7a20c8')
   },

   ── ORDRE ────────────────────────────────────────────────────────────────
   Les pistes jouent dans l'ordre du tableau, en boucle.
   La dernière piste repasse à la première automatiquement.

   ════════════════════════════════════════════════════════════════════════════ */

/* Génère une cover SVG placeholder quand tu n'as pas encore d'image */
function makeSvgCover(c1, c2) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <polygon points='0,0 100,0 0,100' fill='${c1}'/>
      <polygon points='100,0 100,100 0,100' fill='${c2}'/>
    </svg>`
  );
}

/* ══ TA LISTE DE PISTES ══════════════════════════════════════════════════════
   Modifier ce tableau pour gérer la musique.
   ════════════════════════════════════════════════════════════════════════════ */
const TRACKS = [

  /* ── Pistes placeholder (remplacer src + cover par tes vrais fichiers) ── */
  {
    title: 'Aube sur la Montagne',
    src:   null,                                   // ← remplacer par 'audio/aube.mp3'
    cover: makeSvgCover('#c84030', '#e8a020'),     // ← remplacer par 'img/cover-aube.jpg'
  },
  {
    title: 'Le Désert de Sel',
    src:   null,
    cover: makeSvgCover('#1a3a8c', '#7a20c8'),
  },
  {
    title: 'Nuit à Albarossa',
    src:   null,
    cover: makeSvgCover('#0e4a2e', '#1e6888'),
  },

  /* ── Ajouter tes pistes ici ──────────────────────────────────────────────
  {
    title: 'Ma Nouvelle Piste',
    src:   'audio/ma-piste.mp3',
    cover: 'img/cover-ma-piste.jpg',
  },
  ── */
];
