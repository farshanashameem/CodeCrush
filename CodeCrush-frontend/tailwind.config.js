/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": {
            textShadow: "0 0 5px #ffd54f, 0 0 10px #ff9800",
          },
          "50%": {
            textShadow: "0 0 15px #ffd54f, 0 0 25px #ff9800",
          },
        },
      },
      animation: {
        bounceSlow: "bounceSlow 1s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      fontFamily: {
        mochiy: ['"Mochiy Pop P One"', 'sans-serif'],
        //  'font-baloo' for headings and logo
        baloo: ['"Baloo 2"', 'cursive'],
        //  'font-sans' (default) for everything else
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};