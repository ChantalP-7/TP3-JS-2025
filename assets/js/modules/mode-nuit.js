// Variables

// Sélection HTML
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = document.querySelectorAll("[data-mode-option]");

export default function initMode() {
    //Récupérer ce que l'utilisateur a choisi
    const modeEnregistre = localStorage.getItem("theme") || "nuit";
    changerMode(modeEnregistre);
    parentHTML.addEventListener("click", auClicBouton);
}

/**
 * Fonction qui prend en paramètre un événement qui au clic du bouton, va changer le mode jour ou nuit, et qui enregistre la préférence
 * @param {*} evenement 
 */

function auClicBouton(evenement) {
    //Si on utilise la propagation des événements on utilise target
    const elementClic = evenement.target;
    //On vérifie sur quoi on a cliqué
    const bouton = elementClic.closest("[data-mode-option]");

    //Si le bouton n'est pas null, donc on a cliqué sur le bouton ou son enfant
    if (bouton) {
        //Dataset s'écrit en camelCase si il possède un tiret
        const mode = bouton.dataset.modeOption;

        //On enregistre
        enregistrerMode(mode);
    }
}


/***
 * Fonction qui inverse l'affichage des boutons de mode de jour et de nuit.
 */
function changerApparenceBoutons(nouveauMode) {
    boutonsHTML.forEach(function (boutonHTML) {
        const mode = boutonHTML.dataset.modeOption;
        boutonHTML.classList.toggle("invisible", mode == nouveauMode);
    });
}

/**
 * Fonction qui sert à modifier le mode nuit
 * @param {String} mode
 */
function changerMode(mode) {
    document.body.dataset.theme = mode;
    changerApparenceBoutons(mode);
}

/**
 *Fonction qui sert à enregistre le mode nuit ou jour dans le localstorage
 * @param {String} nouveauMode
 */
function enregistrerMode(nouveauMode) {
    changerMode(nouveauMode);
    const choix = [
        { id: 1, nom: "nuit" },
        { id: 2, nom: "jour" },
    ];
    const listeChoix = JSON.stringify(choix);
    localStorage.setItem("theme", listeChoix);
}