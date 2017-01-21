module.exports = {
  head: {
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=0.25'
      }
    ],
    title: 'TwiTokenGetter'
  },
  loading: {
    color: '#2980b9',
    failedColor: '#e74c3c',
    duration: 1500
  },
  build: {
    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')()
    ]
  },
  store: true
}