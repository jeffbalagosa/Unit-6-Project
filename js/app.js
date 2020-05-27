const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const missed = 0;
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
const correctGuesses = [];
function checkLetter(qwertyKeyPress) {
  const phraseLetterLIs = document.querySelectorAll('.letter');
  for (let i = 0; i < phraseLetterLIs.length; i += 1) {
    const phraseLetterLI = phraseLetterLIs[i].textContent;
    if (qwertyKeyPress.toUpperCase() === phraseLetterLI) {
      correctGuesses.push(phraseLetterLI);
      phraseLetterLIs[i].className = 'show';
    }
  }
  if (correctGuesses.length > 0) {
    return correctGuesses;
  }
  return null;
}

/*  
-Add an event listener to the keyboard.
  -Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks. See the MDN documentation for more details.
  -Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.  
*/

// Add an event listener to the keyboard.
