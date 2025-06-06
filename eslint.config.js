import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        global: 'readonly',

        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',

        // Browser APIs
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',

        // Timers
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',

        // Browser APIs
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        XMLHttpRequest: 'readonly',

        // DOM APIs
        getComputedStyle: 'readonly',
        IntersectionObserver: 'readonly',

        // File and Blob APIs
        File: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        FileReader: 'readonly',

        // Event APIs
        Event: 'readonly',
        DragEvent: 'readonly',
        DataTransfer: 'readonly',
        KeyboardEvent: 'readonly',
        TouchEvent: 'readonly',
        Touch: 'readonly',

        // DOM APIs
        HTMLElement: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn'],
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    }
  },
  {
    ignores: [
      'node_modules/**',
      '**/*.min.js',
      'coverage/**'
    ]
  }
];
