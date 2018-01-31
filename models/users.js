var mongoose = require('mongoose');
var { Schema } = mongoose;

var userSchema = new Schema({
    username: String,
    password: String
});

mongoose.model('userInfo', userSchema);