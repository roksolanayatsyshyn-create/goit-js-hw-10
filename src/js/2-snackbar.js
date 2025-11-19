import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// refs
const refs={
  form:document.querySelector('.form'),
  delay:document.querySelector('[name="delay"]'),
  state: document.querySelectorAll('[name="state"]'),
}


function onCreatePromis(event) {
  event.preventDefault();
  const delay = Number(refs.delay.value);
  const state = [...refs.state].find(radio => radio.checked).value;
  const isSuccess = state === "fulfilled";

// Create promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve(`Fulfilled promise in ${delay}ms`)    
    }
     else {
      reject( `Rejected promise in ${delay}ms`)
    }
  }, delay)
});

// Registering promise callbacks
promise
.then(messagePromit=>{
      console.log(messagePromit)
      iziToast.success({
        message: messagePromit,
        position: "topRight"
      });
    })
    .catch(messagePromit=>{
      console.log(messagePromit)
      iziToast.error({
        message: messagePromit,
        position: "topRight"
      });
    })
  .finally(() => console.log("Promise settled")); // "Promise settled"


}
// listeners
refs.form.addEventListener("submit", onCreatePromis)
