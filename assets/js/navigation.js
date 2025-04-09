// Variables

const tableauNavigation = [
    {
        nom: "Accueil",
        lien: "index.html"
    },
    {
        nom: "Boutique",
        lien: "formulaire-achat.html"
    },
    {
        nom: "À propos",
        lien: "a-propos.html"
    }    
];

// Sélecteurs

const navigationHTML = document.querySelector('.nav');


// FONCTIONS


/**
 * Fonction qui initialise la page. Elle fait appel à la fonction creerNavigation(). Pour mettre en évidence l'onglet du menu de navigation dont le url est actif, j'ai utlisé la fonction document.URL que j'ai trouvé sur ce site : https://developer.mozilla.org/fr/docs/Web/API/Document/URL
 */

function initialisation() {
    creerNavigation();
    const href = document.querySelectorAll('.nav a');
    const currentURL = document.URL;
    for (let i = 0; i < href.length; i++) {   
    if (href[i] == currentURL) {
        href[i].style.backgroundColor = "rgb(131, 152, 196)";
        href[i].style.color = "rgb(255, 255, 255)";
        }    
    }
}

/**
 * Fonction qui crée des lien pour ajouter à la navigation
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns un lien (a), un nom (b)
 */

function creeLien(a, b) {
    const href = `<a href="${a}">${b}</a>`;
   navigationHTML.insertAdjacentHTML('beforeend', href)
}

/**
 * Fonction qui crée une navigation dynamiquement. Elle appelle la fonction ajouterObjetsTableau(). Elle appelle ensuite, dans une boucle la fonction creeLien ce qui permet d'ajouter dynamiquement les valeurs de chaque objet dans la balise a 
 */


function creerNavigation() {
    //ajouterObjetsTableau();
    for (const nav of tableauNavigation) {
        creeLien(nav.lien, nav.nom);
    }
}


// Exécution du code

initialisation();