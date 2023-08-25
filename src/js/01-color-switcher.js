
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

const changeBackgroundColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  document.body.style.backgroundColor = '';
});