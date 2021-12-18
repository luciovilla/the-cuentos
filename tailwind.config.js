const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      colors: {
        lightblue: '#ebf2f5'
      }
    },
    minHeight: {
      0: '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      65: '65vh',
      75: '75vh',
      80: '80vh',
      85: '85vh',
      full: '100vh'
    }
  }
}
