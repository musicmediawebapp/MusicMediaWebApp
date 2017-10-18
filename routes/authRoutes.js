var passport = require('passport');
var dbService = require('../database/dbService');

module.exports = app => {
    // Kicks off the Google OAuth process and requests profile and email from the user
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // On callback, we verify with google that the code is right. Then, the access token will be given.
    app.get('/auth/google/callback', passport.authenticate('google'), 
        (req, res) => {
            // If a user's profile is not set up, redirect to /setup
            // Otherwise, /dashboard
            dbService.getUserByID(req.user, function(user) {
                if (user.isProfileSetUp) {
                    return res.redirect('/dashboard');                    
                }
                return res.redirect('/setup');
            });
        }
    );

    // Is the user logged in?
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    // Logs user out (kills their cookie)
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/'); // Redirect to the landing page
    });
}
