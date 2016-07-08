import promise from 'es6-promise'
promise.polyfill()
import 'isomorphic-fetch'
import qs from 'querystring'

function generateURL(consumer_key, consumer_secret, type) {
  const params = {
    consumer_key,
    consumer_secret,
    type
  }
  return fetch(`/token?${qs.stringify(params)}`, {
    credentials: 'include'
  })
    .then(setCookie)
    .then(errorCheck)
    .then(res => res.json())
    .then(res => res.url)
}

function errorCheck(res) {
  if(!res.ok) throw Error(res.statusText)
  return res
}

function setCookie(res) {
  res.headers.getAll('Set-Cookie').forEach(cookie => document.cookie = cookie)
  return res
}

exports.generateURL = generateURL
