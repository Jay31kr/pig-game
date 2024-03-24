"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const player0ScoreEl = document.getElementById("score--0");
const player1ScoreEl = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNewGameEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");

// initial conditions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let play = true; // game state
diceEl.classList.add("hidden");

// function to reset the game
const resetGame = function () {
  play = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add("hidden");
  player0ScoreEl.textContent = scores[0];
  player1ScoreEl.textContent = scores[1];
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;
};

// function to switch players
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// handling click on roll dice/rolling a dice
btnRollEl.addEventListener("click", function () {
  if (play) {
    let diceSc = Number(Math.trunc(Math.random() * 6) + 1);
    diceEl.src = `./images/dice-${diceSc}.png`;
    diceEl.classList.remove("hidden");
    //checking if the dice gives 1 ?
    if (diceSc !== 1) {
      currentScore += diceSc;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// handling click on host button
btnHoldEl.addEventListener("click", function () {
  if (play) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }
  // checking the winning condition of the player
  if (scores[activePlayer] >= 100) {
    play = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    setTimeout(resetGame, 5000);
  } else {
    switchPlayer();
  }
});

// handling click on new game bttn / loading a new game
btnNewGameEl.addEventListener("click", resetGame);
