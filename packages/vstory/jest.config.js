// const path = require('path');

// module.exports = {
//   runner: 'jest-electron/runner',
//   testEnvironment: 'jest-electron/environment',
//   testTimeout: 30000,
//   testRegex: '/__tests__/.*test\\.ts?$',
//   moduleFileExtensions: ['ts', 'js', 'json'],
//   setupFilesAfterEnv: ['jest-extended/all'],
//   preset: 'ts-jest',
//   silent: true,
//   globals: {
//     'ts-jest': {
//       resolveJsonModule: true,
//       esModuleInterop: true,
//       experimentalDecorators: true,
//       module: 'ESNext',
//       tsconfig: './tsconfig.test.json'
//     },
//     __DEV__: true
//   },
//   setupFiles: ['./setup-mock.js'],
//   verbose: true,
//   coverageReporters: ['json-summary', 'lcov', 'text'],
//   coveragePathIgnorePatterns: ['node_modules', 'demo', 'interface.ts', '.d.ts', 'typings'],
//   testPathIgnorePatterns: ['demo'],
//   collectCoverageFrom: [
//     '**/src/**',
//     '!**/cjs/**',
//     '!**/dist/**',
//     '!**/es/**',
//     '!**/node_modules/**',
//     '!**/demo/**',
//     '!**/interface/**',
//     '!**/interface.ts',
//     '!**/**.d.ts'
//   ],
//   coverageThreshold: {
//     global: {
//       branches: 80,
//       functions: 80,
//       lines: 80,
//       statements: 80
//     }
//   },
//   moduleNameMapper: {}
// };
