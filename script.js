let randomNumber = Math.round(Math.random() * 100 + 1);
console.log(randomNumber);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlots = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");
let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

// to validate that values is between 1 to 100
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please Provide a Valid Number");
  } else if (guess < 1) {
    alert("Please Provide a Number greater than 1");
  } else if (guess > 100) {
    alert("Please Provide a Number less than 100");
  } else {
    prevGuess.push(guess);
    if (numGuess >= 10) {
      displayGuess(guess);
      displayMessage(`Game Over, Random Number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

// to check value is equal to random number
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`Yes, you guessed it right ${guess}`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`number is TOOO LOW`);
  } else if (guess > randomNumber) {
    displayMessage(`number is TOOO HIGH`);
  }
}

// to clear previes values
function displayGuess(guess) {
  userInput.value = "";
  guessSlots.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} left`;
}

// to display message
function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  p.style.cursor = "pointer";
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameBtn = document.querySelector("#newGame");
  newGameBtn.addEventListener("click", function (event) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlots.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess} left`;
    userInput.removeAttribute("disabled", "");
    startOver.removeChild(p);
    playGame = true;
  });
}
