var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({userID: String, pswd: String});
var Users = mongoose.model('userinfos', userSchema);

new Users({
    userID: 'Bob',
    pswd: 'taco1234'
}).save();

// var test = Users.findOne({ 'userID' : 'Bob'});
// console.log(test.select('userID'));

userSchema.methods.generateHash = function(pswd) {
    return bcrypt.hashSync(pswd, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(pswd) {
    return bcrypt.compareSync(pswd, this.local.pswd);
};