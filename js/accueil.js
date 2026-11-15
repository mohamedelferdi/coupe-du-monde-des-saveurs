// =========================================================
// accueil.js : carrousel, compte à rebours et compteurs animés
// =========================================================

// ----- Carrousel -----
const slides = document.querySelectorAll(".slide");
const points = document.querySelectorAll(".point");
const boutonPrecedent = document.getElementById("precedent");
const boutonSuivant = document.getElementById("suivant");
let indexActuel = 0;
let minuteur;

function afficherSlide(index) {
    // si on dépasse, on revient au début (ou à la fin)
    if (index >= slides.length) {
        index = 0;
    }
    if (index < 0) {
        index = slides.length - 1;
    }

    slides[indexActuel].classList.remove("active");
    points[indexActuel].classList.remove("actif");

    indexActuel = index;

    slides[indexActuel].classList.add("active");
    points[indexActuel].classList.add("actif");
}

function demarrerDefilement() {
    minuteur = setInterval(function () {
        afficherSlide(indexActuel + 1);
    }, 5000);
}

// quand l'utilisateur clique, on relance le minuteur
function relancerDefilement() {
    clearInterval(minuteur);
    demarrerDefilement();
}

if (slides.length > 0) {
    boutonSuivant.addEventListener("click", function () {
        afficherSlide(indexActuel + 1);
        relancerDefilement();
    });

    boutonPrecedent.addEventListener("click", function () {
        afficherSlide(indexActuel - 1);
        relancerDefilement();
    });

    points.forEach(function (point, i) {
        point.addEventListener("click", function () {
            afficherSlide(i);
            relancerDefilement();
        });
    });

    demarrerDefilement();
}

// ----- Compte à rebours jusqu'à la finale -----
const dateFinale = new Date("2026-12-20T20:00:00");

// ajoute un 0 devant les nombres < 10 (ex : 7 -> "07")
function deuxChiffres(nombre) {
    if (nombre < 10) {
        return "0" + nombre;
    }
    return String(nombre);
}

function mettreAJourRebours() {
    const maintenant = new Date();
    let difference = dateFinale - maintenant; // en millisecondes

    if (difference < 0) {
        difference = 0;
        document.querySelector(".rebours h2").textContent = "La finale a eu lieu !";
    }

    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    const heures = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const secondes = Math.floor((difference / 1000) % 60);

    document.getElementById("jours").textContent = deuxChiffres(jours);
    document.getElementById("heures").textContent = deuxChiffres(heures);
    document.getElementById("minutes").textContent = deuxChiffres(minutes);
    document.getElementById("secondes").textContent = deuxChiffres(secondes);
}

if (document.getElementById("rebours")) {
    mettreAJourRebours();
    setInterval(mettreAJourRebours, 1000);
}

// ----- Compteurs qui montent de 0 jusqu'à leur valeur -----
const compteurs = document.querySelectorAll(".chiffre");
let compteursLances = false;

function lancerCompteurs() {
    compteurs.forEach(function (compteur) {
        const cible = Number(compteur.dataset.cible);
        let valeur = 0;

        const intervalle = setInterval(function () {
            valeur++;
            compteur.textContent = valeur;
            if (valeur >= cible) {
                clearInterval(intervalle);
            }
        }, 120);
    });
}

// on lance les compteurs seulement quand la section devient visible
function verifierCompteurs() {
    const section = document.querySelector(".chiffres");
    if (!compteursLances && section && section.getBoundingClientRect().top < window.innerHeight) {
        compteursLances = true;
        lancerCompteurs();
    }
}

window.addEventListener("scroll", verifierCompteurs);
verifierCompteurs();
