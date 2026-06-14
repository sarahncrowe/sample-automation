const playwright = require('eslint-plugin-playwright');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'tests-examples/**',
      'tests/TestCafe/tc-01-home-page.js',
      'models/testcafe/swag-labs-home.js',
      'models/testcafe/swag-labs-login.js',
    ],
  },
  {
    files: ['tests/playwright/**/*.ts', 'models/playwright/**/*.ts'],
    plugins: {
      playwright: playwright,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['tests/TestCafe/personal-site/**/*.ts', 'models/testcafe/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tests/TestCafe/tsconfig.json',
      },
    },
  },
  {
    files: ['tests/cypress/**/*.ts', 'models/cypress/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tests/cypress/tsconfig.json',
      },
    },
  },
);
