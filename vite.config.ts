import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { resolve } from 'path';
import transformerDirective from '@unocss/transformer-directives';

// https://vitejs.dev/config/
export default ({ mode }) => ({
  plugins: [react(), Unocss({ transformers: [transformerDirective()] })],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': {
        target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
        changeOrigin: true,
      },
    },
  },
});
