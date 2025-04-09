/**
 * Fonction qui permet de zoomer des éléments de son choix et prend en paramètre un paramètre ou un tableau.
 * @param {*} galerie 
 */

export default function afficherLogoZoom(galerie) {
    galerie.forEach(function (photo) {
        photo.animate(
            [
                {opacity: 0, scale: 0},
                {opacity: 1, scale: 1 },
            ],
            {duration: 1000},
            
        );
    });
}