// Описан в документации
// import flatpickr from 'flatpickr'; //  es modules are recommended, if available, especially for typescript
// const flatpickr = require('flatpickr');  // commonjs


// Дополнительный импорт стилей
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';


const refs = {
//   input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('data-start'),
};

let intervalId = null;
// refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// // const calendar = flatpickr(refs.input, options)
// // https://flatpickr.js.org/instance-methods-properties-elements/
// const calendar = flatpickr('#datetime-picker', options);

// Модуль уведомления - https://github.com/notiflix/Notiflix#usage

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}