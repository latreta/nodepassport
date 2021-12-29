const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv/config');

const CLIENT_ID = process.env.GOOGLE_CONSUMER_KEY;
const CLIENT_SECRET = process.env.GOOGLE_CONSUMER_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
  )
);
