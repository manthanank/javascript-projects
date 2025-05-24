const startBtn = document.getElementById('start');
const datetimeInput = document.getElementById('datetime');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

let countdownInterval;

// Set min and max for datetime input dynamically on focus
function updateDateTimeInputRange() {
  const now = new Date();
  const tenYearsFromNow = new Date(now.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
  datetimeInput.min = now.toISOString().slice(0, 16);
  datetimeInput.max = tenYearsFromNow.toISOString().slice(0, 16);

  // If the current value is out of range, reset and show error
  if (datetimeInput.value) {
    const valueTime = new Date(datetimeInput.value).getTime();
    if (valueTime < now.getTime() || valueTime > tenYearsFromNow.getTime()) {
      datetimeInput.value = '';
      showError('Selected date/time is out of range. Please pick a new one.');
    }
  }
}

datetimeInput.addEventListener('focus', updateDateTimeInputRange);
window.addEventListener('DOMContentLoaded', updateDateTimeInputRange);

datetimeInput.addEventListener('input', clearError);

function showError(message) {
  let errorDiv = document.getElementById('error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = '#ff5252';
    errorDiv.style.marginTop = '1rem';
    errorDiv.style.fontWeight = 'bold';
    errorDiv.setAttribute('aria-live', 'polite');
    datetimeInput.parentNode.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

function clearError() {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) errorDiv.textContent = '';
}

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    daysSpan.textContent = '00';
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    startBtn.disabled = false;
    datetimeInput.disabled = false;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');

  if (distance < 1000) {
    // Countdown finished
    clearInterval(countdownInterval);
    startBtn.disabled = false;
    datetimeInput.disabled = false;
  }
}

startBtn.addEventListener('click', () => {
  clearError();
  const target = datetimeInput.value;
  if (!target) {
    showError('Please select a date and time!');
    return;
  }
  const now = new Date().getTime();
  const targetDate = new Date(target).getTime();
  if (isNaN(targetDate)) {
    showError('Invalid date and time!');
    return;
  }
  if (targetDate <= now) {
    showError('Please select a future date and time!');
    return;
  }
  if (targetDate - now < 60 * 1000) {
    showError('Please select a time at least 1 minute from now!');
    return;
  }
  const tenYearsFromNow = now + 10 * 365 * 24 * 60 * 60 * 1000;
  if (targetDate > tenYearsFromNow) {
    showError('Please select a date within 10 years from now!');
    return;
  }
  clearInterval(countdownInterval);
  startBtn.disabled = true;
  datetimeInput.disabled = true;
  updateCountdown(targetDate);
  countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
}); 