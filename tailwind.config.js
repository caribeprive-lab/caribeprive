/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        unblur: {
          "0%": { filter: "blur(12px) grayscale(100%)", opacity: "0" },
          "100%": { filter: "blur(0px) grayscale(100%)", opacity: "0.45" },
        },
        "unblur-person": {
          "0%": { filter: "blur(14px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        unblur: "unblur 2s ease-out forwards",
        "unblur-person": "unblur-person 3s ease-out forwards",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      colors: {
        ink: "#0c1626",
        paper: "#f6f4ee",
        bone: "#e9e6dc",
        line: "#d8d3c6",
        muted: "#7c8597",
        blue: { DEFAULT: "#344351", deep: "#232e39", soft: "#5d6b78" },
        yellow: { DEFAULT: "#3FB0A0", bright: "#7FD0C4" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Coolvetica Condensed'", "'Barlow Condensed'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
