var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../config/keys');
var dbService = require('../database/dbService');
var User = require('../models/user');

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
                // Trace it when the user logs in
                dbService.insertActivityLog(result[0].ID, result[0].FirstName, result[0].LastName, "Existing user finished OAuth and logged in");                

                return done(null, result[0].ID);                
            }
            // If the user isn't OAuthed yet, insert the User model to our DB
            else {
                dbService.insertUser(profile, function(id) {
                    dbService.insertActivityLog(id, null, null, "New user OAuth'ed and logged in");                                    
                    done(null, id);
                });
            } 
        });
    })
);

// User --> ID to be set in cookie

// Passport has a hold of "user" because in the above method, when we
// called "done(...)" to tell Passport we were done OAuthing them, we saved
// the User model
passport.serializeUser((ID, done) => {
    done(null, ID); // This ID is from our DB
});

// ID --> User
// All incoming requests to the server will have access to the req.user because of this deserialization
passport.deserializeUser((ID, done) => {
    dbService.getUserByID(ID, function(result) {
        // Convert "dbUser" (RowDataPacket in JSON form) to User
        var user = new User(result);
        done(null, user);                    
    });
});