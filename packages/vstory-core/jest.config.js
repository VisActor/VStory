const path = require('path');
const base = require('../../share/jest-config/jest.base');
const tsJestTransform = base.transform['^.+\\.ts?$'];

module.exports = {
  ...base,
  rootDir: __dirname,
  setupFiles: ['./setup-mock.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  globals: {
    ...base.globals,
    'ts-jest': {
      ...tsJestTransform[1],
      tsconfig: path.resolve(__dirname, './tsconfig.test.json')
    }
  }
};
