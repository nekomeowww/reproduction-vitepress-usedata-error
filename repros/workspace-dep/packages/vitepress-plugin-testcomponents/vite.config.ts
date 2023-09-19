import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  plugins: [
    Vue(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vitepress-plugin-usedata',
      fileName: (format: string) =>
        format === 'es'
          ? `index.${format}.mjs`
          : `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'vitepress',
      ],
      output: {
        globals: {
          vue: 'Vue',
          vitepress: 'vitepress',
        },
      },
    },
  },
})
