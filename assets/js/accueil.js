// Variables

const tableauProduits = [
  {
    id: 0,
    titre: "Nos fromages",
    description:
      "Nos fromage sont fait à partir de lait de vaches, de chèvre et de brebis nourries biologiquement. Venez découvrir notre grande variété de brie, camembert et fromage de chèvre. Nous avons aussi un assortiment de fromage bleu et de fromage frais aux herbes",
    prix: 23,
    photo: " nos-fromAges-fins",
    boutonAchat: "J'achète",
    boutonPlus: "En savoir plus",
  },

  {
    id: 1,
    titre: "Notre verger",
    description:
      "Les pommes, cultivées avec amour et soin, sont transformées en délices qui éveillent les sens, offrant à chaque visiteur un morceau de nature dans sa forme la plus pure.",
    prix: 50,
    photo: " pommes-Du-verger",
    boutonPlus: "En savoir plus",
    boutonAchat: "J'y vais",
  },

  {
    id: 2,
    titre: "Oeufs et produits bios",
    description:
      "Notre volaille est nourrie de grains bios. Nos oeufs sont frais du jour. Nous cuisinons des plats pour la plupart végétariens. Nous utilisons nos oeufs et produits laitier. Aucune cruauté animale. Nous sommes une ferme végétarienne.",
    prix: 21,
    photo: "nos-oeufs-Frais ",
    boutonPlus: "En savoir plus",
    boutonAchat: "J'achète",
  },

  {
    id: 3,
    titre: "Potager communautaire",
    description:
      "Venez cultiver vos légumes et herbes fraîches. Nous utilisons de la terre bien aérée, épurée et enrichie d'engrais biologique. Surtout, elle est exempte de tout produits chimiques. Découvrez la satisfaction de semer et cueillir vous-mêmes vos aliments en pleine nature.",
    prix: 45,
    photo: " le-Potager-communAutaIRE",
    boutonPlus: "En savoir plus",
    boutonAchat: "Je m'inscrit",
  },

  {
    id: 4,
    titre: "Visites familiales",
    description:
      "Les familles ont l'occasion de passer des bons moments avec nos animaux. Les enfants peuvent interagir et caresser plusieurs d'entre eux en toute sécurité sous l'oeil attentif d'un membre de l'équipe. Rires et plaisir garantis!",
    prix: 35,
    photo: "visiTes-familiales ",
    boutonPlus: "En savoir plus",
    boutonAchat: "J'y vais",
  },

  {
    id: 5,
    titre: "Ateliers culinaires",
    description:
      "Nos ateliers culinaires sont conçus pour tous les niveaux de connaissances. Nos formateur.trice.s sont des passionné.e.s de la gastronomie végétarienne. Plusieur.e.s ont des restaurant ou des café-bistro végétariens.",
    prix: 100,
    photo: " Ateliers-culinaires ",
    boutonPlus: "En savoir plus",
    boutonAchat: "Je m'inscrit",
  },
];

let tabProduits = [...tableauProduits];

// Sélecteurs

const ficheHTML = document.querySelector(".fiche");
const titreFicheHTML = document.querySelector("aside  h1");
const pictureFicheHTML = document.querySelector(".picture-texte");
const cartesProduit = document.querySelectorAll(".carteImage");
const conteneurProduitsAAfficher = document.querySelector(".cartesProduits");
const filtreAlphaAsc = document.querySelector(".tri-alpha-asc");
const filtreAlphaDes = document.querySelector(".tri-alpha-desc");
const filtrePrixAsc = document.querySelector(".tri-prix-asc");
const filtrePrixDesc = document.querySelector(".tri-prix-desc");

// FONCTIONS

function initialiser() {
  afficheListeProduits();

  filtreAlphaAsc.addEventListener("click", auBoutonTriAsc);
  filtreAlphaDes.addEventListener("click", auBoutonTriDesc);
  filtrePrixAsc.addEventListener("click", auBoutonTriPrixAsc);
  filtrePrixDesc.addEventListener("click", auBoutonTriPrixDesc);

  const fichesProduits = document.querySelectorAll(".carte");

  for (let i = 0; i < fichesProduits.length; i++) {
    const produit = fichesProduits[i];
    produit.addEventListener("click", auClicImage);
  }
}

/**
 * La fonction genererListeProduits() génère 6 produits en utilsant la fonction insertAdjacentHTML avec plusieurs paramètres. La variable template contient les éléments qui seront générés au chargement de la page.
 *
 * @param {*} id
 * @param {*} nomProduit
 * @param {*} prix
 * @param {*} photo
 * @param {*} bouton
 */
function genereListeProduits(id, nomProduit, prix, photo, bouton) {
  let src = formatSrc(photo);
  const template = `<div class="carte" id=" ${id}">
        <img class="carteImage" src="${src}" alt=${nomProduit}">
        <h3 >${nomProduit}</h3>                     
    </div>`;
  conteneurProduitsAAfficher.insertAdjacentHTML("beforeend", template);
  let ajouterProduits = conteneurProduitsAAfficher.lastElementChild;
  ajouterProduits.addEventListener("click", auClicImage);
}

/**
 * Fonction qui affiche les produits. Elle appelle la fonction genereListeProduits qui prend 6 paramètre
 *
 *
 * */
function afficheListeProduits() {
  for (let i = 0; i < tableauProduits.length; i++) {
    const produit = tableauProduits[i];
    genereListeProduits(
      produit.id,
      produit.titre,
      produit.prix,
      produit.photo,
      produit.bouton
    );
  }
}

/**
 * Fonction afficheUnProduit prend en paramètre le id d'un produit. Dans une boucle, je chercher le id de chaque produit et si le id correspond au id du paramètre, on affiche les infos du produits en appelant la fonction afficheUnProduit qui prend en paramètre 6 éléments du produit.
 * @param {*} produitID
 */
function afficheUnProduit(produitID) {
  for (let i = 0; i < tableauProduits.length; i++) {
    const produit = tableauProduits[i];
    if (produitID == produit.id) {
      genereUnProduit(
        produit.id,
        produit.titre,
        produit.description,
        produit.prix,
        produit.photo,
        produit.boutonAchat
      );
    }
  }
}

/** Fonction qui prend en paramètre 6 élément qui génère une fiche avec tous les éléments.
 *
 * @param {*} id
 * @param {*} titre
 * @param {*} description
 * @param {*} prix
 * @param {*} photo
 * @param {*} bouton
 */
function genereUnProduit(id, titre, description, prix, photo, bouton) {
  let src = formatSrc(photo);
  const ficheTemplate = `<div id="${id}">            
        <img src="${src}" alt="${titre}">
        <h2 class="h2">${titre}</h2>
        <p>${description}</p>
        <p class="prix carteImageGras">Prix : ${prix}$</p>
        <div class="bouton-centre">
        <br>
            <a class="bouton" href="#">${bouton}</a>
        </div>
    </div>`;
  pictureFicheHTML.innerHTML = ficheTemplate;
}

// SECTION FONCTIONS TRI...

/** Fonction qui génère la liste de produits trié alphabétiquement, croissant ou décroissant. Elle utilise un listener pour appeler la fonction auClicImage
 *
 * @param {*} id
 * @param {*} nomProduit
 * @param {*} prix
 * @param {*} photo
 * @param {*} bouton
 */
function genereListeProduitsTries(id, nomProduit, prix, photo, bouton) {
  let src = formatSrc(photo);
  const template = `<div class="carte" id=" ${id}">
        <img class="carteImage" src="${src}" alt=${nomProduit}">
        <h3 >${nomProduit}</h3>    
    </div>`;
  conteneurProduitsAAfficher.insertAdjacentHTML("beforeend", template);
  let ajouterProduits = conteneurProduitsAAfficher.lastElementChild;
  ajouterProduits.addEventListener("click", auClicImage);
}

/** Fonction qui génère une liste de produits par prix descendant ou ascentdant. Elle insertAdjacentHTML et ajoute un écouteur qui appelle la fonction auClicImage
 *
 * @param {*} id
 * @param {*} nomProduit
 * @param {*} prix
 * @param {*} photo
 * @param {*} bouton
 */
function genereListeProduitsPrix(id, nomProduit, prix, photo, bouton) {
  let src = formatSrc(photo);
  const template = `<div class="carte" id=" ${id}">
        <img class="carteImage" src="${src}" alt=${nomProduit}">
        <h3 >${nomProduit}</h3> 
        <h3 >${prix} $</h3>         
    </div>`;
  conteneurProduitsAAfficher.insertAdjacentHTML("beforeend", template);
  let ajouterProduits = conteneurProduitsAAfficher.lastElementChild;
  ajouterProduits.addEventListener("click", auClicImage);
}

/** Fonction qui affiche la liste des produits générés par ordre alphabétique, en appelant la fonction de génération de produit par ordre alphabétique ascendant ou descendant
 *
 * @param {*} tabProduits
 * @param {*} titre
 */
function afficheListeProduitsTries(tabProduits, titre) {
  conteneurProduitsAAfficher.innerHTML = "";
  for (let i = 0; i < tabProduits.length; i++) {
    const produit = tabProduits[i];
    genereListeProduitsTries(
      produit.id,
      produit.titre,
      produit.prix,
      produit.photo,
      produit.bouton
    );
  }
}

/** Fonction qui affiche la liste des produits générés par prix, en appelant la fonction de génération de produit par prix ascendant ou descendant
 *
 * @param {*} tabProduits
 * @param {*} titre
 */
function afficheListeProduitsPrix(tabProduits, titre) {
  conteneurProduitsAAfficher.innerHTML = "";

  for (let i = 0; i < tabProduits.length; i++) {
    const produit = tabProduits[i];
    genereListeProduitsPrix(
      produit.id,
      produit.titre,
      produit.prix,
      produit.photo,
      produit.bouton
    );
  }
}

/** Fonction qui trie le tableau en paramètre en ordre alphabétique croissant
 *
 * @param {*} tabProduit
 * @returns tabProduit trié alphabétique croissant
 */
function triProduitsAscendant(tabProduit) {
  tabProduit.sort(function (a, b) {
    if (a.titre < b.titre) {
      return -1;
    } else if (a.titre > b.titre) {
      return 1;
    } else {
      return 0;
    }
  });
  return tabProduit;
}

/** Fonction qui trie le tableau en paramètre en ordre alphabétique décroissant
 *
 * @param {*} tabProduit
 * @returns tabProduit trié alphabétique décroissant
 */
function triProduitsDescendant(tabProduit) {
  tabProduit.sort(function (a, b) {
    if (a.titre > b.titre) {
      return -1;
    } else if (a.titre < b.titre) {
      return 1;
    } else {
      return 0;
    }
  });
  return tabProduit;
}

/** Fonction qui trie le tableau en paramètre par prix croissant
 *
 * @param {*} tabProduit
 * @returns tabProduit trié prix croissant
 */
function triProduitsPrixAsc(tabProduit) {
  tabProduit.sort(function (a, b) {
    return a.prix - b.prix;
  });
  return tabProduit;
}

/** Fonction qui trie le tableau en paramètre par prix décroissant
 *
 * @param {*} tabProduit
 * @returns tabProduit trié prix décroissant
 */
function triProduitsPrixDesc(tabProduit) {
  tabProduit.sort(function (a, b) {
    return b.prix - a.prix;
  });
  return tabProduit;
}

/** Section des fonctions qui au clic d'un bouton, tri alphabétiquement asc ou des et tri par prix asc ou desc, et affiche les produits dans l'ordre trié
 *
 * */
function auBoutonTriAsc() {
  pictureFicheHTML.innerHTML = "";
  const trieAsc = triProduitsAscendant(tabProduits);
  afficheListeProduitsTries(trieAsc, "titre");
}

function auBoutonTriDesc() {
  pictureFicheHTML.innerHTML = "";
  const trieDesc = triProduitsDescendant(tabProduits);
  afficheListeProduitsTries(trieDesc, "titre");
}

function auBoutonTriPrixAsc() {
  pictureFicheHTML.innerHTML = "";
  const triPrixAsc = triProduitsPrixAsc(tabProduits);
  afficheListeProduitsPrix(triPrixAsc, "prix");
}

function auBoutonTriPrixDesc() {
  pictureFicheHTML.innerHTML = "";
  const triPrixDesc = triProduitsPrixDesc(tabProduits);
  afficheListeProduitsPrix(triPrixDesc, "prix");
}

/** Fonction qui prend une événement en paramètre qui devient le déclencheur. Elle appelle la fonction enleveLesBordure d'un tableau, la fonction ajouteLaBordure au déclencheur et la fonction afficherUnProduit avec le id du déclencheur.
 *
 * @param {*} evenement
 */
function auClicImage(evenement) {
  const fichesProduits = document.querySelectorAll(".carte");
  enleveLesBordures(fichesProduits);
  const declencheur = evenement.currentTarget;
  const produitId = declencheur.id;
  ajouteLaBordure(declencheur);
  afficheUnProduit(produitId);
}

/** Fonction qui ajoute une classe, et qui ajoute une bordure à un élément.
 *
 * @param {*} elementHTML
 */
function ajouteLaBordure(elementHTML) {
  elementHTML.classList.add("image-cliquee");
}

/** Fonction qui enlève la classe .image-cliquée et donc, la bordure de chaque produit du tableau en utilisant la méthode forEach.
 *
 * @param {*} tableau
 */
function enleveLesBordures(tableau) {
  tableau.forEach((element) => {
    element.classList.remove("image-cliquee");
  });
}

/** Fonction qui formate et concatène la chaînte de caractères du lien de la photo pour chaque produit.
 *
 * @param {*} nom
 * @returns le lien concaténé de l'image
 */
function formatSrc(nom) {
  nom = nom.trim();
  nom = nom.toLowerCase();
  let srcPhoto = `assets/img/imgPrincipale/${nom}.jpg`;
  return srcPhoto;
}

initialiser();
