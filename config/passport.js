const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const TwitterStrategy  = require('passport-twitter').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const TWITTER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Local
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
    }));

  //Twitter
  passport.use(new TwitterStrategy({
      consumerKey: TWITTER_KEY,
      consumerSecret: TWITTER_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
      realm : 'http://127.0.0.1:3000'

    },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate({username: profile.id, password: token}, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  //Google 
  let GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
        });
    }
    ));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
