/* eslint no-console: 0 */

const express = require('express')
const session = require('express-session')

const Nuxt = require('nuxt')

const app = express()
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'



app.use(session({
  secret: isProd ? require('./config/keys').toString() : 'ttg',
  resave: false,
  saveUninitialized: false
}))

app.get('/token', require('./lib/token'))
app.get('/get', require('./lib/get'))
app.use(express.static('assets'))

function error(err, req, res) {
  if(process.env.NODE_ENV !== 'production') {
    res.status(500).send(JSON.stringify(err))
  }
}

const config = require('./nuxt.config')
config.dev = !isProd
const nuxt = new Nuxt(config)
const promise = isProd ? Promise.resolve() : nuxt.build()
promise.then(() => {
  app.use(nuxt.render)
  if(!isProd)
    app.use(error)
  app.listen(port)
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})

console.log(`Server running at http://localhost:${port}/`)
