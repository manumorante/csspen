const PEN_SIZE = 220

module.exports = {
  content: ['./components/**/*.jsx', './pages/**/*.jsx'],
  safelist: ['debug'],
  theme: {
    extend: {
      screens: {
        xs: '321px',
      },

      spacing: {
        pen: `${PEN_SIZE}px`,
      },

      animation: {
        fadeIn: 'afadeIn 1s ease-in-out forwards',
        appear: 'afadeIn 1s ease-in 12s forwards',
        progress: 'aProgress 1s linear forwards',
      },

      keyframes: () => ({
        afadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        aProgress: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      }),
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('children', '& *')
    },

    function ({ addComponents }) {
      addComponents({
        /* Apply smoothing transition to all children */
        '.transition-all-children': {
          '*': {
            transition: 'all .5s ease-in-out',
            '&::before': {
              transition: 'all .5s ease-in-out',
            },
            '&::after': {
              transition: 'all .5s ease-in-out',
            },
          },
        },

        /* Debug: show a red border for all */
        '.debug': {
          '*': {
            boxShadow: '0 0 1px inset red',
          },
        },
      })
    },
  ],
}
