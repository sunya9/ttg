/* eslint no-console: 0 */

const express = require('express')
const session = require('express-session')

const {
  Nuxt,
  Builder
} = require('nuxt')
const crypto = require('crypto')
const app = express()
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

app.use(session({
  secret: crypto.randomBytes(16).toString('hex'),
  resave: false,
  saveUninitialized: false
}))

app.get('/token', require('./lib/token'))
app.get('/get', require('./lib/get'))
app.use(express.static('assets'))


const config = require('./nuxt.config')
config.dev = !isProd
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const promise = isProd ? Promise.resolve() : builder.build()
promise.then(() => {
    app.use(nuxt.render)
    app.use((err, req, res, next) => {
      if (!err) next()
      if (err instanceof Error) {
        // server error
        res.status(500).json({
          statusCode: 500,
          message: err.message
        })

      } else {
        // twitter's error
        const {
          statusCode = 500,
            data
        } = err
        const {
          errors: [error]
        } = JSON.parse(data)
        res.status(statusCode).json({
          statusCode,
          message: error.message
        })
        console.error(err)

      }
    })
    app.listen(port)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

console.log(`Server running at http://localhost:${port}/`)