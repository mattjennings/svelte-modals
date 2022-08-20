/// <reference types="vitest" />
// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
import examples from 'mdsvexamples/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit(), examples],
  optimizeDeps: {
    exclude: ['@mattjennings/heroicons-svelte/outline']
  },
  resolve: {
    alias: {
      'svelte-modals': path.resolve(process.cwd(), './src/lib/index.ts')
    }
  },
  test: {
    globals: true,
    dir: './src/lib'
  }
})
