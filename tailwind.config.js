module.exports = {
  purge: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-background-color': '#1A1A1A',

        'primary-button': {
          'border': '#141414',
          'bg': '#313131',
        },

        'secondary-button': {
          'bg': '#404040',
          'bg-hover': '#4f4f4f'
        },

        'gray': {
          '200': '#dadada',
          '300': '#a8a8a8',
          '400': '#757575',
        }
      },

      fontFamily: {
        'major': 'Exo, Helvetica, sans-serif'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
