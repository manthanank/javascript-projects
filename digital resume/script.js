const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', function() {
  // Toggle the active state of the button
  this.classList.toggle('active');
  // Toggle dark mode on the body
  document.body.classList.toggle('dark-mode');
});
