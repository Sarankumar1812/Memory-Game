const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');
const moveCountElement = document.getElementById('moveCount');
const completionMessage = document.getElementById('completionMessage'); 

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;

function createCards() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const doubleValues = [...cardValues, ...cardValues];
    cards = doubleValues.map(value => createCardElement(value));
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.innerHTML = `
        <div class="front">${value}</div>
        <div class="back"></div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function applyCardBackColors() {
    const cardBacks = document.querySelectorAll('.card .back');
    cardBacks.forEach(back => {
        const card = back.parentElement;
        const value = card.getAttribute('data-value');
        switch (value) {
            case 'A':
                back.style.backgroundColor = 'red';
                break;
            case 'B':
                back.style.backgroundColor = 'blue';
                break;
            case 'C':
                back.style.backgroundColor = 'green';
                break;
            case 'D':
                back.style.backgroundColor = 'orange';
                break;
            case 'E':
                back.style.backgroundColor = 'black';
                break;
            case 'F':
                back.style.backgroundColor = 'yellow';
                break;
            case 'G':
                back.style.backgroundColor = 'purple';
                break;
            case 'H':
                back.style.backgroundColor = 'lime';
                break;
            default:
                back.style.backgroundColor = '#e74c3c';
                break;
        }
    });
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCountElement.textContent = `Moves: ${moveCount}`;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            completionMessage.style.display = 'block'; 
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function initGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moveCount = 0;
    moveCountElement.textContent = `Moves: ${moveCount}`;
    completionMessage.style.display = 'none'; 
    createCards();
    shuffleCards();
    cards.forEach(card => gameBoard.appendChild(card));
    applyCardBackColors();
}

function restartGame() {
    initGame();
}

restartButton.addEventListener('click', restartGame);

initGame();
