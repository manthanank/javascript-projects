function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
  
    var isValid = true;
  
    if (name === "") {
      nameError.textContent = "Name is required";
      isValid = false;
    }
  
    if (email === "") {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid email format";
      isValid = false;
    }
  
    if (password === "") {
      passwordError.textContent = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters long";
      isValid = false;
    }
  
    return isValid;
  }
  
  function isValidEmail(email) {
    // Basic email validation using regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  