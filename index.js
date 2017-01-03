/* eslint no-console: 0 */

const Koa = require('koa')
const serve = require('koa-static')
const session = require('koa-session')
const render = require('koa-ejs')
const path = require('path')

const app = new Koa()
app.keys = require('./config/keys')
app.use(session(app))
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  cache: false,
  debug: process.env.NODE_ENV !== 'production'
})
require('./lib/routes')(app)

const port = process.env.PORT || 3000

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackMiddleware = require('koa-webpack-dev-middleware')
  const config = require('./webpack.config')
  const compiled = webpack(config)
  app.use(webpackMiddleware(compiled, {
    lazy: true,
    quiet: false,
    noInfo: true,
    publicPath: '/',
    stats: {
      colors: true
    }
  }))
} else {
  app.use(serve(path.join(__dirname, 'public')))
}

app.listen(process.env.PORT || 3000)
console.log(`Server running at http://localhost:${port}/`)
