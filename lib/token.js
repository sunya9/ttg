const {
  twitter
} = require('./twitter-oauth')
const url = require('url')

module.exports = (req, res, next) => {
  const {
    consumer_key,
    consumer_secret,
    type
  } = req.query
  const invalidParams = !consumer_key || !consumer_secret || !type
  if (invalidParams) {
    throw new Error('Invalid parameters.')
  }
  const callbackUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: '/get'
  })
  const client = twitter(consumer_key, consumer_secret, type === 'callback' ? callbackUrl : null)
  new Promise((resolve, reject) => {
    client.getOAuthRequestToken((err, oauthToken, oauthTokenSecret) => {
      if (err) reject(err)
      const res = {
        oauthToken,
        oauthTokenSecret,
        url: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
      }
      resolve(res)
    })
  }).then(pres => {
    const {
      oauthToken,
      oauthTokenSecret,
      url
    } = pres
    Object.assign(req.session, {
      consumerKey: consumer_key,
      consumerSecret: consumer_secret,
      oauthToken,
      oauthTokenSecret
    })
    res.json({
      url
    })

  }).catch(next)
}