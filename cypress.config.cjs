const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://sarahncrowe.com',
    specPattern: 'tests/cypress/integration/**/*.ts',
    supportFile: 'tests/cypress/support/index.ts',
  },
});
