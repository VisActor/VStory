/**
 * @type {Partial<import('@visactor/bundler').Config>}
 */
module.exports = {
  formats: ['cjs', 'es', 'umd'],
  name: 'VStory',
  umdOutputFilename: 'index',
  external: [],
  globals: {}
};
