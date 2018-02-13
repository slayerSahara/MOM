var localStrategy = require('passport-local').Strategy;
var Users = require('/models/users');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    
    function(req, username, password, done) {
        Users.findOne({'local.email' : email}, function(err, user) {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            } 
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong password!'));
            }
            return done(null, user);
        });
    }));
};