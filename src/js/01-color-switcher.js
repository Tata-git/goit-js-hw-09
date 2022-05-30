const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;

// console.log('before');

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', startChangeBackgroundColor);
refs.stopBtn.addEventListener('click', stopChangeBackgroundColor);

function startChangeBackgroundColor() {
  //   console.log('call 1');
  intervalId = setInterval(changeBackgroundColor, CHANGE_COLOR_DELAY);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  //   console.log('call 2');
}

function stopChangeBackgroundColor() {
  clearInterval(intervalId);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  //   console.log('stop');
}

function changeBackgroundColor() {
  //   console.log('call 3');
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
