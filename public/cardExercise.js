let currentCardIndex = 0;
let cards = [];
let mistakes  = [];

const token = localStorage.getItem('token');

async function fetchFlashCards (categoryId, subcategoryId) {
    const response = await fetch(`/api/flashcards/${categoryId}/${subcategoryId}`, {
        headers : {'Authorization' : 'Bearer${token}'}
    });
    const data = await response.json();
    cards = data;
    currentDataIndex = 0;
    showcard();
};

function showcard() {
    const cards = cards[currentCardIndex];
    document.getElementById('question').textContent = card.question;
    document.getElementById('answer').textContent = "";
    document.getElementById('controls').style.display = 'none';
}

function showAnswer() {
    const cards = cards[currentCardIndex];
    document.getElementById('answer').textContent = card.answer;
    document.getElementById('controls').style.display = 'block';
}

function handleAnswer (isCorrect) {
    const cards = cards[currentCardIndex];
    if (!isCorrect) {
        mistakes.push(cards._id); //Whats' "._"
    }

    currentCardIndex ++;

    if (currentCardIndex < cards.length) {
        showCard();
    } else {
        endSession();
    }
}


function endSession () {
    document.getElementById('training-container').style.display = 'none';
    Document.getElementById('end-screen').style.display = 'block';

    if (mistakes.length > 0) {
        fetch('/api/flahcards/mistakes', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ${token}'
            },
            body : JSON.stringify({
                subcategoryId :selectedSubcategory,
                mistakesCardsId : mistakes
            })
        });
    }
}