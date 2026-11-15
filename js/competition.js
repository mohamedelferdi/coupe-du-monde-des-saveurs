// =========================================================
// competition.js : tri du tableau de classement
// =========================================================

const tableau = document.getElementById("classement");

if (tableau) {
    const entetes = tableau.querySelectorAll("th.triable");
    const corps = tableau.querySelector("tbody");
    let ordreCroissant = true;
    let derniereColonne = -1;

    // transforme "17,5" en 17.5 pour pouvoir comparer
    function lireNombre(texte) {
        return parseFloat(texte.replace(",", "."));
    }

    entetes.forEach(function (entete) {
        entete.addEventListener("click", function () {
            const colonne = Number(entete.dataset.colonne);
            const type = entete.dataset.type;

            // si on reclique sur la même colonne, on inverse l'ordre
            if (colonne === derniereColonne) {
                ordreCroissant = !ordreCroissant;
            } else {
                ordreCroissant = true;
            }
            derniereColonne = colonne;

            // on transforme la liste des lignes en tableau pour utiliser sort()
            const lignes = Array.from(corps.querySelectorAll("tr"));

            lignes.sort(function (a, b) {
                const valeurA = a.children[colonne].textContent.trim();
                const valeurB = b.children[colonne].textContent.trim();
                let resultat;

                if (type === "nombre") {
                    resultat = lireNombre(valeurA) - lireNombre(valeurB);
                } else {
                    resultat = valeurA.localeCompare(valeurB);
                }

                if (ordreCroissant) {
                    return resultat;
                }
                return -resultat;
            });

            // on remet les lignes dans le nouvel ordre
            lignes.forEach(function (ligne) {
                corps.appendChild(ligne);
            });
        });
    });
}
