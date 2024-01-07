import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const themeColors = {
  primary: colors.blue,
  gray: colors.gray,
  red: colors.red,
  yellow: colors.yellow,
  green: colors.green,
  purple: colors.purple,
  pink: colors.pink,
  white: colors.white,
  black: colors.black,
  transparent: colors.transparent
}
export const themeFontFamily = {
  primary: ['Nunito Variable', ...fontFamily.sans]
}

export const themeConfig = {
  token: {
    padding: 20,
    paddingXXS: 8,
    borderRadius: 6,
    colorPrimary: colors.blue[500],
    fontSize: 16,
    controlHeight: 40,
    fontFamily: themeFontFamily.primary.join(', ')
  }
}
