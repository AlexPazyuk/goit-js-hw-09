import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval = null;
let selectedDate = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const updateTimer = () => {
  const now = new Date().getTime();
  const timeRemaining = selectedDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    timerFields.days.textContent = "00";
    timerFields.hours.textContent = "00";
    timerFields.minutes.textContent = "00";
    timerFields.seconds.textContent = "00";
    startBtn.removeAttribute('disabled');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
};

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date().getTime();
    if (selectedDate <= now) {
      window.alert("Please choose a date in the future");
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
});

startBtn.addEventListener('click', () => {
  selectedDate = new Date(datePicker.value).getTime();

  clearInterval(countdownInterval);
  startBtn.setAttribute('disabled', 'true');
  updateTimer();

  countdownInterval = setInterval(() => {
    updateTimer();
  }, 1000);
});