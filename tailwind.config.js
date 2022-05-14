module.exports = {
  content: ['./src/**/*.{html,jsx}', './src/styles.js', './index.html'],
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
