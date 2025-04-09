import caroussel from "./modules/caroussel.js";
import ScrollAnimator from "./classes/ScrollAnimator.js";
import modeNuit from "./modules/mode-nuit.js";
import initPopUp from "./modules/boite-modale.js";
import affichePhotoZoom from "./modules/fonctions-zoom.js";

const listeLi = document.querySelector('.liste li');
const titresHTML = document.querySelectorAll(".titre-fade-in");
const paragraphesHTML = document.querySelectorAll(".paragraphe");
const logo = document.querySelectorAll(".logo");
const galeriePhotos = document.querySelector("zoom-galerie");
const boutons = document.querySelectorAll(".bouton");
const photosEnHaut= document.querySelectorAll('.en-haut');
const photosEnBas= document.querySelectorAll('.en-bas');

function init() {
  initPopUp();
  caroussel();
  modeNuit();
  const objet1 = new ScrollAnimator(null, titresHTML);
  const objet2 = new ScrollAnimator(null, paragraphesHTML);
  window.addEventListener("scroll", auDefilement);

  /**
   * Fonction qui permet de zoomer le logo et les boutons au scroll
   *
   * */
  function auDefilement() {
    affichePhotoZoom(logo);
    affichePhotoZoom(boutons);
  }
}


init();
