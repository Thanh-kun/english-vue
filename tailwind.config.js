/** @type {import('tailwindcss').Config} */
import { themeColors, themeFontFamily } from './src/constant/theme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: themeColors.primary,
      gray: themeColors.gray,
      red: themeColors.red,
      yellow: themeColors.yellow,
      green: themeColors.green,
      purple: themeColors.purple,
      pink: themeColors.pink,
      white: themeColors.white,
      black: themeColors.black,
      transparent: themeColors.transparent
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      fontFamily: {
        sans: themeFontFamily.primary
      },
      grayscale: {
        30: '30%',
        50: '50%'
      },
      borderRadius: {
        large: '10rem'
      }
    }
  },
  plugins: []
}
