js = require('@eslint/js')

module.exports = [
  js.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn'
    },
    env: {
      browser: true,
      node: true
    }
  }
]
