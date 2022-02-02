
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode:"media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Montserrat:['Montserrat',"sans-serif"]
        },
      colors : {
        primary : {...colors.indigo}
      }
    },
  },
  plugins: [],
}
