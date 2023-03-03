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

        'dominant': '#DBFF4A',

        'filter-button': {
          'active': '#DBFF4A',
          'passive': '#373737'
        },

        'close-button': {
            'bg': '#171717',
            'bg-hover': '#252525',
        },

        'gray': {
          '200': '#dadada',
          '300': '#a8a8a8',
          '400': '#757575',
        },

        "overlay": "#00000090"
      },

      fontFamily: {
        'major': 'Exo, Helvetica, sans-serif'
      }
    },
  },
  variants: {
    extend: {
      // transform: ['group-active'],
      // scale: ['group-active']
    },
  },
  plugins: [],
}
