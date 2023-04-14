module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
      },

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
        'dominant-secondary': '#D0FF94',

        'filter-button': {
          'active': '#DBFF4A',
          'passive': '#373737'
        },

        'close-button': {
            'bg': '#3b3b3b',
            'bg-hover': '#333333',
        },

        'gray': {
          '200': '#dadada',
          '300': '#a8a8a8',
          '400': '#757575',
          '500': '#5e5e5e',
          '600': '#525252',
          '700': '#3a3a3a',
          '800': '#262626',
          '900': '#181818',
        },

        'tag': '#0E2061',

        'section': {
          'start': '#1F1F1F',
          'end': '#101010',
        },

        "overlay": "#00000090"
      },

      fontFamily: {
        'major': 'Exo, Helvetica, sans-serif',
        'regular': 'Poppins, Helvetica, sans-serif',
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
