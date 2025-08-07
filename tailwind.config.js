/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "cine-gpt-lg-banner": "url('/assets/cinegpt_banner.jpg')",
      // },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
      },
      keyframes: {
        "fade-in-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
