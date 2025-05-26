const utils = require('../utils');

describe('Utility Functions', () => {
  describe('Math Operations', () => {
    test('should add two numbers correctly', () => {
      expect(utils.add(2, 3)).toBe(5);
      expect(utils.add(-1, 1)).toBe(0);
      expect(utils.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should subtract two numbers correctly', () => {
      expect(utils.subtract(5, 3)).toBe(2);
      expect(utils.subtract(1, 1)).toBe(0);
      expect(utils.subtract(-2, -1)).toBe(-1);
    });

    test('should multiply two numbers correctly', () => {
      expect(utils.multiply(3, 4)).toBe(12);
      expect(utils.multiply(-2, 3)).toBe(-6);
      expect(utils.multiply(0, 5)).toBe(0);
    });

    test('should divide two numbers correctly', () => {
      expect(utils.divide(10, 2)).toBe(5);
      expect(utils.divide(15, 3)).toBe(5);
      expect(utils.divide(-10, 2)).toBe(-5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => utils.divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('String Operations', () => {
    test('should capitalize first letter of string', () => {
      expect(utils.capitalize('hello')).toBe('Hello');
      expect(utils.capitalize('WORLD')).toBe('WORLD');
      expect(utils.capitalize('a')).toBe('A');
    });

    test('should return empty string for non-string input', () => {
      expect(utils.capitalize(123)).toBe('');
      expect(utils.capitalize(null)).toBe('');
      expect(utils.capitalize(undefined)).toBe('');
    });

    test('should handle empty string', () => {
      expect(utils.capitalize('')).toBe('');
    });
  });

  describe('Array Operations', () => {
    test('should find maximum value in array', () => {
      expect(utils.findMax([1, 2, 3, 4, 5])).toBe(5);
      expect(utils.findMax([-1, -2, -3])).toBe(-1);
      expect(utils.findMax([42])).toBe(42);
    });

    test('should return null for empty or invalid arrays', () => {
      expect(utils.findMax([])).toBeNull();
      expect(utils.findMax(null)).toBeNull();
      expect(utils.findMax('not an array')).toBeNull();
    });
  });

  describe('Validation Functions', () => {
    test('should validate email addresses correctly', () => {
      expect(utils.isValidEmail('test@example.com')).toBe(true);
      expect(utils.isValidEmail('user.name@domain.org')).toBe(true);
      expect(utils.isValidEmail('user+tag@example.co.uk')).toBe(true);
    });

    test('should reject invalid email addresses', () => {
      expect(utils.isValidEmail('invalid-email')).toBe(false);
      expect(utils.isValidEmail('@example.com')).toBe(false);
      expect(utils.isValidEmail('user@')).toBe(false);
      expect(utils.isValidEmail('user@domain')).toBe(false);
      expect(utils.isValidEmail('')).toBe(false);
    });
  });
});
