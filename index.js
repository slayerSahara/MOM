var mongoose = require('mongoose');
var express = require('express');
require('./models/users');

var app = express();

var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

new Users({
    username: 'bob',
    password: '125720taco'
}).save();

var PORT = process.env.PORT || 3000;

app.listen(PORT);