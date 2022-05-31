import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let selectedDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();

    if (selectedDate < Date.now()) {
      refs.startBtn.disabled = true;
      return Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }

    refs.startBtn.addEventListener('click', timeReference);

    function timeReference() {
      refs.startBtn.disabled = true;

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedDate - currentTime;

        if (deltaTime < 1000) {
          clearInterval(intervalId);
        }
        const timeLeftUntilTheSpecifiedDate = convertMs(deltaTime);

        updateClockFace(timeLeftUntilTheSpecifiedDate);
      }, 1000);
    }
  },
};

const fpCalendar = flatpickr('#datetime-picker', options);

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
//----------------------------------------------------------------------
// // Описан в документации
// import flatpickr from 'flatpickr'; //  es modules are recommended, if available, especially for typescript
// // const flatpickr = require('flatpickr ');  // commonjs
// // Дополнительный импорт стилей
// import 'flatpickr/dist/flatpickr.min.css';

// // import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };
// let intervalId = null;
// let selectedDate = null;
// refs.startBtn.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     // console.log(selectedDates[0]);
//     selectedDate = selectedDates[0].getTime();

//     if (selectedDate < Date.now()) {
//       refs.startBtn.disabled = true;
//       return Notify.failure('Please choose a date in the future');
//     } else {
//       refs.startBtn.disabled = false;

//     }

//     refs.startBtn.addEventListener('click', timeReference); // при клике по которой таймер должен запускаться.
//     //-----------------------------------------------
//     function timeReference() {
//       refs.startBtn.disabled = true;

//       intervalId = setInterval(() => {
//         const currentTime = Date.now();
//         const deltaTime = selectedDate - currentTime;
//         // console.log(deltaTime);

//         if (deltaTime < 1000) {
//           clearInterval(intervalId);
//         }
//         const timeLeftUntilTheSpecifiedDate = convertMs(deltaTime);
//         // console.log(timeLeftUntilTheSpecifiedDate);

//         updateClockFace(timeLeftUntilTheSpecifiedDate);
//         // console.log(timeLeftUntilTheSpecifiedDate);
//       }, 1000);
//     }
//   },
// };

// // -------------инициализация библиотеки---------------
// // // https://flatpickr.js.org/instance-methods-properties-elements/
// // const fp = flatpickr("#myID", {}); // flatpickr
// // const fpCalendar = flatpickr('#datetime-picker', {});
// const fpCalendar = flatpickr('#datetime-picker', options);
// // console.table(fpCalendar);

// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.textContent = `${hours}`;
//   refs.minutes.textContent = `${minutes}`;
//   refs.seconds.textContent = `${seconds}`;
//   // console.log(refs.days);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

//----------------------------------------------------------------------
// // Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr.
// function onClose(selectedDates) {
//   selectedDate = selectedDates[0].getTime();

//   // Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
//   // Модуль уведомления - https://github.com/notiflix/Notiflix#usage
//   // Notiflix.Notify.failure('Qui timide rogat docet negare');
//   // Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.
//   // getTime() -> https://www.edu.goit.global/ru/learn/847265/2294/2303/textbook
//   if (selectedDate < Date.now()) {
//     refs.startBtn.disabled = true;
//     return Notify.failure('Please choose a date in the future');
//   }
//   // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
//   refs.startBtn.disabled = false;
//   return;
// }

//   //  Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// refs.startBtn.disabled = false;
//-------------------------------
//  Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
// pad(value) {
//   return String(value).padStart(2, '0');
// }
