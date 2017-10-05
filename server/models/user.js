var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    Id: String
});

mongoose.model('users', userSchema);