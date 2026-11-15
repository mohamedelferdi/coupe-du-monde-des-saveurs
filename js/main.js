// =========================================================
// main.js : scripts communs à toutes les pages
// (menu burger, bouton retour en haut, animation au défilement)
// =========================================================

// ----- Menu burger (version mobile) -----
const burger = document.getElementById("burger");
const nav = document.getElementById("nav-principale");

if (burger && nav) {
    burger.addEventListener("click", function () {
        nav.classList.toggle("ouvert");
        burger.classList.toggle("ouvert");

        // on met à jour l'attribut pour l'accessibilité
        const estOuvert = nav.classList.contains("ouvert");
        burger.setAttribute("aria-expanded", estOuvert);
    });
}

// ----- Bouton retour en haut -----
const boutonHaut = document.getElementById("haut");

if (boutonHaut) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            boutonHaut.classList.add("visible");
        } else {
            boutonHaut.classList.remove("visible");
        }
    });

    boutonHaut.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ----- Apparition des éléments quand on descend dans la page -----
const elementsAnimes = document.querySelectorAll(".apparition");

function verifierApparition() {
    const hauteurFenetre = window.innerHeight;

    elementsAnimes.forEach(function (element) {
        const position = element.getBoundingClientRect().top;
        if (position < hauteurFenetre - 50) {
            element.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", verifierApparition);
verifierApparition(); // pour les éléments déjà visibles au chargement
