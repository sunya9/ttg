/* eslint no-console: 0 */

const express = require('express')
const session = require('express-session')

const Nuxt = require('nuxt')

const app = express()
const port = process.env.PORT || 3000

app.use(session({
  secret: require('./config/keys').toString(),
  resave: false,
  saveUninitialized: false
}))

app.get('/token', require('./lib/token'))
app.get('/get', require('./lib/get'))

function error(err, req, res) {
  if(process.env.NODE_ENV !== 'production') {
    res.status(500).send(JSON.stringify(err))
  }
}

const nuxt = new Nuxt(require('./nuxt.config'))
nuxt.build()
  .then(() => {
    app.use(nuxt.render)
    app.use(error)
    app.listen(port)
  })

console.log(`Server running at http://localhost:${port}/`)
