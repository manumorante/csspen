const PEN_SIZE = 220

module.exports = {
  content: ["./components/**/*.tsx", "./app/**/*.tsx"],
  safelist: ["debug"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      spacing: {
        pen: `${PEN_SIZE}px`,
        step: "500px",
        "header-sm": "60px",
        "header-md": "160px",
      },

      animation: {
        fadeIn: "afadeIn 1s ease-in-out forwards",
        appear: "afadeIn 1s ease-in 3s forwards",
        progress: "aProgress 1s linear forwards",
      },

      keyframes: () => ({
        afadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        aProgress: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      }),
    },
  },
  plugins: [],
}
