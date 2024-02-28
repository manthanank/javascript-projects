function calculateBMI() {
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('result').innerHTML = "Please enter valid height and weight.";
        return;
    }

    var bmi = weight / Math.pow(height / 100, 2);
    document.getElementById('result').innerHTML = "Your BMI is: " + bmi.toFixed(2);
}