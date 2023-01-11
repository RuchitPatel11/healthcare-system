/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        "charm-style": ['"Charm"', "cursive"],
      },
      colors: {
        primary: "#6acbe8",
        secondary: "#1c2053",
        mute: "#919191",
        purple: "#797cc7",
      },
    },
  },
  plugins: [],
};
