// =========================================================
// vote.js : formulaire de vote, note en étoiles et résultats
// Les votes sont sauvegardés dans le localStorage du navigateur
// =========================================================

// votes de départ (pour que les résultats ne soient pas vides)
const votesDepart = {
    italie: 398,
    maroc: 389,
    japon: 412,
    thailande: 301
};

const nomsPlats = {
    italie: "Italie - Pizza napolitaine",
    maroc: "Maroc - Tajine de poulet",
    japon: "Japon - Sushis",
    thailande: "Thaïlande - Pad thaï"
};

const formulaire = document.getElementById("form-vote");
const etoiles = document.querySelectorAll(".etoile");
const messageSucces = document.getElementById("succes-vote");
let noteChoisie = 0;

// ----- Lecture / écriture dans le localStorage -----
// try/catch : si le localStorage est bloqué, le site continue de marcher
function lireMonVote() {
    try {
        const texte = localStorage.getItem("monVote");
        if (texte) {
            return JSON.parse(texte);
        }
    } catch (erreur) {
        console.log("Impossible de lire le localStorage :", erreur);
    }
    return null;
}

function sauvegarderMonVote(vote) {
    try {
        localStorage.setItem("monVote", JSON.stringify(vote));
    } catch (erreur) {
        console.log("Impossible d'enregistrer le vote :", erreur);
    }
}

function supprimerMonVote() {
    try {
        localStorage.removeItem("monVote");
    } catch (erreur) {
        console.log("Impossible de supprimer le vote :", erreur);
    }
}

// ----- Notation avec les étoiles -----
function allumerEtoiles(nombre) {
    etoiles.forEach(function (etoile) {
        if (Number(etoile.dataset.valeur) <= nombre) {
            etoile.classList.add("allumee");
        } else {
            etoile.classList.remove("allumee");
        }
    });
}

etoiles.forEach(function (etoile) {
    etoile.addEventListener("click", function () {
        noteChoisie = Number(etoile.dataset.valeur);
        allumerEtoiles(noteChoisie);
    });

    // effet au survol
    etoile.addEventListener("mouseover", function () {
        allumerEtoiles(Number(etoile.dataset.valeur));
    });

    etoile.addEventListener("mouseout", function () {
        allumerEtoiles(noteChoisie);
    });
});

// ----- Affichage des erreurs -----
function afficherErreur(idChamp, message) {
    const zone = document.getElementById("erreur-" + idChamp);
    zone.textContent = message;
    zone.parentElement.classList.add("erreur");
}

function effacerErreurs() {
    document.querySelectorAll(".message-erreur").forEach(function (zone) {
        zone.textContent = "";
        zone.parentElement.classList.remove("erreur");
    });
}

// ----- Affichage des résultats sous forme de barres -----
function afficherResultats() {
    const zoneBarres = document.getElementById("barres");
    const monVote = lireMonVote();

    // on copie les votes de départ puis on ajoute le vote de l'utilisateur
    const votes = {
        italie: votesDepart.italie,
        maroc: votesDepart.maroc,
        japon: votesDepart.japon,
        thailande: votesDepart.thailande
    };
    if (monVote) {
        votes[monVote.plat]++;
    }

    let total = 0;
    for (const pays in votes) {
        total += votes[pays];
    }

    document.getElementById("total-votes").textContent = total + " votes au total";

    zoneBarres.innerHTML = "";
    for (const pays in votes) {
        const pourcentage = Math.round((votes[pays] / total) * 100);

        const ligne = document.createElement("div");
        ligne.className = "barre-ligne";
        ligne.innerHTML =
            "<p><span>" + nomsPlats[pays] + "</span><span>" + pourcentage + " %</span></p>" +
            '<div class="barre-fond"><div class="barre"></div></div>';
        zoneBarres.appendChild(ligne);

        // petit délai pour que l'animation CSS de la largeur se lance
        const barre = ligne.querySelector(".barre");
        setTimeout(function () {
            barre.style.width = pourcentage + "%";
        }, 100);
    }
}

// ----- Bloquer le formulaire si l'utilisateur a déjà voté -----
function verifierDejaVote() {
    const monVote = lireMonVote();
    const boutonEnvoyer = formulaire.querySelector("button[type='submit']");

    if (monVote) {
        boutonEnvoyer.disabled = true;
        boutonEnvoyer.textContent = "Vous avez déjà voté";
        messageSucces.textContent = "Merci " + monVote.pseudo + " ! Vous avez voté pour : " + nomsPlats[monVote.plat] + " (" + monVote.note + "/5).";
        messageSucces.classList.add("visible");
    } else {
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.textContent = "Envoyer mon vote";
        messageSucces.classList.remove("visible");
    }
}

// ----- Validation et envoi du formulaire -----
if (formulaire) {
    formulaire.addEventListener("submit", function (evenement) {
        evenement.preventDefault(); // on empêche le rechargement de la page
        effacerErreurs();

        const pseudo = document.getElementById("pseudo").value.trim();
        const plat = document.getElementById("plat").value;
        const goute = formulaire.querySelector("input[name='goute']:checked");
        const reglement = document.getElementById("reglement").checked;
        let valide = true;

        if (pseudo.length < 3) {
            afficherErreur("pseudo", "Le pseudo doit contenir au moins 3 caractères.");
            valide = false;
        }

        if (plat === "") {
            afficherErreur("plat", "Veuillez choisir un plat.");
            valide = false;
        }

        if (goute === null) {
            afficherErreur("goute", "Veuillez répondre à la question.");
            valide = false;
        }

        if (noteChoisie === 0) {
            afficherErreur("note", "Veuillez donner une note entre 1 et 5 étoiles.");
            valide = false;
        }

        if (!reglement) {
            afficherErreur("reglement", "Vous devez accepter le règlement.");
            valide = false;
        }

        if (valide) {
            sauvegarderMonVote({
                pseudo: pseudo,
                plat: plat,
                goute: goute.value,
                note: noteChoisie
            });
            verifierDejaVote();
            afficherResultats();
        }
    });

    document.getElementById("reinitialiser").addEventListener("click", function () {
        supprimerMonVote();
        formulaire.reset();
        noteChoisie = 0;
        allumerEtoiles(0);
        effacerErreurs();
        verifierDejaVote();
        afficherResultats();
    });

    verifierDejaVote();
    afficherResultats();
}
