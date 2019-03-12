const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');

const User = require('../db/models/User');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SEECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return done(null, req.user);
  } else {
    User.findOne({profileId: profile.id}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      User.findOne({email: profile.emails[0].value}, (err, email) => {
        if (err) {
          return done(err);
        }
        if (email) {
          done(err);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.profileId = profile.id;
          user.tokens = accessToken;
          user.username = profile.displayName;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

module.exports = passport;
