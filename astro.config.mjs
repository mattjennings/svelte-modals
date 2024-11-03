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
        'svelte-modals': '/src/lib/index.ts',
        $lib: '/docs/lib'
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
          label: 'Overview',
          items: [
            { label: 'Getting Started', slug: 'overview/getting-started' },
            { label: 'How it works', slug: 'overview/how-it-works' }
          ]
        },
        {
          label: 'Modal Components',
          items: [
            { label: 'Props', slug: 'modal-components/props' },
            { label: 'Transitions', slug: 'modal-components/transitions' },
            { label: 'Snippets', slug: 'modal-components/snippets' },
            { label: 'Lazy Loading', slug: 'modal-components/lazy-loading' }
          ]
        },
        {
          label: 'API',
          items: [
            { label: 'modals', slug: 'api/modals' },
            { label: '<Modals />', slug: 'api/modals-component' }
          ]
        },
        {
          label: 'Migrations',
          items: [{ label: 'v2', slug: 'migrations/v2' }]
        }
      ],
      customCss: ['./docs/styles.css']
    }),
    svelte({
      preprocess: []
    }),
    liveCode({
      layout: '/docs/lib/layouts/code/Code.astro',
      defaultProps: {
        'client:load': true
      }
    })
  ]
})
