document.addEventListener("DOMContentLoaded", function () {

    // Drag and Drop
    document.addEventListener("dragstart", (event) => {
        if (event.target.closest(".choosed") || event.target.closest(".hidden")) {
            event.dataTransfer.setData("text/plain", event.target.classList.contains("choosed") ? "choosed" : "hidden");
        }
    });

    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    document.addEventListener("drop", (event) => {
        event.preventDefault();
        let choosed = document.querySelector(".choosed");
        let hidden = document.querySelector(".hidden");

        if (choosed && hidden) {
            choosed.classList.toggle("hidden");
            choosed.classList.toggle("choosed");
            hidden.classList.toggle("hidden");
            hidden.classList.toggle("choosed");
        }
    });

    // Click event to redirect based on position
    document.addEventListener("click", (event) => {
        let clickedElement = event.target.closest(".choosed"); // Vérifie si on clique sur ".choosed"

        if (clickedElement) {
            let containerA = document.querySelector("#containerA");
            let containerB = document.querySelector("#containerB");

            if (containerA.contains(clickedElement)) {
                window.location.href = "hiraganaElements.html";
            } else if (containerB.contains(clickedElement)) {
                window.location.href = "hiraganaMistakes.html";
            } else {
                window.location.href = "hiraganaCate.html";
            }
        }
    });

});
