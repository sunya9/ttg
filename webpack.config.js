const path = require('path')

const config = {
  entry: './js/main',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['url']
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  postcss() {
    return [
      require('postcss-import')(),
      require('postcss-cssnext')()
    ]
  }
}

if(process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map'
}
module.exports = config
