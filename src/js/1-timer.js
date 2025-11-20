import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



    

// refs
const refs={
  calendar:document.querySelector('#datetime-picker'),
  timer:document.querySelectorAll('.value'),
  buttonTimer: document.querySelector('[type="button"]')
}

refs.buttonTimer.disabled = true;

let userSelectedDate = null;


flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      refs.buttonTimer.disabled = true;
      iziToast.warning({
        message: "Please choose a date in the future",
        position: 'topRight',
      });
      return;
    }

    refs.buttonTimer.disabled = false;
  },
});



refs.buttonTimer.disabled = true;
function showTimer() {
  refs.buttonTimer.disabled = true;
  refs.calendar.disabled=true;
  
  const intervalId = setInterval(() => {
    const ms = userSelectedDate - new Date();
    if (ms <= 0) {
      clearInterval(intervalId);
      refs.calendar.disabled=false;

     return
    }
    convertMs(ms);
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

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
refs.timer[0].textContent=addLeadingZero(days);
refs.timer[1].textContent=addLeadingZero(hours);
refs.timer[2].textContent=addLeadingZero(minutes);
refs.timer[3].textContent=addLeadingZero(seconds);
  return { days, hours, minutes, seconds };
}



// listeners
refs.buttonTimer.addEventListener("click", showTimer)