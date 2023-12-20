/** @type {import('tailwindcss').Config} */
import {fontFamily} from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Nunito Variable", ...fontFamily.sans]
      }
    },
  },
  plugins: [],
}
