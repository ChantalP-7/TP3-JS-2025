let indexActuel = 0;

const formulaireHTML = document.querySelector("form");
const champsHTML = formulaireHTML.querySelectorAll("[name]");
const champsNomsHTML = formulaireHTML.querySelectorAll("[data-champ]");
const sectionResume = formulaireHTML.querySelector(".resume");
const sectionsHTML = formulaireHTML.querySelectorAll("[data-index]");
const dateHTML = formulaireHTML.querySelector("[name='date']");

const barreProgression = formulaireHTML.querySelector(".progress-bar__fill");

const caseACocher = formulaireHTML.querySelector(
  '[name="cueilletteSuccursale"]'
);
const caseACocher2 = formulaireHTML.querySelector('[name="livraison"]');

const boutonSuivantHTML = formulaireHTML.querySelector(
  ".nav-bouton [data-direction='1']"
);
const boutonPrecedentHTML = formulaireHTML.querySelector(
  ".nav-bouton [data-direction='-1']"
);
const boutonEnvoi = formulaireHTML.querySelector("input[type='submit']");

function init() {
  formulaireHTML.addEventListener("submit", onSoumissionFormulaire);

  formulaireHTML.addEventListener("reset", onReinitFormulaire);

  afficherProgression(1, 3);

  champsHTML.forEach(function (champHTML) {
    champHTML.addEventListener("change", onChangementChamp);
  });

  boutonSuivantHTML.addEventListener("click", onClicNavBouton);
  boutonPrecedentHTML.addEventListener("click", onClicNavBouton);

  validerFormulaire();

  afficherSection(indexActuel);
}

//==================================================================
// SECTION ÉVÉNEMENTS
//==================================================================

/**
 * Fonction qui permet de réinitialiser le formulaire
 * @param {*} evenement
 */

function onReinitFormulaire(evenement) {
  evenement.preventDefault();
}

/**
 * Fonction qui prend en paramètre un événement qui permet d'éviter le comportement par défaut de l'input submit. Ça permet de valider le formulaire avant soumission.
 * @param {*} evenement
 */

function onSoumissionFormulaire(evenement) {
  evenement.preventDefault();

  if (validerFormulaire()) {
    boutonEnvoi.classList.add("soumissionOk");
    alert("Félicitation, le formulaire a bien été rempli !");
    //formulaireHTML.submit();
  }
}

/**
 * Fonction qui prend en paramètre un événement déclencheur. On récupère le nom et la valeur du déclencheur et on valide les champs au changement. On utilise plusieurs méthode dont les patterns.
 *
 * @param {*} evenement
 */

function onChangementChamp(evenement) {
  let champHTML = evenement.currentTarget;

  /*if(champHTML.name == "nom") {

        champHTML.value = champHTML.value.trim().replace(/([a-zA-Z]{2, 30}\s [a-zA-Z]{2, 30})/, "$1 $2").toUpperCase();
    }*/

  if (champHTML.name == "courriel") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/([a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+i)/, "$1 $2")
      .toUpperCase();
  }

  if (champHTML.name == "telephone") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/\(?(\d{3})\)?\s?-?(\d{3})\s?-?(\d{4})/, "($1) $2-$3");
  }

  if (champHTML.name == "adresse") {
  }

  if (champHTML.name == "codePostal") {
    champHTML.value = champHTML.value
      .trim()
      .replace(/(\w\d\w)\s?(\d\w\d)/, "$1 $2")
      .toUpperCase();
  }

  validerChamp(champHTML);
  validerFormulaire();
  afficherSection(indexActuel);
  afficherNavigation();
}

/**
 * Fonction qui prend en paramètre un événement déclencheur qui permet de connaitre l'index de la section. En cliquant sur le bouton de navigation, on se déplace entre les sections.
 * @param {*} evenement
 * @returns un booleen
 */

function onClicNavBouton(evenement) {
  const declencheur = evenement.currentTarget;
  let pageIndex = Number(declencheur.dataset.index);
  let direction = Number(declencheur.dataset.direction);
  if (
    (pageIndex === 0 && direction === -1) ||
    (pageIndex === 2 && direction === 1)
  ) {
    return false;
  }
  indexActuel += direction;
  afficherSection(indexActuel);
}

//=========================================================================
// SECTION FONCTIONS
//=========================================================================

/**
 * Funtion qui affiche la section selon l'index entré en paramètre
 * @param {*} index
 */

function afficherSection(index) {
  cacherSections();
  const sectionHTML = sectionsHTML[index];
  sectionHTML.classList.remove("invisible");
  afficherNavigation();
  afficherProgression(index + 1, sectionsHTML.length);
  validerSection(index);
}

/**
 * Fonction qui cache toutes les sections
 */

function cacherSections() {
  for (const section of sectionsHTML) {
    section.classList.add("invisible");
  }
}

/**
 * Fonction qui calcule les deux paramêtre pour permettre à la barre de progresser ou régresser. L'index de la section ainsi que le total des sections permettent ce calcul.
 * @param {*} etape
 * @param {*} totalEtapes
 */

function afficherProgression(etape, totalEtapes) {
  barreProgression.style.width = `${(etape / totalEtapes) * 100}%`;
}

//===============================================================
// SECTION VALIDATIONS
//===============================================================

/**
 * Fonction qui valide le formulaire pour activer ou désactiver le bouton Envoi.
 * @returns estValide
 */

function validerFormulaire() {
  const estValide = formulaireHTML.checkValidity();

  if (estValide == false) {
    boutonEnvoi.disabled = "true";
  } else {
    boutonEnvoi.removeAttribute("disabled");
  }
  return estValide;
}

/**
 * Fonction qui valide chaque champ avec la fonction checkValidity(). Si le champ est valide, la valeur est imprimer dans la section correspondante.
 * @param {*} champHTML
 */

function validerChamp(champHTML) {
  const estValide = champHTML.checkValidity();
  if (estValide) {
    modifierResume(champHTML, estValide);
  }
  champHTML.classList.toggle("erreur", estValide == false);
}

/**
 * Function qui valide chaque section selon l'index de la section. les champs sont validés par section
 * @param {*} indexSection
 * @returns
 */

function validerSection(indexSection) {
  const sectionHTML = sectionsHTML[indexSection];
  const champsChaqueSection = sectionHTML.querySelectorAll("[name]");
  let estValide = [];
  for (const champ of champsChaqueSection) {
    console.log(champ);
    estValide.push(champ.checkValidity());
  }
  console.log(estValide.includes(false) == false);
  return estValide.includes(false) == false;
}

/**
 * Fonction qui permet la navigation entre les sections du formulaire en s'assurant de ne pas dépasser les section en avançant ou reculant.
 */

function afficherNavigation() {
  boutonPrecedentHTML.classList.toggle("invisible", indexActuel <= 0);
  boutonSuivantHTML.classList.toggle(
    "inactif",
    indexActuel > sectionsHTML.length - 2 ||
      validerSection(indexActuel) == false
  );
  boutonEnvoi.classList.toggle(
    "invisible",
    indexActuel != sectionsHTML.length - 1
  );
}

/**
 * Fonction qui prend un paramètre de validation et si c'est valide, on entre les valeurs champ les champs du résumé, sinon les valeurs s'effacent.
 * @param {*} estActif
 */

function activerCueillette(estActif) {
  const champsDate = formulaireHTML.querySelector("[name='dateCueillette']");
  const champsFerme = formulaireHTML.querySelector("[name='succursale']");

  if (estActif) {
    champsDate.removeAttribute("disabled");
    champsFerme.removeAttribute("disabled");
    champsDate.required = true;
    champsFerme.required = true;
  } else {
    champsDate.disabled = true;
    champsFerme.disabled = true;
    champsDate.value = "";
    champsFerme.value = "";
    champsDate.removeAttribute("required");
    champsFerme.removeAttribute("required");
  }
}

/**
 * Fonction qui prend un paramètre de validation et si c'est valide, on entre les valeurs champ les champs du résumé, sinon les valeurs s'effacent.
 * @param {*} estActif
 */

function activerLivraison(estActif) {
  const champsLivraison = formulaireHTML.querySelector(".div-radios");
  const champsDate = formulaireHTML.querySelector("[name='dateLivraison']");
  const radio = champsLivraison.querySelector('input[type="radio"]');

  if (estActif) {
    champsDate.removeAttribute("disabled");
    champsLivraison.classList.remove("invisible");
    champsDate.required = true;
    radio.required = true;
  } else {
    champsDate.disabled = true;
    champsDate.value = "";
    radio.value = "";
    champsDate.removeAttribute("required");
    radio.removeAttribute("required");
    champsLivraison.classList.add("invisible");
  }
}

/**
 * Fonction qui prend deux paramètres : une qui sert à trouver le nom et la valeur, et l'autre, à valider.
 * @param {*} champ
 * @param {*} valide
 */

function modifierResume(champ, valide) {
  const champValeurHTML = champ.value;
  const champNomHTML = champ.name;
  const sectionResume = formulaireHTML.querySelector(
    `span[data-champ='${champNomHTML}']`
  );
  const estCochee = caseACocher.checked;
  const estCochee2 = caseACocher2.checked;

  if (valide) {
    sectionResume.textContent = champValeurHTML;
    if (champNomHTML == "cueilletteSuccursale") {
      sectionResume.textContent = estCochee ? "oui" : "non";
      activerCueillette(estCochee);
    }
    if (champNomHTML == "livraison") {
      sectionResume.textContent = estCochee2 ? "oui" : "non";
      activerLivraison(estCochee2);
    }
  }
}

// Exécution du code

init();
