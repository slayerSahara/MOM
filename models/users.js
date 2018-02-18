var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({userID: String, pswd: String});
mongoose.model('userinfos', userSchema);

// var test = Users.findOne({ 'userID' : 'Bob'});
// console.log(test.select('userID'));

userSchema.methods.generateHash = function(pswd) {
    return bcrypt.hashSync(pswd, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(pswd) {
    return bcrypt.compareSync(pswd, this.local.pswd);
};