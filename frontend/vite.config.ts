import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: {
    //   antlr4ts: 'antlr4ts-browser',
    //   'antlr4/src/antlr4': {
    //     ''
    //   }
    // },
    // alias: [{ find: /^antlr4\/src\/antlr4\/(.+)$/,  }],
  },
  define: {
    'process.env': {},
  },
});
