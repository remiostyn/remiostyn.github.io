/* =========================================================
   1. MENU BURGER (mobile)
   Au clic sur le burger, on ajoute ou retire la classe
   "est-ouvert" sur le menu. C'est le CSS qui fait le reste.
   ========================================================= */
const boutonBurger = document.querySelector("#bouton-burger");
const menu = document.querySelector("#menu");

boutonBurger.addEventListener("click", function () {
    // toggle() ajoute la classe si elle est absente, la retire si elle est présente.
    // Il renvoie true si la classe vient d'être ajoutée.
    const estOuvert = menu.classList.toggle("est-ouvert");

    // On prévient les lecteurs d'écran de l'état du menu
    boutonBurger.setAttribute("aria-expanded", estOuvert);
    boutonBurger.setAttribute("aria-label", estOuvert ? "Fermer le menu" : "Ouvrir le menu");
});

// Quand on clique sur un lien du menu, on referme le menu
const liensMenu = document.querySelectorAll("#menu a");

liensMenu.forEach(function (lien) {
    lien.addEventListener("click", function () {
        menu.classList.remove("est-ouvert");
        boutonBurger.setAttribute("aria-expanded", false);
        boutonBurger.setAttribute("aria-label", "Ouvrir le menu");
    });
});


/* =========================================================
   2. MODE CLAIR / SOMBRE
   Le site est sombre par défaut. Le bouton ajoute ou retire
   data-theme="clair" sur la balise <html>.
   Le choix est mémorisé dans le navigateur (localStorage)
   pour être conservé à la prochaine visite
   ========================================================= */
const boutonTheme = document.querySelector("#bouton-theme");
const html = document.documentElement; // la balise <html>

function appliquerTheme(theme) {
    if (theme === "clair") {
        html.setAttribute("data-theme", "clair");
        boutonTheme.setAttribute("aria-label", "Passer en mode sombre");
    } else {
        html.removeAttribute("data-theme");
        boutonTheme.setAttribute("aria-label", "Passer en mode clair");
    }
}

// Au chargement : on regarde si un thème a été mémorisé.
// try / catch évite une erreur si le navigateur bloque le stockage.
try {
    appliquerTheme(localStorage.getItem("theme"));
} catch (erreur) {
    // Pas de stockage disponible : on reste en mode sombre
}

boutonTheme.addEventListener("click", function () {
    const nouveauTheme = html.getAttribute("data-theme") === "clair" ? "sombre" : "clair";
    appliquerTheme(nouveauTheme);

    try {
        localStorage.setItem("theme", nouveauTheme);
    } catch (erreur) {
        // Tant pis, le choix ne sera pas mémorisé
    }
});


/* =========================================================
   3. APPARITION DES SECTIONS AU DÉFILEMENT
   IntersectionObserver "surveille" des éléments et nous
   prévient quand ils entrent dans l'écran. On leur ajoute
   alors la classe "est-visible", et le CSS les fait apparaître.
   ========================================================= */

// On signale au CSS que le JavaScript fonctionne.
// Sans JS, rien n'est caché : le contenu reste toujours lisible.
html.classList.add("js");

const elementsAAnimer = document.querySelectorAll(".section__entete, .projet, .a-propos, .carte, .frise__etape, .contact");

const observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
            entree.target.classList.add("est-visible");
            observateur.unobserve(entree.target); // l'animation ne se joue qu'une fois
        }
    });
}, {
    threshold: 0.15 // l'élément doit être visible à 15 % pour se déclencher
});

elementsAAnimer.forEach(function (element) {
    element.classList.add("apparition");
    observateur.observe(element);
});
