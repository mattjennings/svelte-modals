import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import examples from 'mdsvexamples'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export default defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [
    require('remark-abbr'),
    [
      examples,
      {
        defaults: {
          Wrapper: '/src/lib/site/Example.svelte'
        }
      }
    ]
  ],
  rehypePlugins: [
    require('rehype-slug'),
    [
      require('rehype-autolink-headings'),
      {
        behavior: 'wrap'
      }
    ]
  ]
})
