import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'
import express from 'express'
import session from 'express-session'

let nuxt, server, app;
const root = resolve(__dirname, '..')

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async () => {
  app = express()
  
  app.use(session({
    secret: 'ttg',
    resave: false,
    saveUninitialized: false
  }))

  app.get('/token', require(resolve(root, './lib/token')))
  app.get('/get', require(resolve(root, './lib/get')))

  const config = require(resolve(root, './nuxt.config'))
  config.dev = false
   nuxt = new Nuxt(config)
  await nuxt.build()
  app.use(nuxt.render)
  server = app.listen(4000)
})

test('Redirect to home when ck/cs are empty in /pin', async t => {
  const { redirected } = await nuxt.renderRoute('/pin')
  t.is(redirected.path, '/')
})

test('Redirect to home when ck/cs and at/ats are empty in /authorized', async t => {
  const res = await nuxt.renderRoute('/authorized', {
    req: {}
  })
  t.is(res.redirected.path, '/')
})

test('Not redirect when ck/cs and at/ats are exists in /authorized', async t => {
  const req = {
    session: {
      consumerKey: 'foo',
      consumerSecret: 'bar',
      accessToken: 'baz',
      accessTokenSecret: 'qux'
    }
  }
  const res = await nuxt.renderRoute('/authorized', { req })
  t.false(res.redirected)
})


// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', () => {
  server.close()
  nuxt.close()
})