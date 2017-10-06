var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defining a schema for users
var userSchema = new Schema({
    googleId: String
});

// Tell mongoose there's a collection (model class) named users
mongoose.model('users', userSchema);