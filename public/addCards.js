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

// Récupérer les cartes existantes dans le localStorage
let existingCards = JSON.parse(localStorage.getItem("cards")) || [];

// Fusionner les cartes existantes avec les nouvelles (éviter doublons si besoin)
const mergedCards = [...existingCards];

// Ajouter chaque nouvelle carte si elle n'existe pas déjà
cards.forEach(newCard => {
  const exists = mergedCards.some(card => 
    card.question === newCard.question && card.answer === newCard.answer
  );
  if (!exists) {
    mergedCards.push(newCard);
  }
});

// Stocker le tout dans localStorage
localStorage.setItem("cards", JSON.stringify(mergedCards));

console.log("Cartes mises à jour dans le localStorage !");



  });

});




// ADD A NEW LIGNE WHEN THE + IS CLICKED

document.addEventListener('DOMContentLoaded', () => {

  // 1. Bouton pour ajouter une nouvelle ligne de carte
  const addLineButton = document.querySelector('.addQnALigne'); // bouton +

  const container = document.querySelector('.scrollElementVertically'); // conteneur des lignes

  addLineButton.addEventListener('click', () => {
    // Nombre de lignes existantes pour le numéro
    const currentLines = container.querySelectorAll('.QnALigne').length;
    const newLineNumber = currentLines + 1;

    // Création de la nouvelle ligne
    const newLine = document.createElement('div');
    newLine.classList.add('QnALigne', 'd-flex', 'columns', 'justify-content-around');

    // Numéro
    const numberP = document.createElement('p');
    numberP.classList.add('texte');
    numberP.textContent = newLineNumber;

    // Question input
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('questionsContainer');
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.placeholder = 'Question';
    questionInput.classList.add('inputQnA', 'text-center');
    questionDiv.appendChild(questionInput);

    // Answer input
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerContainer');
    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.placeholder = 'Answer';
    answerInput.classList.add('inputQnA', 'text-center');
    answerDiv.appendChild(answerInput);

    // Assemblage
    newLine.appendChild(numberP);
    newLine.appendChild(questionDiv);
    newLine.appendChild(answerDiv);

    // Ajout dans le container
    container.appendChild(newLine);
  });

  // 2. Bouton qui ajoute la carte (ton code existant)
  const addCardsButton = document.querySelector('.buttonAddCards');

  addCardsButton.addEventListener('click', () => {
    const category = document.getElementById('categoryName').value.trim();
    const subcategory = document.getElementById('subcategoryName').value.trim();

    const questionInputs = document.querySelectorAll('.questionsContainer input');
    const answerInputs = document.querySelectorAll('.answerContainer input');

    const cards = [];

    questionInputs.forEach((qInput, index) => {
      const question = qInput.value.trim();
      const answer = answerInputs[index]?.value.trim();

      if (question && answer) {
        cards.push({
          question,
          answer
        });
      } else if (cards.length === 0) {
        alert("Veuillez remplir au moins une ligne.");
        return;
      }
    });

    console.log({ category, subcategory, cards });

    // Récupérer les cartes existantes
    let existingCards = JSON.parse(localStorage.getItem("cards")) || [];

    // Fusionner sans doublons
    const mergedCards = [...existingCards];
    cards.forEach(newCard => {
      const exists = mergedCards.some(card =>
        card.question === newCard.question && card.answer === newCard.answer
      );
      if (!exists) {
        mergedCards.push(newCard);
      }
    });

    localStorage.setItem("cards", JSON.stringify(mergedCards));

    console.log("Cartes mises à jour dans le localStorage !");
  });

});

