const _ = require('koa-route')
const token = require('./token')
const get = require('./get')

module.exports = app => {
  app.use(_.get('/token', token))
  app.use(_.get('/get', get))
}
