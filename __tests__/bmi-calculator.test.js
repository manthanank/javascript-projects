/**
 * @jest-environment jsdom
 */

// Mock the BMI calculator functions
function calculateBMI() {
  var height = parseFloat(document.getElementById('height').value);
  var weight = parseFloat(document.getElementById('weight').value);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    document.getElementById('result').innerHTML = 'Please enter valid height and weight.';
    return;
  }

  var bmi = weight / Math.pow(height / 100, 2);
  document.getElementById('result').innerHTML = 'Your BMI is: ' + bmi.toFixed(2);
}

// Helper function to calculate BMI for testing
function calculateBMIValue(height, weight) {
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return null;
  }
  return weight / Math.pow(height / 100, 2);
}

describe('BMI Calculator', () => {
  beforeEach(() => {
    // Set up DOM elements for testing
    document.body.innerHTML = `
      <input id="height" type="number" />
      <input id="weight" type="number" />
      <div id="result"></div>
    `;
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
  });

  test('should calculate BMI correctly for valid inputs', () => {
    // Test BMI calculation logic
    const bmi = calculateBMIValue(170, 70);
    expect(bmi).toBeCloseTo(24.22, 2);
  });

  test('should return null for invalid height', () => {
    const bmi = calculateBMIValue(0, 70);
    expect(bmi).toBeNull();
  });

  test('should return null for invalid weight', () => {
    const bmi = calculateBMIValue(170, 0);
    expect(bmi).toBeNull();
  });

  test('should return null for negative values', () => {
    const bmi1 = calculateBMIValue(-170, 70);
    const bmi2 = calculateBMIValue(170, -70);
    expect(bmi1).toBeNull();
    expect(bmi2).toBeNull();
  });

  test('should display error message for invalid inputs', () => {
    document.getElementById('height').value = '0';
    document.getElementById('weight').value = '70';

    calculateBMI();

    const result = document.getElementById('result').innerHTML;
    expect(result).toBe('Please enter valid height and weight.');
  });

  test('should display BMI result for valid inputs', () => {
    document.getElementById('height').value = '170';
    document.getElementById('weight').value = '70';

    calculateBMI();

    const result = document.getElementById('result').innerHTML;
    expect(result).toBe('Your BMI is: 24.22');
  });
});
