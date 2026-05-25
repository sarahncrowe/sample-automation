const playwright = require('eslint-plugin-playwright');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', 'tests/cypress/**', 'tests/TestCafe/**', 'tests-examples/**'],
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
  }
);
