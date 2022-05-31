import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};
// console.dir(refs.form);

// при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount
refs.form.addEventListener('submit', () => {});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
