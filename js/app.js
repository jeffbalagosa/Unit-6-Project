// Thanks for taking a look!  You can find the Exceeds requirements on line 66 of app.js and line 96 of styles.css

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const p = document.createElement('p');
const overlayParagraph = overlay.appendChild(p);
let phraseArray;
let missed = 0;

// Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
  'UP ALL NIGHT',
  'TWIST OF FATE',
  'WAY OF LIFE',
  'ALL THINGS CONSIDERED',
  'BADGE OF HONOR',
];

// Create a getRandomPhraseAsArray function.
function getRandomPhraseAsArray(arr) {
  const listItem = Math.floor(Math.random() * Math.floor(arr.length));
  const word = arr[listItem];
  const phraseAsArray = Array.from(word);
  return phraseAsArray;
}

// Set the game display.

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const e = arr[i];
    const li = document.createElement('li');
    li.textContent = e;
    if (e !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    phrase.querySelector('ul').appendChild(li);
  }
}

// reset scoreboard section
function resetScoreboard() {
  const lis = document.querySelectorAll('#scoreboard li');
  const images = document.querySelectorAll('#scoreboard img');
  for (let i = 0; i < lis.length; i += 1) {
    const li = lis[i];
    const image = images[i];
    image.src = 'images/liveHeart.png';
    li.className = 'tries';
  }
}

// Reset querty keyboard section
function resetKeyboard() {
  const qwertyButtons = qwerty.querySelectorAll('button');
  for (let i = 0; i < qwertyButtons.length; i += 1) {
    const eachButton = qwertyButtons[i];
    eachButton.classList.remove('chosen');
    eachButton.disabled = false;
  }
}

// For Exceeds.  A button has been added to the “lose” and “win” overlays to reset the game
// Create and set new game board
function resetGame() {
  missed = 0;
  phrase.querySelector('ul').innerHTML = '';
  resetKeyboard();
  resetScoreboard();
  phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  resetGame();
});

// Create a checkLetter function.
function checkLetter(letterClicked) {
  const phraseLetterLIs = document.querySelectorAll('.letter');
  let letterIsThere;
  for (let i = 0; i < phraseLetterLIs.length; i += 1) {
    const phraseLetterLI = phraseLetterLIs[i].textContent;
    if (letterClicked.toUpperCase() === phraseLetterLI) {
      phraseLetterLIs[i].className += ' show';
      letterIsThere = true;
    }
  }
  if (letterIsThere) {
    return letterClicked;
  }
  return null;
}

// Create a checkWin function.
function checkWin() {
  const letterArray = document.querySelectorAll('.letter');
  const showArray = document.querySelectorAll('.show');
  // Set overlay for win or lose scenario.
  if (letterArray.length === showArray.length) {
    overlay.style.display = 'flex';
    overlay.className = 'win';
    startButton.textContent = 'New game?';
    overlayParagraph.textContent = 'You win! Why not try your luck again?';
  } else if (missed > 4) {
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    startButton.textContent = 'New game?';
    overlayParagraph.textContent = 'You lose! Better luck next time!';
  }
}

// Add an event listener to the onscreen keyboard.
qwerty.addEventListener('click', (event) => {
  const clickedButton = event.target;
  // When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice.
  if (clickedButton.tagName === 'BUTTON') {
    clickedButton.className = 'chosen';
    clickedButton.disabled = true;
    // Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound.
    const letterFound = checkLetter(clickedButton.textContent);
    // Count the missed guesses in the game.  And remove hearts accordingly.
    const triesArray = document.querySelectorAll('.tries');
    const triesImageArray = document.querySelectorAll('.tries img');
    if (letterFound === null) {
      missed += 1;
      triesArray[0].className = '';
      triesImageArray[0].src = 'images/lostHeart.png';
    }
    checkWin();
  }
});
