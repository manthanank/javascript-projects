const toggleButton = document.querySelector(".toggle-button");

toggleButton.addEventListener("click", function() {
  this.classList.toggle("active");
});

function myFunction() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}