var passport = require('passport');

module.exports = app => {
    // Kicks off the Google OAuth process and requests profile and email from the user
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // On callback, we verify with google that the code is right. Then, the access token will be given.
    app.get('/auth/google/callback', passport.authenticate('google'));
}
