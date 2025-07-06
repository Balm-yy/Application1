//RECUPERE LES DONNEES DES INPUTS SAISIES PAR LES USERS ET CREE UNE CARTE

document.addEventListener('DOMContentLoaded', () => {

  // Sélectionner le bouton qui ajoute les cartes
  const addCardsButton = document.querySelector('.buttonAddCards');

  addCardsButton.addEventListener('click', () => {
    // Récupérer la catégorie
    const category = document.getElementById('categoryName').value.trim();

    // Récupérer la sous-catégorie
    const subcategory = document.getElementById('subcategoryName').value.trim();

    // Récupérer toutes les paires Questions/Réponses
    const questionInputs = document.querySelectorAll('.questionsContainer input');
    const answerInputs = document.querySelectorAll('.answerContainer input');

    const cards = [];

    questionInputs.forEach((qInput, index) => {
      const question = qInput.value.trim();
      const answer = answerInputs[index]?.value.trim();

      /*if (cards.length === 0) {
        alert("veuillez remplir au moins une paire de question/réponse.");
        return;
      }*/

      if (question && answer) {  //Ne pas inclure les cartes vides
        cards.push({
          question,
          answer
        });
      } else if (cards.length === 0) {
        alert("Veuillez remplir au moins une ligne.")
        return;
      }
    });

    // Afficher ce qu'on a récupéré
    console.log({
      category,
      subcategory,
      cards
    });




    // ENVOI DES DONNEES AU BACK VIA FETCH (HTTPP REQUEST)  

    // IS IT WORKING ?
    // Needs tests
    
    /*async function createCard(dataToSend) {
    try {
        const response = await fetch("/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status} : ${errorText}`);
        }

        const newCard = await response.json();
        console.log("Nouvelle carte créée :", newCard);
        alert("Cartes ajoutées avec succès !")

    } catch (err) {
        console.error("Erreur lors de la création de la carte :", err);
    }
}
*/






// Synchronisation immediate avec localStorage

localStorage.setItem("cards", JSON.stringify(cards));

console.log("Carte enregistrée localement !")


  });

});