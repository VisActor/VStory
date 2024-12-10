import pkg from '../packages/vstory/package.json';
import * as path from 'path';
import react from '@vitejs/plugin-react';

export default {
  optimizeDeps: {},
  server: {
    host: '0.0.0.0',
    port: 3020,
    https: !!process.env.HTTPS,
    open: true
  },
  define: {
    __DEV__: true,
    __VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      '@visactor/vstory': path.resolve(__dirname, '../packages/vstory/src/index.ts'),
      '@visactor/vstory-core': path.resolve(__dirname, '../packages/vstory-core/src/index.ts'),
      '@visactor/vstory-render': path.resolve(__dirname, '../packages/vstory-render/src/index.ts'),
      '@visactor/vstory-animate': path.resolve(__dirname, '../packages/vstory-animate/src/index.ts'),
      '@visactor/vstory-player': path.resolve(__dirname, '../packages/vstory-player/src/index.ts'),
      '@visactor/vstory-templates': path.resolve(__dirname, '../packages/vstory-templates/src/index.ts'),
      '@visactor/vstory-external': path.resolve(__dirname, '../packages/vstory-external/src/index.ts')
    }
  },
  plugins: [react()]
};
