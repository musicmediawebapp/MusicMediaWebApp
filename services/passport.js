var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../config/keys');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var db = require('../config/db-connection');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        // Once the user has OAuth'ed with Google, we retrieve the access token and save them as a User model in our DB
        var existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            return done(null, existingUser); // Tells passport we're done w/ this user model
        }
        var user = new User({ googleId: profile.id }).save();
        done(null, user);                    
    })
);

// User --> ID to be set in cookie

// Passport has a hold of "user" because in the above method, when we
// called "done(...)" to tell Passport we were done OAuthing them, we saved
// the User model
passport.serializeUser((user, done) => {
    done(null, user.id); // This ID is from mLab
});

// ID --> User
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});