import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startElBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDate = null;

startElBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startElBtn.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};
flatpickr(inputEl, options);

function startTimer() {
  inputEl.disabled = true;
  startElBtn.disabled = true;
  const countDown = selectedDate;

  timerId = setInterval(function () {
    const now = Date.now();
    const distance = countDown - now;
    const result = convertMs(distance);

    daysEl.innerText = result.days;
    hoursEl.innerText = result.hours;
    minutesEl.innerText = result.minutes;
    secondsEl.innerText = result.seconds;

    if (distance < 1) {
      Notiflix.Notify.info(
        'The time before the sale is over. We are waiting for you in our store "GOIT" 🎉',
      );
      clearInterval(timerId);
      inputEl.disabled = false;
      startElBtn.disabled = false;
      (daysEl.innerText = '00'),
        (hoursEl.innerText = '00'),
        (minutesEl.innerText = '00'),
        (secondsEl.innerText = '00');
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(distance) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(distance / day));
  const hours = pad(Math.floor((distance % day) / hour));
  const minutes = pad(Math.floor((distance % hour) / minute));
  const seconds = pad(Math.floor((distance % minute) / second));

  return { days, hours, minutes, seconds };
}
