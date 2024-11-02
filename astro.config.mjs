// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import liveCode from 'astro-live-code'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  srcDir: 'docs',
  outDir: 'dist-docs',
  vite: {
    resolve: {
      alias: {
        'svelte-modals/legacy': '/src/lib/legacy.svelte.ts',
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
            { label: 'Modal Components', slug: 'usage/modal-components' },
            { label: '<ModalStack />', slug: 'usage/modal-stack' },
            { label: 'API Reference', slug: 'usage/api' },
            { label: 'v2 Migration', slug: 'usage/v2-migration' }
          ]
        }
      ],
      customCss: ['./docs/styles.css']
    }),
    svelte({
      preprocess: []
    }),
    liveCode({
      layout: '/docs/content/layouts/code/Code.astro',
      defaultProps: {
        'client:load': true
      }
    })
  ]
})
