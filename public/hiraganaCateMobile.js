document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".parent-container"); // Le parent des éléments à trier

    new Sortable(container, {
        animation: 150, // Animation fluide
        swapThreshold: 0.5, // Sensibilité de l'échange
        ghostClass: "ghost", // Classe pour le visuel de l'élément en déplacement
        onStart(evt) {
            // Fixe la position du conteneur en supprimant tout mouvement du conteneur
            container.style.position = "relative";
        },
        onEnd: function (evt) {
            let item = evt.item; // Élément déplacé
            let hiddenItem = container.querySelector(".hidden");

            // Vérifiez si l'élément déplacé est celui qui a la classe "choosed"
            if (item.classList.contains("choosed") && hiddenItem) {
                // Échange les classes entre choosed et hidden
                item.classList.replace("choosed", "hidden");
                hiddenItem.classList.replace("hidden", "choosed");
            }
        },
    });
});

