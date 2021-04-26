import { extendTheme } from '@chakra-ui/react'

const fontFamily =
  'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'

const fonts = {
  heading: fontFamily,
  body: fontFamily,
}

const colors = {
  brand: {
    red: '#FB3523',
    yellow: '#FABA75',
    light: '#EBF2F5',
  },
}

const styles = {
  global: {
    body: {
      background: '#EBF2F5',
    },
  },
}

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
}
const theme = extendTheme({ fonts, fontWeights, colors, styles })
export default theme
