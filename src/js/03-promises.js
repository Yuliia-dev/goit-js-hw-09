import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function formSubmit(e) {
  e.preventDefault();

  let delay = Number(formEl[0].value);
  let step = Number(formEl[1].value);
  let amount = Number(formEl[2].value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

// function formSubmit(e) {
//   e.preventDefault();
//   const delay = Number(formEl[0].value);
//   const step = Number(formEl[1].value);
//   const amount = Number(formEl[2].value);

//   for (let i = 1; i <= amount; i += 1) {
//     const incrementDelay = i * step + delay;

//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const shouldResolve = Math.random() > 0.3;
//         if (shouldResolve) {
//           resolve(Notiflix.Notify.success(`Fulfilled promise ${i} in ${incrementDelay}ms`));
//         } else {
//           reject(Notiflix.Notify.failure(`Rejected promise ${i} in ${incrementDelay}ms`));
//         }
//       }, incrementDelay);
//     });
//   }
// }
