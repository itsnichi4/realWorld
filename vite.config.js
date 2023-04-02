import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@babel/polyfill'],
  },
  build: {
    outDir: 'dist',
    minify:false,
    emptyOutDir: true,
    sourcemap:true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
      output: {
        // Set the file names to main.js and styles.css
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        assetFileNames: 'styles.css',
      },}
    },
  server: {
    watch: true,
  },
  css: {
    modules: true,

    preprocessorOptions: {
      css: {
        // This is where you would specify your loaders for CSS files
        // In this case we're using 'css-loader' and 'style-loader' to handle CSS files
        additionalData: `@import "pico.css";`,
        loaderOptions: {
          css: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          less: {
            javascriptEnabled: true,
          },
        },
      },
    },
  },
});