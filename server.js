var express = require('express');
var app = express();
var port = process.env.port || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var configDB = require('./config/database.js');
require('./models/users');
var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'iseedeadpeople' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('/app/routes.js')(app, passport);

app.listen(port);