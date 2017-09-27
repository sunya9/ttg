import promise from 'es6-promise'
promise.polyfill()
import 'isomorphic-fetch'
import qs from 'querystring'

export function generateURL(consumer_key, consumer_secret, type) {
  const params = {
    consumer_key,
    consumer_secret,
    type
  }
  return fetch(`/token?${qs.stringify(params)}`, {
      credentials: 'include'
    })
    .then(errorCheck)
    .then(setCookie)
    .then(res => res.json())
    .then(res => res.url)
}

async function errorCheck(res) {
  if (!res.ok) {
    let message
    try {
      const json = await res.json()
      message = `${json.statusCode}: ${json.message}`
    } catch (e) {
      message = await res.text()
    }
    throw new Error(message)
  }
  return res
}

function setCookie(res) {
  document.cookie = res.headers.get('Set-Cookie')
  return res
}