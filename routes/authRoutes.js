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
            dbService.getUserByID(req.user, function(result) {
                //TODO: redirect if profile set up is false
                console.log(result.IsProfileSetUp);
            });
            res.redirect('/dashboard');
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
