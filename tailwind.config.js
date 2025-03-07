/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          customGrey: {
            light: '#EEEEEE',
            middle: '#393E46',
            strong: '#222831'
          },
          turkiz: '#00ADB5',          
      },
      borderWidth: {
        '10': '10px', // Adds a custom border size of 3px
        '15': '15px', // Adds a custom border size of 7px
        '25': '25px', // Adds a custom border size of 15px
      }
  },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth : "thin",
          scrollbarColor: "rgb(31 29 29) white",          
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar" : {
            width: "10px",
          },
          "&::-webkit-scrollbar-track" : {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb" : {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
}
