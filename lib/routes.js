const _ = require('koa-route')
const token = require('./token')
const index = require('./index')

module.exports = app => {
  app.use(_.get('/token', token))
  app.use(_.get('/', index))
}
