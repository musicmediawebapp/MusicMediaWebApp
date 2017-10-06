/* Model imports */
require('./models/user');
var keys = require('./config/keys');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var cookieSession = require('cookie-session');
var passport = require('passport');

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

/* MongoDB set up */
mongoose.connect(keys.mongoURI);

/* Dummy router example */
app.get('/api/test', async (req, res) => {
    var user = await User.findOne({ googleId: 123 }); // NOTE: broken

    res.send({ user });
});

/* Instruct Express to listen to this port */
app.listen(process.env.PORT || 5000);