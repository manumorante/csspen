module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.jsx', './pages/**/*.jsx'],
  safelist: ['debug'],
  theme: {
    extend: {
      spacing: {
        pen: '240px',
      },

      animation: {
        fadeIn: 'afadeIn 1s ease-in-out forwards',
      },

      keyframes: () => ({
        afadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('children', '&  *')
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
