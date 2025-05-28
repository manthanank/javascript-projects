/**
 * Utility Functions for JavaScript Projects
 * Common utility functions used across multiple projects
 *
 * @author Manthan Ankolekar
 * @version 1.1.0
 * @license MIT
 */

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

  /**
   * Convert string to title case
   * @param {string} str - String to convert
   * @returns {string} Title case string
   */
  toTitleCase: (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Truncate string to specified length
   * @param {string} str - String to truncate
   * @param {number} length - Maximum length
   * @param {string} suffix - Suffix to add (default: '...')
   * @returns {string} Truncated string
   */
  truncate: (str, length, suffix = '...') => {
    if (typeof str !== 'string') return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  },

  // Array utilities
  findMax: (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return Math.max(...arr);
  },

  findMin: (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return Math.min(...arr);
  },

  /**
   * Remove duplicates from array
   * @param {Array} arr - Array to process
   * @returns {Array} Array without duplicates
   */
  removeDuplicates: (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...new Set(arr)];
  },

  /**
   * Shuffle array elements
   * @param {Array} arr - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffle: (arr) => {
    if (!Array.isArray(arr)) return [];
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Group array elements by a key function
   * @param {Array} arr - Array to group
   * @param {Function} keyFn - Function to extract key
   * @returns {Object} Grouped object
   */
  groupBy: (arr, keyFn) => {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  },

  // Validation utilities
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (basic format)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Is valid phone number
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} Is valid URL
   */
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Date utilities
  /**
   * Format date to readable string
   * @param {Date|string} date - Date to format
   * @param {string} format - Format type ('short', 'long', 'time')
   * @returns {string} Formatted date string
   */
  formatDate: (date, format = 'short') => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';

    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    };

    return d.toLocaleDateString('en-US', options[format] || options.short);
  },

  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {Date|string} date - Date to compare
   * @returns {string} Relative time string
   */
  getRelativeTime: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

    return utils.formatDate(date);
  },

  // Number utilities
  /**
   * Format number with thousands separators
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber: (num) => {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString();
  },

  /**
   * Generate random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  randomBetween: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Round number to specified decimal places
   * @param {number} num - Number to round
   * @param {number} decimals - Number of decimal places
   * @returns {number} Rounded number
   */
  roundTo: (num, decimals = 2) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  // Storage utilities
  /**
   * Save data to localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} Success status
   */
  saveToStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  },

  /**
   * Load data from localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Stored value or default
   */
  loadFromStorage: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  },

  // DOM utilities
  /**
   * Create DOM element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} content - Element content
   * @returns {HTMLElement} Created element
   */
  createElement: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.textContent = content;
    }

    return element;
  },

  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  debounce: (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  /**
   * Throttle function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export for CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = utils;
}

// Export for browser
if (typeof window !== 'undefined') {
  window.utils = utils;
}
