/** @type {import('tailwindcss').Config} */
import { themeColors, themeFontFamily } from './src/constant/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: themeColors.primary
    },
    extend: {
      fontFamily: {
        sans: themeFontFamily.primary
      }
    }
  },
  plugins: []
}
