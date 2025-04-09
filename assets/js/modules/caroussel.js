let compteur = 0;

const carousselHTML = document.querySelector(".caroussel");
const carousselPhotosIndex = carousselHTML.querySelectorAll("[data-photo]");
const boutonSuivantHTML = carousselHTML.querySelector("[data-direction='1']");
const boutonPrecedentHTML = carousselHTML.querySelector(
  "[data-direction='-1']"
);


export default function init() {

    afficherPhoto(compteur);
    affichePhotosInterval();
    boutonSuivantHTML.addEventListener("click", auClicBouton);
    boutonPrecedentHTML.addEventListener("click", auClicBouton);

}

/**
 * Fonction qui prend en paramètre un nombre et qui permet d'afficher l'image du caroussel correspondant à son index
 * @param {*} index 
 */
function afficherPhoto(index) {
  cacherPhotos();
  const photo = carousselPhotosIndex[index];
  photo.classList.remove("invisible");
  afficherNavigation();
}

/**
 * Fonction qui permet d'afficher les photos du caroussel une à une  à toutes les seconde .2;
 */

function affichePhotosInterval() {
  setInterval(function () {
    cacherPhotos();
    carousselPhotosIndex[compteur].classList.remove("invisible");
    compteur++;
    if (compteur == carousselPhotosIndex.length) {
      compteur = 0;
    }
    afficherPhoto(compteur);
  }, 3000);
}

/**
 * Fonction qui cache toutes les photos
 */

function cacherPhotos() {
  for (const photo of carousselPhotosIndex) {
    photo.classList.add("invisible");
  }
}

/**
 * Fonction qui prend en paramètre un événement déclencheur qui permet de connaitre l'index de la photo. En cliquant sur le bouton de navigation, on se déplace entre les photos.
 * @param {*} evenement
 * @returns false
 */

function auClicBouton(evenement) {
  const declencheur = evenement.currentTarget;
  let photoIndex = Number(declencheur.dataset.photo);
  let direction = Number(declencheur.dataset.direction);
  if (
    (photoIndex === 0 && direction === -1) ||
    (photoIndex === 9 && direction === 1)
  ) {
    return false;
  }
  compteur += direction;
  afficherPhoto(compteur);
}


/**
 * Fonction les boutons de navigation du caroussel d'images
 */
function afficherNavigation() {
  boutonPrecedentHTML.classList.toggle("disabled", compteur <= 0);
  boutonSuivantHTML.classList.toggle(
    "disabled",
    compteur > carousselPhotosIndex.length - 2
  );
}