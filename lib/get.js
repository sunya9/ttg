const { twitter } = require('./twitter-oauth')

module.exports = (req, res) => {
  const { oauth_verifier } = req.query
  if(!oauth_verifier) {
    // return session cache
    const { accessToken, accessTokenSecret } = req.session
    return res.send({
      consumerKey,
      consumerSecret,
      accessToken,
      accessTokenSecret
    })
  }
  const {consumerKey, consumerSecret, oauthToken, oauthTokenSecret } = req.session
  const timeout = !consumerKey || !consumerSecret || !oauthToken || !oauthTokenSecret
  if(timeout) {
    throw new Error('Session timeout.')
  }
  const client = twitter(consumerKey, consumerSecret)
  new Promise((resolve, reject) => {
    client.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauth_verifier, (err, accessToken, accessTokenSecret) => {
      if(err) reject(err)
      resolve({
        accessToken,
        accessTokenSecret
      })
    })
  }).then(pres => {
    const xhr = req.get('X-Requested-With') === 'fetch'
    if(xhr) {
      res.send(pres)
    } else {
      // store to session
      Object.assign(req.session, pres, { consumerKey, consumerSecret, type: 'callback' })
      res.redirect('/authorized')
      // res.send(parameters)
    }
  }).catch(e => { throw e })
}
