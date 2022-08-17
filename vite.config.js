import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
import examples from 'mdsvexamples/vite'

export default {
  plugins: [sveltekit(), examples],
  optimizeDeps: {
    exclude: ['@mattjennings/heroicons-svelte/outline']
  },
  resolve: {
    alias: {
      'svelte-modals': path.resolve(process.cwd(), './src/lib/index.ts')
    }
  }
}
