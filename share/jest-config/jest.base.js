const fs = require('fs');
const path = require('path');

const rushNodeModulesPath = path.resolve(__dirname, '../../common/temp/node_modules/.pnpm/node_modules');

function resolveMappedModule(request) {
  try {
    return require.resolve(request, {
      paths: [__dirname, rushNodeModulesPath]
    });
  } catch (error) {
    const fallbackPath = path.resolve(rushNodeModulesPath, request);

    if (fs.existsSync(fallbackPath)) {
      return fallbackPath;
    }

    return null;
  }
}

const moduleNameMapper = {};
const d3ColorPath = resolveMappedModule('d3-color/dist/d3-color.min.js');
const d3ArrayPath = resolveMappedModule('d3-array/dist/d3-array.min.js');
const d3HierarchyPath = resolveMappedModule('d3-hierarchy/dist/d3-hierarchy.min.js');

if (d3ColorPath) {
  moduleNameMapper['^d3-color$'] = d3ColorPath;
}

if (d3ArrayPath) {
  moduleNameMapper['^d3-array$'] = d3ArrayPath;
}

if (d3HierarchyPath) {
  moduleNameMapper['^d3-hierarchy$'] = d3HierarchyPath;
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  silent: true,
  testMatch: [
    "**/__tests__/**/*.test.[jt]s"
  ],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        resolveJsonModule: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        module: 'ESNext'
        // ts-jest configuration goes here
      },
    ],
  },
  globals: {
    __DEV__: true,
  },
  verbose: false,

  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**'],
  moduleNameMapper
};
