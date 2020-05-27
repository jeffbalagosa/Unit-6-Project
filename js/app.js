const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');

// Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
  'UP ALL NIGHT',
  'TWIST OF FATE',
  'WAY OF LIFE',
  'ALL THINGS CONSIDERED',
  'BADGE OF HONOR',
];

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', () => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
});

// Create a getRandomPhraseAsArray function.
function getRandomPhraseAsArray(arr) {
  const listItem = Math.floor(Math.random() * Math.floor(arr.length));
  const word = arr[listItem];
  const phraseAsArray = Array.from(word);
  return phraseAsArray;
}

// Set the game display.
const phraseArray = getRandomPhraseAsArray(phrases);
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
    phrase.appendChild(li);
  }
}

addPhraseToDisplay(phraseArray);

// Create a checkLetter function.
function checkLetter(qwertyKeyPress) {
  const phraseLetterLIs = document.querySelectorAll('.letter');
  for (let i = 0; i < phraseLetterLIs.length; i += 1) {
    const phraseLetterLI = phraseLetterLIs[i].textContent;
    if (qwertyKeyPress.toUpperCase() === phraseLetterLI) {
      phraseLetterLIs[i].className += ' show';
      return phraseLetterLI;
    }
  }
  return null;
}

// Create a checkWin function.
function checkWin() {
  // Check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text.
}

// Add an event listener to the onscreen keyboard.
qwerty.addEventListener('click', (event) => {
  const clickedButton = event.target;
  // When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice.
  clickedButton.className = 'chosen';
  clickedButton.disabled = true;
  // Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.
  const letterFound = checkLetter(clickedButton.textContent);
  console.log(`letterFound = ${letterFound}`);
  // Count the missed guesses in the game.
  if (letterFound === null) {
    missed += 1;
  }
  console.log(`missed = ${missed}`);
});

/*
-Create a checkWin function.
  -Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.
*/
