const RANDOM_TEXT_API = 'https://api.quotable.io/random?minLength=150&maxLength=250';
const timer = document.getElementById('timer');
const randomText = document.getElementById('randomText');
const inputText = document.getElementById('inputText');

const endScreen = document.getElementsByClassName('end-screen')[0];

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
}

getNextText()

inputText.addEventListener('keypress', function (key) {
  const pressedKey = key.key;
  const keyIndex = inputText.value.length;
  const textIndex = randomText.innerText[keyIndex];
  if (pressedKey === textIndex) {
    document.getElementById(keyIndex).style.color = 'green';
  } else {
    document.getElementById(keyIndex).style.color = 'red';
  }
  if (randomText.innerText[keyIndex + 1] == null) {
    endScreen.classList.add('show');
    getScore();
  }
});

function getScore () {
  
}

console.log()