var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../config/keys');
var db = require('../database/queries');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        // Once the user has OAuth'ed with Google, we retrieve the access token

        db.getUserByGoogleID(profile.id, function(result) {
            // If we've found the user via googleID, then she's already OAuthed.
            if (result[0]) {
                return done(null, result[0]);                
            }
            // If the user isn't OAuthed yet, save the User model to our DB
            
        });
    })
);

// User --> ID to be set in cookie

// Passport has a hold of "user" because in the above method, when we
// called "done(...)" to tell Passport we were done OAuthing them, we saved
// the User model
passport.serializeUser((user, done) => {
    done(null, user.ID); // This ID is from our DB
});

// ID --> User
passport.deserializeUser((ID, done) => {
    db.getUserByID(ID, function(result) {        
        done(null, result[0]);                    
    });  
});