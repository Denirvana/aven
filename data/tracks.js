/* ============================================================
   AVEN — data/tracks.js
   Ajouter / modifier la musique ici.

   FORMAT :
   { title: 'Nom', src: 'audio/fichier.mp3', cover: 'img/cover.jpg' }

   Pour une cover provisoire : cover: makeSvgCover('#couleur1','#couleur2')
   Pour src sans fichier encore : src: null
   ============================================================ */

function makeSvgCover(c1, c2) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
    + '<polygon points="0,0 100,0 0,100" fill="' + c1 + '"/>'
    + '<polygon points="100,0 100,100 0,100" fill="' + c2 + '"/>'
    + '</svg>'
  );
}

var TRACKS = [

  /* Remplacer src par 'audio/nom.mp3' et cover par 'img/cover.jpg' */
  { title: 'Aube sur la Montagne', src: null, cover: makeSvgCover('#c84030','#e8a020') },
  { title: 'Le Désert de Sel',     src: null, cover: makeSvgCover('#1a3a8c','#7a20c8') },
  { title: 'Nuit à Albarossa',     src: null, cover: makeSvgCover('#0e4a2e','#1e6888') }

];
