// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import liveCode from 'astro-live-code'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  srcDir: 'docs',
  vite: {
    resolve: {
      alias: {
        'svelte-modals': '/src/lib/index.ts'
      },
      dedupe: ['svelte-modals']
    }
  },
  integrations: [
    starlight({
      title: 'Svelte Modals',
      social: {
        github: 'https://github.com/mattjennings/svelte-modals'
      },
      sidebar: [
        {
          label: 'Usage',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Getting Started', slug: 'usage/getting-started' },
            { label: 'The Modal Stack', slug: 'usage/the-modal-stack' },
            { label: 'Modal Components', slug: 'usage/modal-components' },
            { label: 'API Reference', slug: 'usage/api' }
          ]
        }
      ],
      customCss: ['./docs/styles.css']
    }),
    svelte({
      preprocess: []
    }),
    liveCode({
      defaultProps: {
        'client:load': true
      }
    })
  ]
})
