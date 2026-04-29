/* ════════════════════════════════════════════════════════════════════════════
   AVEN — data/characters.js
   Base de données des personnages.
   C'est ici que tu ajoutes, modifies et organises tes personnages.
   Lire le GUIDE ci-dessous avant de commencer.
   ════════════════════════════════════════════════════════════════════════════ */





/* ════════════════════════════════════════════════════════════════════════════
   ██  GUIDE — PERSONNAGES  ██
   ════════════════════════════════════════════════════════════════════════════

   ── 1. AJOUTER UN PERSONNAGE ─────────────────────────────────────────────
   Copier ce template dans `characters` ou `extraChars`, remplir les champs,
   puis ajouter son id dans le bon groupe (section 3 ci-dessous).

   {
     id: 'mon-perso',          // Identifiant unique, minuscules, sans espace
     name: 'Nom Affiché',
     title: 'Le Rôle',

     // Avatar circulaire dans le header du panneau.
     // Option A (placeholder SVG) : makeAvatar('#couleur1','#couleur2','AB')
     // Option B (vraie image)     : avatar: '<img src="img/perso.jpg"/>'
     get avatar(){ return makeAvatar('#080818','#1a1040','Ab'); },

     // Tags affichés sur la card et dans le panneau.
     // Styles disponibles : 'amber' | 'coral' | 'gray' | 'pink' | 'blue'
     tags: [
       {label:'Mon Tag',   style:'amber'},
       {label:'Autre Tag', style:'blue'},
     ],

     // Fond de la card (en attendant une vraie image).
     // Pour une vraie image : cardBg: "url('img/perso.jpg') center/cover"
     cardBg: `linear-gradient(to bottom, #050510 0%, #0c0820 60%, #06040e 100%)`,

     // Décor SVG optionnel sur la card (peut être '' pour rien).
     cardSvg: '',

     // Sections du panneau latéral.
     // Chaque section est un onglet dépliable.
     sections: [
       {
         id:'info', title:'Informations', open:true,   // open:true = ouvert par défaut
         render:()=>`
         <div class="info-grid">
           ${field('Full name',  'Nom Affiché')}
           ${field('Age',        '— ans')}
           ${field('Gender',     '—')}
           ${field('Race',       '—')}
           ${field('Birth place','—', true)}   // true = champ grisé "non renseigné"
           ${field('Birthday',   '—', true)}
           ${field('Sexuality',  '—', true)}
           ${field('Role',       '—')}
           ${field('Likes',      '—', true)}
           ${field('Dislikes',   '—', true)}
           ${fieldFull('Hobbies','—', true)}   // fieldFull = occupe les 2 colonnes
         </div>`
       },

       // ── Section texte libre ──────────────────────────────────────────
       {
         id:'background', title:'Background story', open:false,
         render:()=>`
         <div class="cs-text">
           <p>Premier paragraphe.</p>
           <p>Deuxième paragraphe.</p>
         </div>`
       },

       // ── Section avec bullets (magic-list) ───────────────────────────
       {
         id:'magic', title:'Magic', open:false,
         render:()=>`
         <div class="magic-list">
           <div class="magic-item">
             <div class="magic-dot"></div>
             <div class="magic-content">
               <div class="magic-title">Titre du pouvoir</div>
               <div class="magic-desc">Description du pouvoir.</div>
             </div>
           </div>
         </div>`
       },

       // ── Section relations ────────────────────────────────────────────
       // relationBlockHtml(id_cible, 'Rôle · Descriptif', `<p>Texte.</p>`)
       // L'id_cible doit correspondre à un id de personnage existant.
       {
         id:'relations', title:'Relations', open:false,
         render:()=>
           relationBlockHtml('hyuun','Rôle de la relation',`
             <p>Description de la relation.</p>
           `)
       },
     ]
   }

   ── 2. STYLES DE TAGS ────────────────────────────────────────────────────
   'amber' → orange/doré      → rôles narratifs, armes
   'coral' → rouge/corail     → antagonistes, combattants, factions ennemies
   'gray'  → gris neutre      → rôles secondaires, arcs, lieux
   'pink'  → rose/mauve       → liens affectifs, secrets, révélations
   'blue'  → bleu             → factions alliées (ex: Filles d'Hadès)

   ── 3. GROUPES & CATÉGORIES ──────────────────────────────────────────────
   Les groupes définissent l'ordre d'affichage et les sections visuelles.
   Ajouter l'id du personnage dans le tableau `ids` du bon groupe.
   Pour créer un nouveau groupe, ajouter un objet dans `groups` :

   { id:'mon-groupe', label:'Nom du Groupe', ids:['id1','id2','id3'] }

   Le filtre en haut de page est généré automatiquement à partir des tags.
   Pas besoin de le modifier manuellement.

   ── 4. AVATAR AVEC VRAIE IMAGE ───────────────────────────────────────────
   Dans la définition du personnage, remplacer `get avatar()` par :
   avatar: '<img src="img/perso-avatar.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>',

   ── 5. CARD AVEC VRAIE IMAGE ─────────────────────────────────────────────
   Dans la définition du personnage, remplacer cardBg par :
   cardBg: "url('img/perso-card.jpg') center/cover",
   Et mettre cardSvg: '' (vide).

   ════════════════════════════════════════════════════════════════════════════ */

/* ══ DONNÉES PERSONNAGES ══ */
const characters=[
  {
    id:'hyuun',
    name:'Hyuun',
    title:'Le Loup',
    /* avatar: remplacer makeAvatar() par 'img/hyuun-avatar.jpg' quand prêt */
    get avatar(){ return makeAvatar('#3a0808','#8a1808','H'); },
    tags:[
      {label:'Protagoniste',style:'coral'},
      {label:'Marqué — Scylla',style:'amber'},
      {label:'Chasseur',style:'gray'},
    ],
    /* Image de card — remplacer par url('img/hyuun.jpg') */
    cardBg:`linear-gradient(to bottom, #0e0408 0%, #200808 30%, #3a1004 55%, #4a1808 75%, #1a0804 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.35">
      <line x1="80" y1="140" x2="140" y2="200" stroke="rgba(200,60,20,.6)" stroke-width="2"/>
      <line x1="140" y1="140" x2="80" y2="200" stroke="rgba(200,60,20,.6)" stroke-width="2"/>
      <line x1="160" y1="140" x2="220" y2="200" stroke="rgba(200,60,20,.6)" stroke-width="2"/>
      <line x1="220" y1="140" x2="160" y2="200" stroke="rgba(200,60,20,.6)" stroke-width="2"/>
      <circle cx="150" cy="170" r="40" fill="none" stroke="rgba(200,60,20,.2)" stroke-width="1"/>
    </svg>`,
    sections:[
      /* ── Informations ────────────────────────────────────────────────────
         Deux tableaux séparés : état civil + données personnelles.
         Ajouter des champs : field('Label','Valeur') ou field('Label','—',true)
         Pour un champ pleine largeur : fieldFull('Label','Valeur')
      ── */
      {
        id:'info', title:'Informations', open:true,
        render:()=>
          infoSection('Informations',
            field('Full name','Hyuun') +
            field('Age','18 (arc 1) · 21 (arc 2) · 23–24 (Panthéon)') +
            field('Gender','Homme') +
            field('Race','Humain') +
            field('Birth place','—',true) +
            field('Birthday','—',true) +
            field('Marqué ?','Oui, Scylla') +
            field('Role','Protagoniste · Chasseur · Infiltrateur · Combat corps-à-corps')
          ) +
          infoSection('Mieux le Connaître',
            field('Sexuality',       '—', true) +
            field('Favorite animal', 'Loup (implicite)') +
            field('Favorite food',   '—', true) +
            field('Favorite drink',  '—', true) +
            field('Favorite color',  '—', true) +
            field('Likes',           '—', true) +
            field('Dislikes',        '—', true) +
            field('Hobbies',         '—', true)
          )
      },

      /* ── Magie ───────────────────────────────────────────────────────────
         divineEye(deity, imgSrc, desc) → bloc Pupille Divine
         imgSrc : chemin vers l'image ('img/hyuun-pupille.png') ou '' pour placeholder
      ── */
      {
        id:'magic', title:'Magic', open:false,
        render:()=>
          divineEye(
            'Scylla',
            '',  /* ← remplacer par 'img/hyuun-pupille.png' quand disponible */
            'Marqueur de Scylla (Gourmandise, Roue Bestiale). Pouvoir léger : X dans l\'œil. Pouvoir moyen : tout l\'œil. Pouvoir intense : lignes rouges débordent sur le visage et le corps. Un marqué expérimenté peut utiliser son pouvoir sans activer ses yeux — acte de rébellion fondamental contre sa déesse.'
          ) +
          `<div class="magic-list">
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Double noyau — Second noyau parasite</div>
              <div class="magic-desc">Son second noyau est totalement incandescent. Il envoie des enzymes qui imitent des signaux cérébraux, ordonnant au flux de brûler. D'abord il brûle le flux (feu), puis brûle réellement les tissus si l'utilisation se prolonge. La fumée qu'il expire en permanence est le symptôme de ce noyau qui ne s'arrête jamais, même au repos.</div>
            </div>
          </div>
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Conflit mental de visualisation</div>
              <div class="magic-desc">Pour utiliser ce feu, il doit visualiser la combustion interne — ce qui entre en conflit avec son instinct de survie. Devant Scylla, sa conviction se brise et sa magie s'effondre. Dans l'arc 5, quand sa visualisation passe de "le feu me brûle" à "je suis le feu", son contrôle explose.</div>
            </div>
          </div>
        </div>`
      },

      {
        id:'weapon', title:'Weapon / Tool', open:false,
        render:()=>`
        <div class="cs-text"><p>Lames courtes (épées). Style infiltration — faire saigner, fatiguer, poursuivre, être plus rapide que l'adversaire. Il privilégie le combat physique car sa magie est dangereuse pour lui-même.</p>
        <p>Arc 5 — Mont de l'Épée : jambières métalliques lestées ajoutées à son style sous le dieu de l'épée bestiale. Les coups de pied détruisent les obstacles et empêchent la fuite. La lame saigne et fatigue. C'est un style de prédateur apex qui ne laisse aucune échappatoire.</p>
        <p><strong style="color:rgba(200,120,48,.8)">Objet symbolique :</strong> le bandage de Wendy. Noué à sa main dans un magasin pendant l'arc 1. Visible à chaque moment clé. Il ne l'enlèvera jamais.</p></div>`
      },

      {
        id:'background', title:'Background story', open:false,
        render:()=>`
        <div class="cs-text">
          <p>Enlevé enfant, élevé comme une arme par Scylla (Gourmandise). Manipulé, traumatisé, amnésie partielle. La faction Scylla a été démantelée mais pas détruite.</p>
          <p>Son secret fondamental : sa mère biologique est Mira, déesse de la Générosité. Il a été enlevé enfant et ne le sait pas. Son identité est un champ de bataille cosmologique — l'enfant de la Générosité élevé par la Gourmandise.</p>
        </div>`
      },

      /* ── Description ─────────────────────────────────────────────────────
         descWithImage(imgSrc, paragraphsHtml)
         imgSrc : chemin vers l'image du perso, ou '' pour placeholder
      ── */
      {
        id:'desc', title:'Description', open:false,
        render:()=>
          descWithImage(
            '',  /* ← remplacer par 'img/hyuun.png' quand disponible */
            `<p>Silencieux, instinctif, moralement instable au début. Posture de prédateur. Pas de rêve ni de quête claire, juste un instinct : continuer. Son cynisme émerge progressivement, ses remarques deviennent lucides parfois moqueuses. Il ne sait pas dire au revoir — il fuit comme un animal blessé.</p>
            <p>Quand il échoue, il pense en termes de loup et de meute : chasse échouée, chassé par un prédateur supérieur, rejeté de la meute. Devant Scylla, tous ses acquis disparaissent. Il lâche ses armes et lève les poings nus.</p>
            <p><strong style="color:rgba(255,255,255,.7)">Arc global :</strong> passer de bête de survie à humain capable de lien.</p>`
          )
      },

      /* ── Développement du personnage ─────────────────────────────────────
         buildTimeline(events) — chaque event = un point sur la ligne.
         {
           label:  'Texte court sous le point',
           title:  'Titre affiché dans le bloc (optionnel, sinon = label)',
           event:  'Ce qui se passe (1–2 phrases)',
           dev:    'Comment le personnage évolue à ce moment',
           linked: ['id1','id2']  — ids de persos liés (optionnel)
         }
      ── */
      {
        id:'developpement', title:'Développement', open:false,
        render:()=>buildTimeline([
          {
            label:'Arc 1',
            title:'Arc 1 — Le Voyage des Filles d\'Hadès',
            event:'Hyuun rejoint involontairement le groupe de Maelle et ses filles. Il guide le groupe dans la survie, découvre ce que c\'est d\'être humain parmi des humains.',
            dev:'Il apprend à ressentir. Pour la première fois, des gens s\'intéressent à lui sans vouloir l\'armer ou l\'utiliser. Il ne sait pas encore quoi faire de ça.',
            linked:['maelle','beka','wendy','nui'],
          },
          {
            label:'Désert',
            title:'Arc 2 — Le Désert & le Quatuor',
            event:'Après le rejet d\'Hadès, Hyuun erre seul dans le désert. Minako le sauve. Ensemble ils forment le duo Ouroboros et recrutent Tetsuga puis Arsène.',
            dev:'Il apprend à fonctionner avec les autres — non plus par instinct de survie, mais par choix. Le quatuor est le premier groupe qu\'il choisit vraiment.',
            linked:['minako','tetsuga','arsene'],
          },
          {
            label:'Arc 3',
            title:'Arc 3 — Guerre d\'Albarossa',
            event:'Double front : infiltration dans la capitale pour sauver Nui, confrontation idéologique avec les Prophètes. Scylla apparaît avec sa meute.',
            dev:'Il prononce ses premières vraies excuses ("Je suis désolé"). Et face à Scylla, ses premières larmes. C\'est l\'arc où il apprend à dire ce qu\'il ressent.',
            linked:['nui','minako'],
          },
          {
            label:'Mont de l\'Épée',
            title:'Arc 5 — Mont de l\'Épée',
            event:'Deux à trois ans d\'entraînement sous le dieu de l\'épée bestiale. Il réconcilie sa nature de loup avec son identité humaine.',
            dev:'Il comprend enfin ce qu\'est l\'amour, grâce au garçon sans magie. Il cesse de fuir sa nature pour l\'intégrer — son contrôle magique explose en même temps.',
            linked:[],
          },
          {
            label:'Panthéon',
            title:'Arc 6 — Le Panthéon',
            event:'Tournoi mondial. Hyuun combat sous la bannière de Scylla avant de changer d\'équipe en plein tournoi — acte de rébellion cosmique devant le monde entier.',
            dev:'Il revendique son identité. Plus de fuite, plus de meute imposée. C\'est lui qui décide qui il est.',
            linked:[],
          },
        ])
      },

      {
        id:'relations', title:'Relations', open:false,
        render:()=>`
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['minako']);return false;">
              <div class="rel-avatar" id="rel-av-minako-Mi"></div>
              <div class="rel-meta">
                <span class="relation-name">Minako</span>
                <span class="relation-role">Amour · Duo fondateur · Ouroboros</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Deux prédateurs qui couvrent l'angle mort de l'autre. Hyuun ne nourrit pas sa malédiction — il ne réagit pas à la séduction — et elle peut exister à côté de lui sans se sentir parasite. L'Ouroboros — un loup qui mord la queue d'un renard qui mord la queue du loup — est le premier engagement officiel de sa vie.</p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['nui']);return false;">
              <div class="rel-avatar" id="rel-av-nui-Nu"></div>
              <div class="rel-meta">
                <span class="relation-name">Nui</span>
                <span class="relation-role">Amour · Chasseuse silencieuse · Bouclier</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Leur lien commence avant les mots. Ils chassent ensemble dans le silence absolu — communication par signes, affinité instinctive entre deux prédateurs naturels. Son amour s'exprime entièrement par l'action.</p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['tetsuga']);return false;">
              <div class="rel-avatar" id="rel-av-tetsuga-Te"></div>
              <div class="rel-meta">
                <span class="relation-name">Tetsuga</span>
                <span class="relation-role">Respect martial · Le marteau et le scalpel</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Respect martial entre combattants, pas de transfert paternel. Tetsuga le traite comme un égal — rare et précieux. Première mission catastrophique, puis complémentarité redoutable : le marteau et le scalpel.</p>
          </div>
        </div>`
      },
    ]
  },
  {
    id:'minako',
    name:'Minako',
    title:'La Renarde',
    get avatar(){ return makeAvatar('#3a1a04','#a04808','M'); },
    tags:[
      {label:'Quatuor',style:'amber'},
      {label:'Stratège',style:'coral'},
      {label:'Amour',style:'pink'},
    ],
    cardBg:`linear-gradient(to bottom, #100a04 0%, #201006 30%, #341808 55%, #281408 75%, #100804 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.3">
      <line x1="60" y1="200" x2="240" y2="200" stroke="rgba(200,140,40,.5)" stroke-width="1"/>
      <line x1="150" y1="120" x2="90" y2="250" stroke="rgba(200,140,40,.4)" stroke-width="1"/>
      <line x1="150" y1="120" x2="210" y2="250" stroke="rgba(200,140,40,.4)" stroke-width="1"/>
      <ellipse cx="150" cy="190" rx="55" ry="35" fill="none" stroke="rgba(200,140,40,.2)" stroke-width="1"/>
    </svg>`,
    sections:[
      {
        id:'info',title:'Informations',open:true,
        render:()=>`
        <div class="info-grid">
          ${field('Full name','Minako')}
          ${field('Age','25 ans (rencontre Hyuun) · 26 ans (arc 2)')}
          ${field('Gender','Femme')}
          ${field('Race','Kitsune (femme-renard, clan maudit)')}
          ${field('Birth place','—',true)}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Tacticienne · Recruteur · Meneur stratégique du quatuor')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','—',true)}
          ${fieldFull('Hobbies','—',true)}
        </div>`
      },
      {
        id:'magic',title:'Magic',open:false,
        render:()=>`
        <div class="magic-list">
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Malédiction kitsune</div>
              <div class="magic-desc">Se nourrit du plaisir des autres — sexe, bonheur, retrouvailles. Fonctionne via un organe supplémentaire lié à la malédiction (magie innée par mutation). Elle ne peut pas contrôler ce désir. Sa séduction est à la fois un outil et un symptôme. Arsène est pour elle un test quotidien involontaire : chaque vol et frisson qu'il ressent est un festin.</div>
            </div>
          </div>
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Magie d'eau mineure</div>
              <div class="magic-desc">Probablement apprise indépendamment, non liée au marquage. Suffisante pour l'hydratation dans le désert — insuffisante pour le combat offensif.</div>
            </div>
          </div>
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Yeux divins — Pupilles fines, longues, rouges</div>
              <div class="magic-desc">Pupilles de prédateur. Activation synchronisée avec Hyuun dans l'impasse du tournoi — première visualisation de la meute qu'ils forment. Le regard seul de Scylla suffit à pétrifier Minako.</div>
            </div>
          </div>
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Pistage par le plaisir</div>
              <div class="magic-desc">Sa malédiction lui permet de détecter et traquer quelqu'un par le plaisir qu'il ressent. Démontré lors de la course-poursuite avec Arsène aux inscriptions du tournoi — plus il prend du plaisir à fuir, plus elle le piste.</div>
            </div>
          </div>
        </div>`
      },
      {
        id:'weapon',title:'Weapon / Tool',open:false,
        render:()=>`
        <div class="cs-text">
          <p>Aucune arme spécifique mentionnée. Son outil principal est la manipulation et l'intelligence tactique — elle voit dix coups d'avance. Sa malédiction fonctionne comme un outil de pistage et de lecture émotionnelle.</p>
        </div>`
      },
      {
        id:'background',title:'Background story',open:false,
        render:()=>`
        <div class="section-img">
          <svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="120" fill="#100a04"/>
            <polygon points="0,120 150,60 300,90 450,40 600,70 600,120" fill="rgba(80,40,5,.7)"/>
            <polygon points="0,120 100,80 250,100 400,65 550,85 600,120" fill="rgba(50,25,3,.8)"/>
            <text x="300" y="20" text-anchor="middle" font-family="serif" font-size="10" fill="rgba(200,140,40,.3)" letter-spacing="3">PLACEHOLDER — remplacer par votre illustration</text>
          </svg>
        </div>
        <div class="cs-text">
          <p>Kitsune du clan maudit — trahis par une divinité du divertissement ou des vices, condamnés à se nourrir du plaisir des autres. Cette malédiction n'est pas une arme choisie : c'est une faim constante à gérer, contenir, surveiller à chaque instant.</p>
          <p>Elle voyage dans le même bateau que Hyuun le soir où il quitte les filles d'Hadès. Elle observe la scène de la cale : un homme brisé portant un bandage sale qui fait trembler un colosse d'un regard. Ce n'est pas de la pitié — c'est de la curiosité. Une reconnaissance entre prédateurs. Elle le suit dans le désert sans se montrer, attendant qu'il tombe. Quand il s'effondre, elle le sauve.</p>
          <p>C'est elle qui propose la guilde, dessine le motif Ouroboros, recrute Tetsuga par les événements et traque Arsène dans les rues pour le convaincre. Le quatuor est sa construction autant que celle de Hyuun.</p>
          <p>Arc 5 : part avec Arsène retrouver la trace de la divinité qui a maudit son clan. Elle le fait principalement pour Hyuun — pour enlever ce poids de ses épaules. Ce n'est même pas pour elle.</p>
        </div>`
      },
      {
        id:'desc',title:'Description',open:false,
        render:()=>`
        <div class="cs-text">
          <p>Regard en coin futé comme un renard, mais aussi apaisant. Elle ouvre et ferme l'intensité exactement comme elle veut, passe du jeu à l'action sans transition et sans signal. Elle est opaque là où les filles d'Hadès sont transparentes. Elle choisit ce qu'elle montre avec une précision chirurgicale.</p>
          <p>Les rares moments où son masque tombe vraiment — le sourire rassuré vers le dos de Hyuun dans la tente, le grand sourire sans défense lors des retrouvailles de l'arc 3 — ont une violence particulière parce qu'ils sont rares. Elle cache son amour à moitié et extériorise le reste dans sa quête. Son amour pour Hyuun nourrit sa lutte personnelle.</p>
        </div>`
      },
      {
        id:'relations',title:'Relations',open:false,
        render:()=>`
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['hyuun']);return false;">
              <div class="rel-avatar" id="rel-av-hyuun-Hy"></div>
              <div class="rel-meta">
                <span class="relation-name">Hyuun</span>
                <span class="relation-role">Amour · Duo fondateur · Ouroboros</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Hyuun ne réagit pas à sa séduction — pour Minako c'est révolutionnaire. Elle peut exister à côté de lui sans se sentir parasite. Elle l'aime en le libérant : le pousse vers le monde, vers Tetsuga, Arsène, vers les filles d'Hadès. Son amour s'exprime par le lâcher-prise. Elle sourit quand il a le dos tourné. Son sacrifice le plus grand : vouloir qu'il devienne complet, même sans elle au centre.</p>
            <p>Retrouvailles arc 3 : tout le monde rit. Elle se tient à l'écart. Wendy tire son kimono. Hyuun lui tend la main, bandage visible. Son grand sourire — le premier sans masque : <em>"Tu avais dès le départ de la place pour tout le monde, et pourtant tu m'as quand même acceptée."</em></p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['nui']);return false;">
              <div class="rel-avatar" id="rel-av-nui-Nu"></div>
              <div class="rel-meta">
                <span class="relation-name">Nui</span>
                <span class="relation-role">Rivale comprise · L'autre moitié</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Arc 3 : Minako lit l'amour de Nui — sa malédiction la rend perméable aux émotions — et hésite pour la première fois. Est-ce que cet amour-là est meilleur que le sien ? Pas de jalousie ouverte, une tension sourde et élégante dans sa retenue.</p>
            <p>La compréhension vient quand elles cessent de se voir comme rivales : elles sont les deux moitiés d'un même rôle. Minako le lance. Nui le rattrape. Quand elles l'acceptent, Hyuun est enfin libre.</p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['arsene']);return false;">
              <div class="rel-avatar" id="rel-av-arsene-Ar"></div>
              <div class="rel-meta">
                <span class="relation-name">Arsène</span>
                <span class="relation-role">Respect mutuel · Test quotidien involontaire</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Arsène produit du plaisir en permanence — c'est un festin pour la malédiction de Minako. Elle le recrute en partie parce que c'est un test pour elle. Arsène ne sait pas qu'il est une épreuve quotidienne jusqu'à la confession mutuelle avant le tournoi. Respect mutuel entre manipulateurs.</p>
          </div>
        </div>`
      },
    ]
  },
  {
    id:'nui',
    name:'Nui',
    title:'La Chasseuse et la Protectrice',
    get avatar(){ return makeAvatar('#041428','#0c2860','N'); },
    tags:[
      {label:'Filles d\'Hadès',style:'blue'},
      {label:'Éclaireuse',style:'gray'},
      {label:'Amour',style:'pink'},
    ],
    cardBg:`linear-gradient(to bottom, #060810 0%, #0a0e20 30%, #101828 55%, #0c1420 75%, #060810 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.3">
      <circle cx="150" cy="185" r="60" fill="none" stroke="rgba(100,140,220,.5)" stroke-width="1"/>
      <circle cx="150" cy="185" r="40" fill="none" stroke="rgba(100,140,220,.3)" stroke-width=".8"/>
      <circle cx="150" cy="185" r="20" fill="none" stroke="rgba(100,140,220,.2)" stroke-width=".6"/>
      <line x1="150" y1="125" x2="150" y2="245" stroke="rgba(100,140,220,.2)" stroke-width=".8"/>
      <line x1="90"  y1="185" x2="210" y2="185" stroke="rgba(100,140,220,.2)" stroke-width=".8"/>
    </svg>`,
    sections:[
      {
        id:'info',title:'Informations',open:true,
        render:()=>`
        <div class="info-grid">
          ${field('Full name','Nui')}
          ${field('Age','21 ans (début arc 1)')}
          ${field('Gender','Femme')}
          ${field('Race','Humaine — Princesse d\'Albarossa (branche dominante)')}
          ${field('Birth place','Empire d\'Albarossa')}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Protectrice · Chasseuse · La plus forte du groupe des filles')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','—',true)}
          ${fieldFull('Hobbies','—',true)}
        </div>`
      },
      {
        id:'magic',title:'Magic / Combat',open:false,
        render:()=>`
        <div class="magic-list">
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Capacités non précisées en détail</div>
              <div class="magic-desc">La plus forte du groupe des filles d'Hadès. Elle chasse — ancré dans son identité, pas appris par nécessité. Elle n'est pas marquée par Hadès : membre de faction uniquement, tout ce qu'elle fait elle le fait par ses propres capacités.</div>
            </div>
          </div>
          <div class="magic-item">
            <div class="magic-dot"></div>
            <div class="magic-content">
              <div class="magic-title">Montée en puissance permanente</div>
              <div class="magic-desc">Sa courbe de puissance tente de suivre celle de Hyuun au maximum — il ne faut que quelques mois avant qu'elle le double à nouveau, et inversement. Chaque progression est un acte d'amour déguisé en discipline martiale. Arc 5 : veut plus que tout devenir plus forte pour protéger Hyuun après un incident de l'arc 4.</div>
            </div>
          </div>
        </div>`
      },
      {
        id:'background',title:'Background story',open:false,
        render:()=>`
        <div class="section-img">
          <svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="120" fill="#060810"/>
            <polygon points="0,120 200,50 400,80 600,30 600,120" fill="rgba(10,20,50,.8)"/>
            <polygon points="0,120 150,75 350,95 550,55 600,120" fill="rgba(8,15,40,.9)"/>
            <text x="300" y="20" text-anchor="middle" font-family="serif" font-size="10" fill="rgba(100,140,220,.3)" letter-spacing="3">PLACEHOLDER — remplacer par votre illustration</text>
          </svg>
        </div>
        <div class="cs-text">
          <p>Princesse d'Albarossa, branche dominante. Élevée pour devenir impératrice. Influencée par Nina (Hypocrisie) dans son éducation. La nature exacte de son départ d'Albarossa et de son arrivée dans la faction d'Hadès n'est pas encore développée.</p>
          <p>Pendant la survie dans l'arc 1, elle chasse avec Hyuun dans le silence absolu — communication par signes, affinité instinctive entre deux prédateurs naturels. Leur lien est sans nom, et précède l'amour.</p>
          <p>Arc 3 : elle est sauvée par Hyuun lors de son infiltration dans la capitale d'Albarossa, sans qu'il sache initialement qu'elle s'y trouvait. C'est elle qui fait le premier pas vers la réconciliation après la tension des retrouvailles.</p>
          <p>Arc 5 : part en mission spéciale avec Maelle et Wendy. Elle veut plus que tout devenir plus forte, probablement suite à un incident de l'arc 4 où elle n'a pas pu protéger Hyuun.</p>
        </div>`
      },
      {
        id:'desc',title:'Description',open:false,
        render:()=>`
        <div class="cs-text">
          <p>Bijoux, posture altière — princesse même en forêt, même couverte de sang. Cette posture n'est pas de l'arrogance : c'est une éducation totale du corps. Visage impassible. Elle laisse rarement transparaître des émotions, et uniquement avec ses proches — une main posée sur la tête de Wendy, un regard doux vers Maelle, un demi-sourire quand Beka fait une bêtise.</p>
          <p>Quand quelque chose lui fait mal, sa propre douleur disparaît derrière celle des autres. À la séparation avec Hyuun : elle s'accroupit, enlace Wendy, ne pleure pas, a la mine d'une dernière chasse ratée. Et sa main tremble pendant qu'elle tient Wendy. Elle cache tout dans cette main qui tremble. Les rares moments où son masque tombe sont dévastateurs précisément parce qu'ils sont rares.</p>
        </div>`
      },
      {
        id:'relations',title:'Relations',open:false,
        render:()=>`
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['hyuun']);return false;">
              <div class="rel-avatar" id="rel-av-hyuun-Hy"></div>
              <div class="rel-meta">
                <span class="relation-name">Hyuun</span>
                <span class="relation-role">Amour · Chasseuse silencieuse · Bouclier</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Leur lien commence avant les mots — deux prédateurs naturels qui se reconnaissent dans l'obscurité. Elle le connaît d'une manière que même Minako ne connaît pas. Son amour s'exprime entièrement par l'action : se renforcer, s'entraîner, pousser ses limites. Jamais elle ne le dit. Les rares moments où son masque tombe — un regard trop long, une main qui tremble — sont dévastateurs par leur rareté.</p>
            <p>Son amour est complémentaire à celui de Minako : Minako le lance, Nui le rattrape. Minako ouvre la porte, Nui traverse avec lui. L'une est le moteur, l'autre est le bouclier. Deux amours libres — aucune ne veut posséder Hyuun.</p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['minako']);return false;">
              <div class="rel-avatar" id="rel-av-minako-Mi"></div>
              <div class="rel-meta">
                <span class="relation-name">Minako</span>
                <span class="relation-role">Rivale comprise · L'autre moitié</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Arc 3 : chacune comprend immédiatement ce que l'autre représente pour Hyuun. Nui observe Minako avec son regard impassible en serrant le poing sous sa manche. Pas de jalousie ouverte mais une tension sourde. La résolution vient quand elles cessent de se voir comme rivales : deux moitiés d'un même rôle. Quand elles l'acceptent, Hyuun est enfin libre.</p>
          </div>
        </div>
        <div class="relation-block">
          <div class="relation-header">
            <a class="rel-link" href="#" onclick="openPanel(charById['wendy']);return false;">
              <div class="rel-avatar" id="rel-av-wendy-We"></div>
              <div class="rel-meta">
                <span class="relation-name">Wendy</span>
                <span class="relation-role">Petite sœur protégée</span>
              </div>
            </a>
          </div>
          <div class="relation-body">
            <p>Wendy est plus proche de Nui que des autres. Nui pose sa main sur la tête de Wendy — geste de protection instinctive, sans paroles. Quand Wendy fond en larmes au départ de Hyuun, c'est dans les bras de Nui qu'elle finit. À la séparation, Nui ne pleure pas et s'occupe de Wendy — sa propre douleur, elle l'avale entière.</p>
          </div>
        </div>`
      },
    ]
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   ██  GROUPES & CATÉGORIES  ██
   ════════════════════════════════════════════════════════════════════════════
   Chaque groupe = une section visuelle dans la page.
   `ids` = ordre d'affichage des personnages dans ce groupe.
   Pour ajouter un personnage existant : ajouter son `id` dans le bon tableau.
   Pour créer un groupe : ajouter un objet { id, label, ids:[] } dans groups.
   ════════════════════════════════════════════════════════════════════════════ */
const groups=[
  {
    id:'protagoniste',
    label:'Protagoniste',
    ids:['hyuun'],
  },
  {
    id:'filles',
    label:'Filles d\'Hadès',
    ids:['maelle','beka','wendy','nui'],
  },
  {
    id:'desert',
    label:'Groupe du Désert',
    ids:['minako','tetsuga','arsene'],
  },
  /* ── Ajouter un nouveau groupe ici ──
  {
    id:'arc5',
    label:'Arc 5 — Mont de l\'Épée',
    ids:['garcon-sans-magie','fille-exploratrice'],
  },
  ── */
];

/* ════════════════════════════════════════════════════════════════════════════
   ██  PERSONNAGES SUPPLÉMENTAIRES  ██
   ════════════════════════════════════════════════════════════════════════════
   Même structure que `characters` ci-dessus.
   Ajouter un nouveau personnage ici et son id dans groups[].ids.
   Voir le GUIDE en tête de fichier pour le template complet.
   ════════════════════════════════════════════════════════════════════════════ */
const extraChars=[
  {
    id:'maelle',
    name:'Maelle',
    title:'La Leader',
    get avatar(){ return makeAvatar('#1a0c08','#4a2010','Ma'); },
    tags:[
      {label:'Filles d\'Hadès',style:'blue'},
      {label:'Leader',style:'amber'},
    ],
    cardBg:`linear-gradient(to bottom,#0e0808 0%,#1e1006 30%,#2c1a08 55%,#1e1206 75%,#0e0808 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.28">
      <line x1="150" y1="80" x2="150" y2="320" stroke="rgba(220,180,80,.5)" stroke-width="1"/>
      <line x1="60" y1="200" x2="240" y2="200" stroke="rgba(220,180,80,.4)" stroke-width="1"/>
      <circle cx="150" cy="200" r="55" fill="none" stroke="rgba(220,180,80,.25)" stroke-width="1"/>
    </svg>`,
    sections:[
      {id:'info',title:'Informations',open:true,render:()=>`
        <div class="info-grid">
          ${field('Full name','Maelle')}
          ${field('Age','24 ans (début arc 1)')}
          ${field('Gender','Femme')}
          ${field('Race','Humaine')}
          ${field('Birth place','—',true)}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Leader · Grande sœur · Point de stabilité du groupe')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','—',true)}
          ${fieldFull('Hobbies','—',true)}
        </div>`},
      {id:'background',title:'Background story',open:false,render:()=>`
        <div class="cs-text"><p>À compléter.</p></div>`},
      {id:'desc',title:'Description',open:false,render:()=>`
        <div class="cs-text"><p>Blonde, regard déterminé. Elle dégage quelque chose de solide — pas d'invulnérable, mais de fiable. Cheffe du groupe, considère toutes les autres comme ses petites sœurs. A un pressentiment sur Hyuun dès la première rencontre. Fait des choix d'adulte — c'est-à-dire des choix où elle laisse quelque chose partir parce qu'elle sait qu'elle ne peut pas tout retenir. Elle voit le regard de Hyuun avant son départ, hésite, entre dans l'auberge.</p></div>`},
      {id:'relations',title:'Relations',open:false,render:()=>`
        <div class="cs-text"><p style="color:rgba(255,255,255,.25);font-style:italic;">Relations à compléter.</p></div>`},
    ]
  },
  {
    id:'beka',
    name:'Beka',
    title:'La Combattante',
    get avatar(){ return makeAvatar('#1a0808','#5a1010','Be'); },
    tags:[
      {label:'Filles d\'Hadès',style:'blue'},
      {label:'Combattante',style:'coral'},
      {label:'Fille de Tetsuga',style:'pink'},
    ],
    cardBg:`linear-gradient(to bottom,#100808 0%,#201006 30%,#301008 55%,#200c06 75%,#100808 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.28">
      <line x1="100" y1="120" x2="200" y2="280" stroke="rgba(200,60,40,.6)" stroke-width="1.5"/>
      <line x1="200" y1="120" x2="100" y2="280" stroke="rgba(200,60,40,.6)" stroke-width="1.5"/>
      <circle cx="150" cy="200" r="50" fill="none" stroke="rgba(200,60,40,.2)" stroke-width="1"/>
    </svg>`,
    sections:[
      {id:'info',title:'Informations',open:true,render:()=>`
        <div class="info-grid">
          ${field('Full name','Beka')}
          ${field('Age','19 ans (début arc 1)')}
          ${field('Gender','Femme')}
          ${field('Race','Humaine')}
          ${field('Birth place','Pays féodal ravagé par la guerre')}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Combattante · Protectrice autoproclamée')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','—',true)}
          ${fieldFull('Hobbies','—',true)}
        </div>`},
      {id:'background',title:'Background story',open:false,render:()=>`
        <div class="cs-text">
          <p>Pays féodal d'inspiration japonaise ravagé par la guerre. Mère tuée. Disparue, puis recueillie par la faction d'Hadès. Elle est membre de la faction, pas marquée.</p>
          <p><strong style="color:rgba(200,120,48,.8)">Secret majeur :</strong> Beka est la fille de Tetsuga. Ni l'un ni l'autre ne se reconnaît quand les deux groupes se retrouvent dans l'arc 3 — Tetsuga cherche une petite fille, pas une jeune guerrière. Leur tempérament identique (fierté, combativité, rage, besoin de prouver) est l'indice. La révélation arrive dans l'arc 5 au Mont de l'Épée.</p>
        </div>`},
      {id:'desc',title:'Description',open:false,render:()=>`
        <div class="cs-text"><p>Cheveux ondulés, expression mature. Fierté, combativité, rage — et besoin de prouver. Refuse Hyuun au départ par fierté, puis devient la première à vouloir apprendre le combat de survie auprès de lui. La plus visiblement marquée par son départ — court au port. Dans l'arc 3, lui reproche d'être parti sans savoir qu'Hadès l'a rejeté.</p></div>`},
      {id:'relations',title:'Relations',open:false,render:()=>`
        <div class="cs-text"><p style="color:rgba(255,255,255,.25);font-style:italic;">Relations à compléter.</p></div>`},
    ]
  },
  {
    id:'wendy',
    name:'Wendy',
    title:'La Mémoire',
    get avatar(){ return makeAvatar('#080e1a','#102040','We'); },
    tags:[
      {label:'Filles d\'Hadès',style:'blue'},
      {label:'La Mémoire',style:'amber'},
    ],
    cardBg:`linear-gradient(to bottom,#060a12 0%,#0c1220 30%,#101828 55%,#0c1220 75%,#060a12 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.3">
      <rect x="90" y="110" width="120" height="160" rx="3" fill="none" stroke="rgba(180,200,220,.5)" stroke-width="1"/>
      <line x1="105" y1="145" x2="195" y2="145" stroke="rgba(180,200,220,.3)" stroke-width=".8"/>
      <line x1="105" y1="162" x2="195" y2="162" stroke="rgba(180,200,220,.25)" stroke-width=".8"/>
      <line x1="105" y1="179" x2="175" y2="179" stroke="rgba(180,200,220,.2)" stroke-width=".8"/>
      <line x1="105" y1="196" x2="185" y2="196" stroke="rgba(180,200,220,.2)" stroke-width=".8"/>
    </svg>`,
    sections:[
      {id:'info',title:'Informations',open:true,render:()=>`
        <div class="info-grid">
          ${field('Full name','Wendy')}
          ${field('Age','16 ans (début arc 1)')}
          ${field('Gender','Femme')}
          ${field('Race','Humaine')}
          ${field('Birth place','—',true)}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Mémoire du groupe · Documentariste · Pont émotionnel')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','—',true)}
          ${fieldFull('Hobbies','Documenter — carnet, croquis, botanique, bestiaire')}
        </div>`},
      {id:'background',title:'Background story',open:false,render:()=>`
        <div class="cs-text">
          <p>Pendant la survie dans la forêt, elle documente tout dans son carnet — champignons, plantes, créatures. Elle devient la mémoire du groupe et trouve ainsi sa dignité et son utilité. Le carnet évolue visuellement à travers les tomes.</p>
          <p><strong style="color:rgba(200,120,48,.8)">Objet symbolique :</strong> elle noue un bout de tissu à la main de Hyuun dans un magasin après une coupure. Ce bandage devient l'objet le plus symbolique de toute l'histoire. Hyuun ne l'enlèvera jamais.</p>
        </div>`},
      {id:'desc',title:'Description',open:false,render:()=>`
        <div class="cs-text"><p>Yeux clairs, air doux. La plus fragile émotionnellement — mais fragile ne veut pas dire inutile. Elle ne cache rien parce qu'elle ne pense pas à cacher. S'effondre en pleurant au départ de Hyuun. Dans l'arc 3 : tire le kimono de Minako pour l'inclure — elle est le pont entre Minako et le groupe.</p></div>`},
      {id:'relations',title:'Relations',open:false,render:()=>`
        <div class="cs-text"><p style="color:rgba(255,255,255,.25);font-style:italic;">Relations à compléter.</p></div>`},
    ]
  },
  {
    id:'tetsuga',
    name:'Tetsuga',
    title:'L\'Ancien Soldat',
    get avatar(){ return makeAvatar('#0a0c0e','#2a3038','Te'); },
    tags:[
      {label:'Groupe du Désert',style:'gray'},
      {label:'Quatuor',style:'amber'},
      {label:'Non-marqué',style:'coral'},
      {label:'Père de Beka',style:'pink'},
    ],
    cardBg:`linear-gradient(to bottom,#080a0c 0%,#141820 30%,#1c2430 55%,#141820 75%,#080a0c 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.3">
      <line x1="150" y1="80" x2="150" y2="320" stroke="rgba(160,180,200,.6)" stroke-width="2.5"/>
      <line x1="110" y1="150" x2="190" y2="150" stroke="rgba(160,180,200,.4)" stroke-width="1.5"/>
      <line x1="120" y1="130" x2="180" y2="130" stroke="rgba(160,180,200,.3)" stroke-width="1"/>
    </svg>`,
    sections:[
      {id:'info',title:'Informations',open:true,render:()=>`
        <div class="info-grid">
          ${field('Full name','Tetsuga')}
          ${field('Age','38 ans (arc 2)')}
          ${field('Gender','Homme')}
          ${field('Race','Humain — Non-marqué')}
          ${field('Birth place','Pays féodal d\'inspiration japonaise')}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Force brute · Marteau du duo marteau-scalpel · Ancre martiale')}
          ${field('Weapon','Katana')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','Alcool (ex-alcoolique)')}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','—',true)}
          ${field('Dislikes','Le théâtral · La lâcheté')}
          ${fieldFull('Hobbies','—',true)}
        </div>`},
      {id:'background',title:'Background story',open:false,render:()=>`
        <div class="cs-text">
          <p>Ancien soldat d'une armée régulière d'un pays féodal. Pays mis à feu, femme tuée, fille disparue (c'est Beka — il ne le sait pas). Sombra dans l'alcool puis eut le déclic : "s'il ne fait rien, il ne se passera rien." Depuis, parcourt le monde en se battant pour que sa fille entende son nom.</p>
          <p>Arc 5 : part au Mont de l'Épée avec Hyuun et Beka. S'entraîne à l'école du dieu de l'épée du vent — même école que Beka sans le savoir. La révélation se produit progressivement par accumulation de détails.</p>
        </div>`},
      {id:'desc',title:'Description',open:false,render:()=>`
        <div class="cs-text"><p>Cassé. Il a survécu en se débarrassant de tout sauf d'une chose : sa fille. Franc par économie d'énergie. Peut être une ordure si ça sert sa quête. Se fout des faibles. Un seul interdit absolu : les enfants ne sont pas une cible. Son rire — rare, spontané — désarçonne complètement Hyuun lors de leur première mission.</p></div>`},
      {id:'relations',title:'Relations',open:false,render:()=>`
        <div class="cs-text"><p style="color:rgba(255,255,255,.25);font-style:italic;">Relations à compléter.</p></div>`},
    ]
  },
  {
    id:'arsene',
    name:'Arsène',
    title:'Le Voleur Magnifique',
    get avatar(){ return makeAvatar('#0e0a18','#2a1a40','Ar'); },
    tags:[
      {label:'Quatuor',style:'amber'},
      {label:'Infiltrateur',style:'coral'},
    ],
    cardBg:`linear-gradient(to bottom,#0a0810 0%,#140e20 30%,#1e1430 55%,#140e20 75%,#0a0810 100%)`,
    cardSvg:`<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;opacity:.28">
      <circle cx="150" cy="200" r="70" fill="none" stroke="rgba(140,100,220,.4)" stroke-width="1" stroke-dasharray="6 4"/>
      <circle cx="150" cy="200" r="40" fill="none" stroke="rgba(140,100,220,.25)" stroke-width=".8" stroke-dasharray="4 3"/>
      <circle cx="150" cy="200" r="10" fill="rgba(140,100,220,.15)"/>
    </svg>`,
    sections:[
      {id:'info',title:'Informations',open:true,render:()=>`
        <div class="info-grid">
          ${field('Full name','Arsène')}
          ${field('Age','23 ans (arc 2)')}
          ${field('Gender','Homme')}
          ${field('Race','Humain')}
          ${field('Birth place','—',true)}
          ${field('Birthday','—',true)}
          ${field('Sexuality','—',true)}
          ${field('Role','Infiltrateur · Voleur d\'informations · Frisson permanent')}
          ${field('Favorite food','—',true)}
          ${field('Favorite drink','—',true)}
          ${field('Favorite animal','—',true)}
          ${field('Favorite color','—',true)}
          ${field('Likes','L\'adrénaline · Le vol · Le plaisir')}
          ${field('Dislikes','La rigidité · L\'ennui')}
          ${fieldFull('Hobbies','Vol de charme · Redistribution aux pauvres')}
        </div>`},
      {id:'background',title:'Background story',open:false,render:()=>`
        <div class="cs-text">
          <p>Famille modeste. Parents tués par une famille noble pour dette impayée. Réponse : s'introduit au bal, charme la fille, la pousse par la fenêtre, coupe l'oreille du père et la sert en cocktail à la mère, redistribue la bourse aux pauvres. Depuis : vole les véreux, charme les demoiselles, embrasse leur main et se redresse leur bague entre les dents.</p>
          <p>Recruté par Minako aux inscriptions du tournoi après une course-poursuite où elle le piste par le plaisir qu'il prend à fuir. Arc 5 : part avec Minako chercher la divinité qui a maudit les kitsune.</p>
        </div>`},
      {id:'desc',title:'Description',open:false,render:()=>`
        <div class="cs-text"><p>Charmant un instant, glacial l'instant suivant. Il transforme la douleur en art. Moralité singulière : un code tordu mais existant. L'adrénaline du vol est une drogue — il ne peut pas s'empêcher. Trouve Hyuun ennuyeux dans sa rigueur au début. Tension permanente avec Tetsuga — miroir profond : deux réponses opposées à la même perte, Arsène vit dans le présent fébrile, Tetsuga court vers un futur impossible.</p></div>`},
      {id:'relations',title:'Relations',open:false,render:()=>`
        <div class="cs-text"><p style="color:rgba(255,255,255,.25);font-style:italic;">Relations à compléter.</p></div>`},
    ]
  },
];

/* Fusionne avec les personnages existants dans l'ordre des groupes */
const allCharsById={};
[...characters, ...extraChars].forEach(ch=>{ allCharsById[ch.id]=ch; });
