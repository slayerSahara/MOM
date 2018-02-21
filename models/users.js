var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({accnt_id: Number, first_name: String, last_name: String, email: String, userID: String, pswd: String});
mongoose.model('userinfos', userSchema);

// userSchema.methods.generateHash = function(pswd) {
//     return bcrypt.hashSync(pswd, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = function(pswd) {
//     return bcrypt.compareSync(pswd, this.local.pswd);
// };

function checkLogin(){
    if(login.username.value != userID){
        alert("There is not an active account with that username");
    }
    if(login.password.value != pswd){
        alert("Incorrect password.");
    }
}