var mongoose = require('mongoose');
var app = require('express');
require('./models/users');

var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

new Users({
    username: 'bob',
    password: '125720taco'
}).save();