const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ["var(--font-sans)"] 
      },
      colors: {
        blush: {
          light: '#fcefee',
          DEFAULT: '#f8c5c1',
          dark: '#e78d89',
        },
        earthy: {
          light: '#f5f0ea',
          DEFAULT: '#d4bfa5',
          dark: '#9c856b',
        },
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-bg': theme('colors.white'),
          '--color-text': theme('colors.black'),
        },
        '.theme-blush': {
          '--color-bg': theme('colors.blush.light'),
          '--color-text': theme('colors.blush.dark'),
        },
        '.theme-earthy': {
          '--color-bg': theme('colors.earthy.light'),
          '--color-text': theme('colors.earthy.dark'),
        },
      });
    }),
  ],
}
