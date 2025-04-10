let conteneurHTML = document.querySelector(".contenant-modale");
let elementHTML;

function initBoiteModale() {
  creePopUp();
  afficherMessage();
}

/**
 * Fonction qui crée une boîte modale (popup) et qui insère un gabarit dans le conteneur de gabarit. Une variable prend le dernier élément du conteneur et un écouteur d'événement est mis dessus, qui au clic, affiche la popup.
 */

function creePopUp() {
  const gabarit = `
    <div class="boite-modale invisible">
    <div class="en-tete">
    <h1>Un été à la ferme est de retour!🐣🐐&nbsp;&nbsp;<span>X</span></h1>
    </div>
    <picture><img src="../assets/img/imgEvenement/Carre/Degustation-mensuelle.jpg" alt="degustation"></picture>
    <p>Un été à profiter des animaux, de la nature et de la bouffe gourmande et santé.</p>
    <h3>Achetez votre passeport et chandail !&nbsp;&nbsp;&nbsp;Quantités limitées.🎫👕</h3>
    </div>
  `;
  conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
  elementHTML = conteneurHTML.lastElementChild;
  elementHTML.addEventListener("click", auClicMessage);
}

/**
 * Fonction servant à afficher la boite modale
 */
function afficherMessage() {
  elementHTML.classList.remove("invisible");
}

/**
 * Fonction servant à cacher la boite modale
 */
function cacherMessage() {
  elementHTML.classList.add("invisible");
  //ou la supprimer de la page
}

/**
 * Fonction servant à fermer au clic une boite modale et enregistrer la valeur définie (passeport) dans le local storage pour ne plus que la boîte modale soit réaffichée à l'utilisateur au rechargement de la page.
 *
 */
function auClicMessage() {
  cacherMessage();
  //localStorage.setItem("passeport", true);
}

/**
 * Fonction qui donne un délai de 5 secondes avant que la boîte modale apparaisse
 */

export default function onAffichePopup() {
  setTimeout(function () {
    initBoiteModale();
  }, 5000);
}
