const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5500', // Change from 8000 to 5500
    setupNodeEvents(on, config) {
    },
  },
})