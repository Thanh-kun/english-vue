/** @type {import('tailwindcss').Config} */
import { themeColors, themeFontFamily } from './src/constant/theme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: themeColors.primary,
      gray: themeColors.gray,
      white: themeColors.white,
      black: themeColors.black
    },
    extend: {
      fontFamily: {
        sans: themeFontFamily.primary
      }
    }
  },
  plugins: []
}
