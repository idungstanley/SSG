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
        'alsoit-gray-50': '#F4F4F4',
        'alsoit-gray-75': '#B2B2B2',
        'alsoit-gray-200': '#626262',
        'alsoit-gray-300': '#424242',
        'alsoit-purple-50': '#F9E6FF',
        'alsoit-purple-300': '#BF01FE',
        'alsoit-success': '#19D03A',
        'alsoit-success-50': '#E6FAE9',
        'alsoit-warning': '#ffde66',
        'alsoit-danger': '#FF0000',
        'alsoit-danger-50': '#FFDEDE'
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
      ...defaultTheme.fontSize, // add default tailwind classes
      'alsoit-text-sm': '0.5rem', // 8px
      'alsoit-text-md': '0.625rem', // 10px
      'alsoit-text-lg': '0.813rem' // 13px
    },
    borderWidth: {
      ...defaultTheme.borderWidth, // add default tailwind classes
      'alsoit-border-sm': '0.5px',
      'alsoit-border-base': '1px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
