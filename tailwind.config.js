/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.indigo,
        'blue-gray': colors.blueGray,
        sky: colors.sky,
      },
      gridTemplateColumns: {
        mainLayout: '300px 1fr',
        sidebarItem: 'auto 1fr auto',
      },
      gridTemplateRows: {
        mainContent: 'auto 1fr',
        autoFrAuto: 'auto 1fr auto',
      },
      height: {
        204: '51rem',
      },
      maxHeight: {
        204: '51rem',
      },
      maxWidth: {
        34: '9rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
