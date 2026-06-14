const playwright = require('eslint-plugin-playwright');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: ['**/tests-examples/**', '**/tc-01-home-page.js', '**/swag-labs-home.js', '**/swag-labs-login.js'],
  },
  {
    files: ['../tests/playwright/**/*.ts', '../models/playwright/**/*.ts'],
    plugins: {
      playwright: playwright,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './config/tsconfig.json',
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['../tests/TestCafe/personal-site/**/*.ts', '../models/testcafe/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './config/tsconfig.testcafe.json',
      },
    },
  },
  {
    files: ['../tests/cypress/**/*.ts', '../models/cypress/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './config/tsconfig.cypress.json',
      },
    },
  },
);
