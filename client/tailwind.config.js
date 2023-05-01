/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#2D2424",
        "brown": "#5C3D2E",
        "caramel": "#B85C38",
        "light-caramel": "#E0C097",
        "biscuit": "#E0C097",
        "gray": "#333",
        "light-gray": "#BDBDBD",
        "dark-blur": "rgba(138, 35, 35, 0.19)"
      },  
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      fontSize: {
        "6xl": ['64px', '87px'],
      },
      boxShadow: {
        'boxshadow': "0px 100px 80px rgba(184, 184, 184, 0.07), 0px 25.8162px 19px 4px rgba(178, 178, 178, 0.0456112), 0px 7.779px 7.30492px rgba(0, 0, 0, 0.035), 0px 1.48838px 2.0843px rgba(0, 0, 0, 0.0243888)"
      }
    },
  },
  plugins: [
    plugin(
      function({ addComponents, theme }) {

        const myComponents = {
          '.btn-caramel': {
            'background-color': theme('colors.caramel'),
            'padding': '12px 32px',
            'border-radius': '40px',
            'color': 'white',
            'font-size': theme('fontSize.lg'),
          },
          '.btn-transparent': {
            'background-color': "transparent",
            'padding': '12px 32px',
            'border-radius': '40px',
            'color': 'white',
            'font-size': theme('fontSize.lg'),
            'border': '2px solid white',
          },
          '.title-white': {
            'color': "white",
            'font-weight': '700',
            'font-size': theme('fontSize.7xl'),
            'filter': '4px 2px 4px rgba(0,0,0,0.25)',
          },
          '.title-black': {
            'color': "brown",
            'font-weight': '700',
            'font-size': theme('fontSize.6xl'),
          },
          '.title-brown': {
            'color': "brown",
            'font-weight': '700',
            'font-size': theme('fontSize.5xl'),
          },
          '.title-gray': {
            'color': "gray",
            'font-weight': '700',
            'font-size': theme('fontSize.5xl'),
          },
          '.subtitle-white': {
            'color': "white",
            'font-weight': '700',
            'font-size': theme('fontSize.2xl'),
          },
          '.subtitle-black': {
            'color': "black",
            'font-weight': '700',
            'font-size': theme('fontSize.2xl'),
          },
          '.subtitle-caramel': {
            'color': theme('colors.caramel'),
            'font-weight': '700',
            'font-size': theme('fontSize.2xl'),
          },
          '.subtitle-gray': {
            'color': 'gray',
            'font-weight': '700',
            'font-size': theme('fontSize.3xl'),
          },
          '.no-filter': {
            'position': 'relative',
            'z-index': '20',
          },
        }

        addComponents(myComponents);
      }
    )
  ],
}
