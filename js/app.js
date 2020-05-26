const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const missed = 0;
const startButton = document.querySelector('.btn__reset');
const phrases = [
  'UP ALL NIGHT',
  'TWIST OF FATE',
  'WAY OF LIFE',
  'ALL THINGS CONSIDERED',
  'BADGE OF HONOR',
];

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
