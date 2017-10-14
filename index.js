/* Model imports */
require('./models/user');
var keys = require('./config/keys');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var cookieSession = require('cookie-session');
var passport = require('passport');
var db = require('./config/db-connection');

/* Service imports */
require('./services/passport');

/* Route imports */
var authRoutes = require('./routes/authRoutes');

/* SET UP */
/* We are using a single instance of Express to handle incoming requests */
var express = require('express');
var app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

/* SQL connection */
var connection = db.handleDisconnect();

/* MongoDB set up */
mongoose.connect(keys.mongoURI, { useMongoClient: true });

if (process.env.NODE_ENV === 'production') {
    // Express will serve up the main.js or main.css files when they're QUERIED from the front-end
    app.use(express.static('client/build'));

    // If there was no specific request for a file...

    // Express will serve up the index.html if it doesn't recognize the front-end route
    // (Kick user to the index.html which loads up React)
    var path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    });
}

/* Instruct Express to listen to this port */
app.listen(process.env.PORT || 5000);