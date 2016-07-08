const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const extractCSS = new extractTextPlugin('css/main.css')

const config = {
  entry: {
    'js/main.js': './js/main.js',
    'css/main.css': './scss/main.scss'
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name]'
  },
  plugins: [
    extractCSS
  ],
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: extractCSS.extract(['css', 'postcss', 'sass?sourceMap'])
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['url']
    }]
  },
  postcss() {
    return [autoprefixer]
  }
}

module.exports = config
