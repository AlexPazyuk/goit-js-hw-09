document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const firstDelay = parseInt(formData.get('delay'), 10);
    const step = parseInt(formData.get('step'), 10);
    const amount = parseInt(formData.get('amount'), 10);

    for (let i = 0; i < amount; i++) {
      const delay = firstDelay + step * i;
      createPromise(i + 1, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });// Fulfill
      } else {
        reject({ position, delay });// Reject
      }
    }, delay);
  });
}
});

