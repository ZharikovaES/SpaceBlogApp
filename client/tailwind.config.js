/** @type {import('tailwindcss').Config} */
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
        "light-gray": "#BDBDBD"
      },  
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      fontSize: {
        "6xl": ['64px', '87px'],
      }
    },
  },
  plugins: [],
}
