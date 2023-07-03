/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...colors,
        primary: colors.fuchsia,
        'alsoit-gray-bg': '#F4F4F4',
        'alsoit-gray-bg-hover': '#F9E6FF',
        'alsoit-gray-bg-active': '#F9E6FF',
        'alsoit-white-bg-hover': '#F4F4F4',
        'alsoit-white-bg-active': '#F4F4F4',
        'alsoit-text': '#424242',
        'alsoit-text-active': '#BF01FE'
      },
      gridTemplateColumns: {
        sidebarItem: 'auto 1fr auto',
        frAuto: '1fr auto',
        autoFr: 'auto 1fr',
        autoAuto: 'auto auto'
      },
      gridTemplateRows: {
        autoFrAuto: 'auto 1fr auto',
        autoAutoAutoFr: 'auto auto auto auto 1fr'
      },
      height: {
        204: '51rem',
        13: '3.125rem'
      },
      maxHeight: {
        204: '51rem'
      },
      maxWidth: {
        34: '9rem',
        5: '16rem'
      },
      width: {
        134: '26.8rem'
      },
      minWidth: {
        134: '26.8rem'
      }
    },
    fontSize: {
      'alsoit-text-sm': '0.5rem', // 8px
      'alsoit-text-md': '0.625rem', // 10px
      'alsoit-text-lg': '0.813rem' // 13px
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
