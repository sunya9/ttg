const { OAuth } = require('oauth')

exports.twitter = (consumerKey, consumerSecret, callbackPath) => {
  return new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      consumerKey,
      consumerSecret,
      '1.0A',
      callbackPath,
      'HMAC-SHA1'
    )
}
