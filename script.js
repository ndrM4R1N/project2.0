let timer;
let totalSeconds;
let isPaused = false;

const display = document.getElementById('display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function startTimer() {
  if (isPaused) {
    isPaused = false;
  } else {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      alert('Please enter a valid time.');
      return;
    }
  }

  timer = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function updateTimer() {
  if (totalSeconds > 0 && !isPaused) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    totalSeconds--;
  } else {
    clearInterval(timer);
    display.textContent = '00:00:00';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    if (!isPaused) {
      showNotification();
    }
  }
}

function resetTimer() {
  clearInterval(timer);
  isPaused = false;
  display.textContent = '00:00:00';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function showNotification() {
  if (Notification.permission === 'granted') {
    new Notification('Countdown Timer', {
      body: 'The timer has ended!',
      icon: 'favicon.ico',
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Countdown Timer', {
          body: 'The timer has ended!',
          icon: 'favicon.ico',
        });
      }
    });
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
