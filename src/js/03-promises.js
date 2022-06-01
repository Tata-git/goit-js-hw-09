import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
};
// console.dir(refs.form);

// при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount
refs.form.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();

  let firstDelayValue = +refs.form.delay.value;
  const delayStepValue = +refs.form.step.value;
  const amountValue = +refs.form.amount.value;

  for (let position = 0; position <= amountValue; position += 1) {
    firstDelayValue += delayStepValue;

    createPromise(position, firstDelayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//----------------------------------------------------------------
// const firstDelayValue2 = refs.form.delay.value;
// console.log(typeof firstDelayValue2); // string
//------ error---------------------
// const firstDelayValue = +refs.form.delay.value;
// firstDelayValue += delayStepValue; // Error: Assignment to constant variable.  at HTMLFormElement.submitForm
//----->>>>> let firstDelayValue = +refs.form.delay.value;
