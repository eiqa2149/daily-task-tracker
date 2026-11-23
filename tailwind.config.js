/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#2E3F1F",
        blush: "#F9D6E3",
        bright: "#E8A0BF",
        rose: "#C56C91",
        offwhite: "#FFF4F8",
        brown: "#35251D",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      keyframes: {
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
        pop: {
          from: { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        fade: "fade 0.2s ease-out",
        pop: "pop 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
