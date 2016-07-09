const Koa = require('koa')
const serve = require('koa-static')
const session = require('koa-session')

const app = new Koa()
app.keys = require('./config/keys')
app.use(session(app))
require('./lib/routes')(app)

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackMiddleware = require('koa-webpack-dev-middleware')
  const config = require('./webpack.config')
  const compiled = webpack(config)
  app.use(webpackMiddleware(compiled, {
    lazy: true,
    quiet: false,
    publicPath: '/',
    stats: {
      colors: true
    }
  }))
}

app.use(serve('public/'))

app.listen(process.env.port || 3000)
