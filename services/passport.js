var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../config/keys');
var dbService = require('../database/dbService');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

        dbService.getUserByGoogleID(profile.id, function(result) {
            // If we've found the user via googleID, then she's already OAuthed.
            if (result && result.length != 0 && result[0]) {
                console.log(result[0]);
                return done(null, result[0]);                
            }
            // If the user isn't OAuthed yet, insert the User model to our DB
            else {
                
            }
        });
        // dbService.insertUser(profile, function(result) {
        //     console.log(result);
        // });
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
// All incoming requests to the server will have access to the req.user because of this deserialization
passport.deserializeUser((ID, done) => {
    dbService.getUserByID(ID, function(result) {        
        done(null, result[0]);                    
    });
});