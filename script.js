const RANDOM_TEXT_API = 'https://api.quotable.io/random?minLength=150&maxLength=250';
const timer = document.getElementsByClassName('timer')[0];
const randomText = document.getElementById('randomText');
const inputText = document.getElementById('inputText');

const endScreen = document.getElementsByClassName('end-screen')[0];
const showAccuracy = document.getElementById('accuracy');
const WPM = document.getElementById('wpm');
const time = document.getElementById('time');
const textLength = inputText.value.length;

function getRandomText () {
  return fetch(RANDOM_TEXT_API)
    .then(response => response.json())
    .then(data => data.content)
}

async function getNextText () {
  endScreen.classList.remove('show');
  const text = await getRandomText();
  randomText.innerHTML = '';
  let id = 0;
  text.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    randomText.appendChild(characterSpan);
    characterSpan.id = id;
    id++;
  });
  inputText.value = null
  timer.innerText = 0;
  inputText.disabled = false;
}

getNextText()

let started = false;
function start () {
  started = true;

  const timerInterval = setInterval(function() {
    const currentTime = parseFloat(timer.innerText)
    const newTime = currentTime + .01
    timer.innerText = newTime.toFixed(2);
    if (!started) {
      clearInterval(timerInterval);
    }
  }, 10)
}

function accuracy () {
  const correct = document.querySelectorAll('.green').length;
  const score = correct / inputText.value.length * 100;
  showAccuracy.innerText = 'Accuracy: ' + score.toFixed(1) + '%';  
};

function wpm () {
  let words = 1;
  for (let i = 0; i < textLength; i++) {
    if (i === ' ') {
      words++;
      console.log(words);
    }
  }
  const minutes = parseFloat(timer.innerText) / 60
  const wordsPerMinute = words / minutes;
  WPM.innerText = 'WPM' + wordsPerMinute.toFixed(1);
};

inputText.addEventListener('keypress', function (e) {
  if (!started) {
    start();
  }
  const keyIndex = inputText.value.length;
  const textIndex = randomText.innerText[keyIndex];

  switch (e.key) {
    case textIndex:
      document.getElementById(keyIndex).classList.add('green');
      break;
    default:
      document.getElementById(keyIndex).classList.add('red');
      break;
  }

  if (randomText.innerText[keyIndex + 1] == null) {
    inputText.disabled = true;
    endScreen.classList.add('show');
    started = false;
    accuracy();
    wpm();
  }
});

inputText.addEventListener('keydown', (e) => {
  const keyIndex = inputText.value.length;
  if (e.key === 'Backspace') {
    document.getElementById(keyIndex - 1).classList.remove('green');
    document.getElementById(keyIndex - 1).classList.remove('red');
  }
});