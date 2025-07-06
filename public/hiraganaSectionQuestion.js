

//  JS


const cardsData = [
  { question: "Quelle est la capitale de la France ?", answer: "Paris" },
  { question: "2 + 2 ?", answer: "122222222222 222222222222 22222264 2465+ 1566 66666 6666666666 6666666666666 66666664" },
  { question: "Langage utilisé pour le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr? le web j hfhbsiuhfbdkjkj u oi  zekjhsdj oçazkhhed   kusdhkjds o oshoqsdr??", answer: "JavaScript" }
];

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


