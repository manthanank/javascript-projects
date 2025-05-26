let timer = null;
let startTime = 0;
let elapsed = 0;
let running = false;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const msEl = document.getElementById('milliseconds');

function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor((time / (1000 * 60 * 60)));
  hoursEl.textContent = h.toString().padStart(2, '0');
  minutesEl.textContent = m.toString().padStart(2, '0');
  secondsEl.textContent = s.toString().padStart(2, '0');
  msEl.textContent = ms.toString().padStart(2, '0');
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay(elapsed);
  }, 10);
}

function stop() {
  if (!running) return;
  running = false;
  clearInterval(timer);
}

function reset() {
  stop();
  elapsed = 0;
  updateDisplay(0);
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);

// Initialize display
updateDisplay(0);
updateDisplay(0);
