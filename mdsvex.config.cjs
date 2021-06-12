const {} = require('mdsvex')
module.exports = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  highlight: {
    // highlighter(code, lang) {
    //   return `<pre><code>${code}</code></pre>`
    // }
  },
  remarkPlugins: [require('remark-abbr')],
  rehypePlugins: [
    require('rehype-slug'),
    [
      require('rehype-autolink-headings'),
      {
        behavior: 'wrap'
      }
    ]
  ]
}
