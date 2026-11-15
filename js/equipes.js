// =========================================================
// equipes.js : filtre par continent et affichage des recettes
// =========================================================

const boutonsFiltre = document.querySelectorAll(".filtre");
const equipes = document.querySelectorAll(".equipe");
const texteNombre = document.getElementById("nombre-equipes");

// ----- Filtre par continent -----
boutonsFiltre.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        const continentChoisi = bouton.dataset.continent;
        let nombreVisibles = 0;

        // on change le bouton actif
        boutonsFiltre.forEach(function (b) {
            b.classList.remove("actif");
        });
        bouton.classList.add("actif");

        // on cache les équipes qui ne correspondent pas
        equipes.forEach(function (equipe) {
            if (continentChoisi === "tous" || equipe.dataset.continent === continentChoisi) {
                equipe.classList.remove("cache");
                nombreVisibles++;
            } else {
                equipe.classList.add("cache");
            }
        });

        if (nombreVisibles > 1) {
            texteNombre.textContent = nombreVisibles + " équipes affichées";
        } else {
            texteNombre.textContent = nombreVisibles + " équipe affichée";
        }
    });
});

// ----- Bouton "Voir la recette" -----
const boutonsRecette = document.querySelectorAll(".bouton-recette");

boutonsRecette.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        // la recette est juste après le bouton dans le HTML
        const recette = bouton.nextElementSibling;
        recette.classList.toggle("visible");

        if (recette.classList.contains("visible")) {
            bouton.textContent = "Cacher la recette";
            bouton.setAttribute("aria-expanded", "true");
        } else {
            bouton.textContent = "Voir la recette";
            bouton.setAttribute("aria-expanded", "false");
        }
    });
});
