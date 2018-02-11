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
        process.nextTick(function() {

        Users.findOne({'local.email' : email}, function(err, user) {
            if(err) {
                return done(err);
            }
            if(user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken'));
            } else {
                var newUser = new Users();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if(err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
        });
    }));
};