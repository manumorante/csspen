module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.jsx', './pages/**/*.jsx'],
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
  ],
}
