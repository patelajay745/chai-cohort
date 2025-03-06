/**
 * Write your challenge solution here
 */
// Image data
const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [...emojis, ...emojis];

let numberOfMoves = 0;
let timeTaken = 0;
let mainTimer = null;
let flippedCards = [];
let matchedPair = 0;

const gameContainer = document.getElementById("gameContainer");
const movesElement = document.getElementById("moves");
const timeElement = document.getElementById("time");
const resetBtnElement = document.getElementById("resetBtn");

function init() {
  shuffleCards();
  // console.log(cards);

  // for resetting everything
  moves = 0;
  timeTaken = 0;
  matchedPair = 0;
  flippedCards = [];

  //displaying total moves to zero
  updateMoves();

  if (mainTimer) clearInterval(mainTimer);
  mainTimer = setInterval(updateTimeTaken, 1000);

  gameContainer.innerHTML = "";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardIndex = index;

    card.innerHTML = `<div class="card-front"> </div><div class="card-back">${emoji} </div>`;

    card.addEventListener("click", function () {
      if (card.classList.contains("flipped") || flippedCards.length >= 2)
        return;

      card.classList.add("flipped");

      flippedCards.push(card);
      if (flippedCards.length === 2) {
        numberOfMoves++;
        displayMoves();
        checkFlippedCards();
      }

      // console.log(flippedCards);
    });

    gameContainer.appendChild(card);
  });
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function updateMoves() {
  movesElement.textContent = moves;
}

function checkFlippedCards() {
  const [card1, card2] = flippedCards;
  // console.log(cards[card1.dataset.cardIndex]);
  // console.log(cards[card2.dataset.cardIndex]);
  const isMatched =
    cards[card1.dataset.cardIndex] === cards[card2.dataset.cardIndex];

  if (isMatched) {
    // console.log("reched1");
    matchedPair++;
    flippedCards = [];

    if (matchedPair === emojis.length) {
      setTimeout(showWinning, 500);
    }
  } else {
    setTimeout(() => resetCards(card1, card2), 1000);
  }
}

function showWinning() {
  clearInterval(mainTimer);
  const score = getScore();
  setTimeout(() => {
    alert(
      `You won with ${numberOfMoves} moves and your score is ${score}. You took ${formatTime(
        timeTaken
      )}`
    );
  }, 300);
}

function resetCards(card1, card2) {
  card1.classList.remove("flipped");
  card2.classList.remove("flipped");
  flippedCards = [];
}

function getScore() {
  const baseScore = 1000;
  const movesPenalty = numberOfMoves * 10;
  const timePenalty = timeTaken * 2;
  return Math.max(0, baseScore - movesPenalty - timePenalty);
}

function formatTime(seconds) {
  // console.log(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateTimeTaken() {
  timeTaken++;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function displayMoves() {
  movesElement.textContent = numberOfMoves;
}

resetBtnElement.addEventListener("click", init);

init();
