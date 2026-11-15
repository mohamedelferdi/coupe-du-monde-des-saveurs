// =========================================================
// contact.js : validation du formulaire de contact
// =========================================================

const formContact = document.getElementById("form-contact");
const champMessage = document.getElementById("message");
const compteur = document.getElementById("compteur");

// ----- Compteur de caractères du message -----
if (champMessage) {
    champMessage.addEventListener("input", function () {
        compteur.textContent = champMessage.value.length + " / 500";
    });
}

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

// ----- Validation -----
if (formContact) {
    formContact.addEventListener("submit", function (evenement) {
        evenement.preventDefault();
        effacerErreurs();

        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const sujet = document.getElementById("sujet").value;
        const message = champMessage.value.trim();
        let valide = true;

        // expression régulière simple pour vérifier le format d'un e-mail
        const formatEmail = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

        if (nom.length < 2) {
            afficherErreur("nom", "Veuillez indiquer votre nom.");
            valide = false;
        }

        if (!formatEmail.test(email)) {
            afficherErreur("email", "L'adresse e-mail n'est pas valide.");
            valide = false;
        }

        if (sujet === "") {
            afficherErreur("sujet", "Veuillez choisir un sujet.");
            valide = false;
        }

        if (message.length < 10) {
            afficherErreur("message", "Le message doit contenir au moins 10 caractères.");
            valide = false;
        }

        if (valide) {
            const succes = document.getElementById("succes-contact");
            succes.textContent = "Merci " + nom + ", votre message a bien été envoyé ! Nous vous répondrons à " + email + ".";
            succes.classList.add("visible");
            formContact.reset();
            compteur.textContent = "0 / 500";
        }
    });
}
