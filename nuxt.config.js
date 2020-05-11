const fs = require('fs')

const loadingCSS = fs.readFileSync('assets/css/loading.css', 'utf-8')
module.exports = {
  head: {
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=0.25'
    }],
    style: [{
      cssText: loadingCSS,
      type: 'text/css'
    }],
    link: [{
      rel: 'favicon',
      src: '/favicon.ico'
    }],
    title: 'TwiTokenGetter'
  },
  css: [
    '~/assets/css/main.css'
  ],
  loading: {
    color: '#2980b9',
    failedColor: '#e74c3c',
    duration: 1500
  },
  build: {
    extend (config, { isDev }) {
      if(isDev) return
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
    }
  },
}