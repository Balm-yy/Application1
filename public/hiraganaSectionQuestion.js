//  JS

let cardsData = [];
let currentIndex = 0;
let showingAnswer = false;
let score = 0;
let errors = 0;

const container = document.getElementById("card-container");
const progressBar = document.getElementById("progress-bar");

// Fonction pour fusionner 2 listes de cartes sans doublons
function mergeCards(localCards, dbCards) {
  const merged = [...localCards];

  dbCards.forEach(dbCard => {
    const exists = merged.some(localCard =>
      localCard.question === dbCard.question &&
      localCard.answer === dbCard.answer
    );
    if (!exists) {
      merged.push(dbCard);
    }
  });
  return merged;
}

/*
Si la requête fetch échoue (problème réseau, 404, serveur non démarré…), on attrape l’erreur et on utilise juste les cartes dans localStorage.
Si localStorage est vide, on initialise avec un petit jeu de cartes par défaut.
On évite l’erreur fatale, on auras toujours des cartes à afficher
*/

async function initCardData() {
  try {
    const response = await fetch('/cards');
    if (!response.ok) {
      throw new Error("Réponse non OK");
    }
    const dbCards = await response.json();

    let localcards = JSON.parse(localStorage.getItem("cards"));
    if (!localcards || localcards.length === 0) {
      localcards = [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "2 + 2 ?", answer: "4" },
        { question: "Langage utilisé pour le web?", answer: "JavaScript" }
      ];
      localStorage.setItem("cards", JSON.stringify(localcards));
    }

    const mergedCards = mergeCards(localcards, dbCards);
    localStorage.setItem("cards", JSON.stringify(mergedCards));

    return mergedCards;
  } catch (error) {
    console.warn("Erreur lors du chargement des cartes, utilisation des cartes locales uniquement", error);

    // Pas de fetch possible, on utilise uniquement localStorage ou données par défaut
    let localcards = JSON.parse(localStorage.getItem("cards"));
    if (!localcards || localcards.length === 0) {
      localcards = [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "2 + 2 ?", answer: "4" },
        { question: "Langage utilisé pour le web?", answer: "JavaScript" }
      ];
      localStorage.setItem("cards", JSON.stringify(localcards));
    }

    return localcards;
  }
}


// Fonction qui démarre le jeu : initialise puis affiche la première carte
async function startGame() {
  cardsData = await initCardData();
  if (!cardsData) {
    container.innerHTML = "<p>Impossible de charger les cartes.</p>";
    return;
  }
  currentIndex = 0;
  showingAnswer = false;
  score = 0;
  errors = 0;
  renderCard();
}

// Fonction d'affichage de la carte et des contrôles
function renderCard() {
  container.innerHTML = "";

  // Barre de progression
  const percent = (currentIndex / cardsData.length) * 100;
  progressBar.style.width = `${percent}%`;

  // Fin du jeu
  if (currentIndex >= cardsData.length) {
    const endMsg = document.createElement("div");
    endMsg.className = "card";
    endMsg.innerText = `Vous avez fini ! Votre score est de ${score}/${cardsData.length}.`;
    container.appendChild(endMsg);

    const restartBtn = document.createElement("button");
    restartBtn.id = "restart-button";
    restartBtn.innerText = "Recommencer";
    restartBtn.addEventListener("click", () => {
      currentIndex = 0;
      showingAnswer = false;
      score = 0;
      errors = 0;
      renderCard();
    });
    container.appendChild(restartBtn);
    return;
  }

  // Carte affichée (question ou réponse)
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";

  const card = document.createElement("div");
  card.className = "card";
  card.innerText = showingAnswer
    ? cardsData[currentIndex].answer
    : cardsData[currentIndex].question;

  card.addEventListener("click", () => {
    showingAnswer = !showingAnswer;
    renderCard();
  });

  cardWrapper.appendChild(card);
  container.appendChild(cardWrapper);

  // Boutons de réponse uniquement si la réponse est affichée
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "buttons-wrapper";

  if (showingAnswer) {
    const btnBox = document.createElement("div");
    btnBox.className = "buttons";

    const btnV = document.createElement("button");
    btnV.className = "btn";
    btnV.textContent = "✔️";
    btnV.addEventListener("click", () => {
      score++;
      nextCard();
    });

    const btnX = document.createElement("button");
    btnX.className = "btn";
    btnX.textContent = "❌";
    btnX.addEventListener("click", () => {
      errors++;
      nextCard();
    });

    btnBox.appendChild(btnV);
    btnBox.appendChild(btnX);
    buttonsWrapper.appendChild(btnBox);
  }

  container.appendChild(buttonsWrapper);
}

// Passer à la carte suivante
function nextCard() {
  showingAnswer = false;
  currentIndex++;
  renderCard();
}

// Démarrage du jeu
startGame();




























/*

let cardsData = [];

async function initCardData () {
  try {
    // Récupérer les cartes depuis la BDD (API)
    const response = await fetch('/cards'); 
    const result = await response.json(); //response.json() permet de lire la reponse de l'API en format JSON (tableau ou objet)
    const dbCards = result.data || []; //dbcards devient un tableau

    // Récupérer les cartes depuis le localStorage
    let localcards = JSON.parse(localStorage.getItem("cards"));
    if (!localcards || localcards.length === 0) {
      localcards = [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "2 + 2 ?", answer: "4" },
        { question: "Langage utilisé pour le web?", answer: "JavaScript" }
      ]
      localStorage.setItem("cards", JSON.stringify(localcards));

    }

    // Fusionner les deux listes sans doublons
    cardsData = mergeCards(localcards, dbCards);
    
    // Stocker la liste fusionner dans localStorage afin de ne pas avoir a tout télécharger de nouveau
    localStorage.setItem("cards", JSON.stringify(cardsData));

    // Lancer le jeu
    renderCard();
  } catch (error) {
    console.error("Erreur lors du chargement des cartes :", error);
  }
}




//Fusion de 2 listes sans doublon
function mergeCards(localCards, dbCards) {
  const merged = [...localCards]; //"..." permet de copier tout le contenu de localCards dans un nouveau tableau "merged"

  dbCards.forEach(dbCard => {
    const exists = merged.some(localCard =>
      localCard.question === dbCard.question &&
      localCard.answer === dbCard.answer
    );
    if (!exists) {
      merged.push(dbCard);
    }
  });
  return merged;
}

initCardData(); //Appel de la fonction c'est grâce a elle que le jeu démarre




//PERMET D'AFFICHER LES CARTES
let currentIndex = 0;
let showingAnswer = false;
let score = 0;
let errors = 0;

const container = document.getElementById("card-container");
const progressBar = document.getElementById("progress-bar");




function renderCard() {
  container.innerHTML = "";

  // 🔄 Barre de progression
  const percent = (currentIndex / cardsData.length) * 100;
  progressBar.style.width = `${percent}%`;

  // ✅ Fin de l'exercice
  if (currentIndex >= cardsData.length) {
    const endMsg = document.createElement("div");
    endMsg.className = "card";
    endMsg.innerText = `Vous avez fini ! Votre score est de ${score}/${cardsData.length}.`;
    container.appendChild(endMsg);

    const restartBtn = document.createElement("button");
    restartBtn.id = "restart-button";
    restartBtn.innerText = "Recommencer";
    restartBtn.addEventListener("click", () => {
      currentIndex = 0;
      showingAnswer = false;
      score = 0;
      errors = 0;
      renderCard();
    });
    container.appendChild(restartBtn);
    return;
  }

  // 🧱 Carte fixe centrée
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";

  const card = document.createElement("div");
  card.className = "card";
  card.innerText = showingAnswer
    ? cardsData[currentIndex].answer
    : cardsData[currentIndex].question;

  card.addEventListener("click", () => {
    showingAnswer = !showingAnswer;
    renderCard();
  });

  cardWrapper.appendChild(card);
  container.appendChild(cardWrapper);

  // 🧱 Zone boutons (vide ou remplie)
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "buttons-wrapper";

  if (showingAnswer) {
    const btnBox = document.createElement("div");
    btnBox.className = "buttons";

    const btnV = document.createElement("button");
    btnV.className = "btn";
    btnV.textContent = "✔️";
    btnV.addEventListener("click", () => {
      score++;
      nextCard();
    });

    const btnX = document.createElement("button");
    btnX.className = "btn";
    btnX.textContent = "❌";
    btnX.addEventListener("click", () => {
      errors++;
      nextCard();
    });

    btnBox.appendChild(btnV);
    btnBox.appendChild(btnX);
    buttonsWrapper.appendChild(btnBox);
  }

  container.appendChild(buttonsWrapper);
}

function nextCard() {
  showingAnswer = false;
  currentIndex++;
  renderCard();
}

renderCard();





//IDEA
/* 
Chercher les données de localStorage et les stocker dans localCards
Chercher les données de la BDD et les stocker dans mongoCards
Comparer les données et les fusionner en evitant les doublons
Les stocker dans cardsData

Si localStorage === 0 alors utiliser seulement mongoCards
Si localStorage used alors mettre à jour la BDD ?? ou attendre seulement la function saveInDataBase

*/


/*

//PREND LES DONNEES DE LOCALSTORAGE
let cardsData = JSON.parse(localStorage.getItem("cards"));

//let localCards = JSON.parse(localStorage.getItem("cards"));

//Si il n'y a pas de données dans localStorage alors on utilisera le tableau ci-dessous
// Meilleure version : S'il n'y a pas de données dans le localStorage alors j'utilise la BDD

if (!cardsData || cardsData.lenght === 0) {
  //cardsData = mongoCards
  cardsData = [
  { question: "Quelle est la capitale de la France ?", answer: "Paris" },
  { question: "2 + 2 ?", answer: "122222222222 222222222222 22222264 2465+ 1566 66666 6666666666 6666666666666 66666664" },
  { question: "Langage utilisé pour le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr??", answer: "JavaScript" }
];
localStorage.setItem("cards", JSON.stringify(cardsData)); //Met à jour le localStorage
}


*/
