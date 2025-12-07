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
        aurovaGreen:"#D1FAE5",
        primary: "#FF6B9D",
        secondary: "#C8A1E0",
        pink: "#FF6B9D",
        "pink-light": "#FFB6D9",
        purple: "#674188",
        gold: "#FFD700",
        bgWarm: "#FFF8F3",
        textDark: "#2C2C2C",
        textGray: "#6B7280",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "gradient-pink-gold": "linear-gradient(135deg, #FF6B9D 0%, #FFD700 100%)",
        "gradient-pink-purple": "linear-gradient(135deg, #FF6B9D 0%, #C8A1E0 100%)",
        "gradient-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(255, 107, 157, 0.1)",
        "glow-pink": "0 0 30px rgba(255, 107, 157, 0.5)",
        "glow-gold": "0 0 30px rgba(255, 215, 0, 0.5)",
      },
      backdropBlur: {
        md: "12px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
