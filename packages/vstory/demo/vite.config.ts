import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import localConf from './vite.config.local';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    {
      name: 'configure-response-headers',
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      }
    }
  ],
  define: {
    __VERSION__: JSON.stringify(require('../package.json').version)
  },
  resolve: {
    alias: {
      '@visactor/vstory': path.resolve(__dirname, '../../vstory/src/index.ts'),
      '@visactor/vstory-core': path.resolve(__dirname, '../../vstory-core/src/index.ts'),
      '@visactor/vstory-render': path.resolve(__dirname, '../../vstory-render/src/index.ts'),
      '@visactor/vstory-animate': path.resolve(__dirname, '../../vstory-animate/src/index.ts')
      // '@visactor/vchart': path.resolve(__dirname, '../../vchart/src/index'),
      // '@visactor/vutils-extension': path.resolve(__dirname, '../../vutils-extension/src/index.ts'),
      // '@visactor/vrender-core': '/Users/bytedance/dev/github/vr/packages/vrender-core/src/index.ts',
      // '@visactor/vrender-kits': '/Users/bytedance/dev/github/vr/packages/vrender-kits/src/index.ts',
      // '@visactor/vrender-components': '/Users/bytedance/dev/github/vr/packages/vrender-components/src/index.ts',
      // ...localConf?.resolve?.alias
    }
  }
});
