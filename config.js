
var ids = {
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    }
  };
  
  module.exports = ids;