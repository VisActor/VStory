const base = require('../../share/jest-config/jest.base');

module.exports = {
  ...base,
  rootDir: __dirname,
  setupFiles: ['./setup-mock.js']
};
