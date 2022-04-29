const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              pre: {
                code: {
                  padding: '0 !important',
                  fontSize: theme('fontSize.base')[0]
                }
              },
              code: {
                borderRadius: theme('borderRadius.md'),
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                fontFamily: 'inherit !important',
                fontWeight: '500 !important',
                color: theme('colors.slate.800'),
                backgroundColor: theme('colors.slate.200')
              },
              'code::before': {
                content: '""'
              },
              'code::after': {
                content: '""'
              },
              hr: {
                borderColor: theme('colors.slate.300')
              },
              ul: {
                marginTop: '0 !important',
                marginBottom: '0 !important'
              },
              li: {
                marginTop: '0 !important',
                marginBottom: '0 !important'
              },
              img: {
                marginLeft: 'auto',
                marginRight: 'auto'
              },
              'h1,h2,h3,h4,h5,h6': {
                a: {
                  color: 'inherit',
                  textDecoration: 'none'
                }
              }
            }
          },
          sm: {
            css: {
              pre: {
                code: {
                  fontSize: theme('fontSize.xs')[0]
                }
              }
            }
          },
          lg: {
            css: {
              h1: {
                fontSize: theme('fontSize.4xl')[0]
              }
            }
          },

          invert: {
            css: {
              hr: {
                borderColor: theme('colors.slate.700')
              },
              code: {
                color: theme('colors.slate.300'),
                backgroundColor: theme('colors.slate.700')
              },

              'a code': {
                color: theme('colors.white')
              },
              'pre, pre code': {
                color: theme('colors.slate.200'),
                backgroundColor: theme('colors.slate.800')
              }
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

module.exports = config
