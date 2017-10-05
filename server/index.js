/* Model imports */
require('./models/user');

var keys = require('../config/keys');
var express = require('express');
/* We are using a single instance of Express to handle incoming requests */
var app = express();

/* MongoDB set up */
var mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
var User = mongoose.model('users');

/* Dummy router example */
app.get('/api/test', async (req, res) => {
    var user = await User.findOne({ Id: 123 });

    res.send({ user });
});

/* Instruct Express to listen to this port */
app.listen(process.env.PORT || 5000);