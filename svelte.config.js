import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import path from 'path'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],

  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      optimizeDeps: {
        exclude: ['@mattjennings/heroicons-svelte/outline']
      },
      resolve: {
        alias: {
          'svelte-modals': path.resolve(process.cwd(), './src/lib/index.ts')
        }
      }
    }
  }
}

export default config
