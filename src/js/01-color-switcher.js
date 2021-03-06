const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');

startEl.addEventListener('click', startGenerisColor);
stopEl.addEventListener('click', stopGenerisColor);
let timerId = null;

function startGenerisColor() {
  startEl.disabled = true;
  stopEl.disabled = false;
  const bodyEl = document.querySelector('body');
  bodyEl.classList.add('color');
  const colorBody = document.querySelector('.color');

  timerId = setInterval(() => {
    colorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopGenerisColor() {
  stopEl.disabled = true;
  startEl.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
