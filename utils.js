// Basic utility functions for testing
const utils = {
  // Simple math operations
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  },

  // String utilities
  capitalize: (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Array utilities
  findMax: (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return Math.max(...arr);
  },

  // Validation utilities
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

module.exports = utils;
