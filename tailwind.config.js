/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           // Vite entry
    "./src/**/*.{js,ts,jsx,tsx}" // all source files
  ],
  theme: {
    extend: {
      colors: {
        aurovaBlue: "#4F46E5",
        aurovaPurple: "#7C3AED",
        aurovaYellow: "#FACC15",
        aurovaGray: "#F3F4F6",
        aurovaGreen:"#D1FAE5"
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
