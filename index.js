var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
require('./models/users');

var app = express();

var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

app.use(express.static('C:/Users/Sarah/Desktop/Capstone/Capstone-Mom/MOM' + '/../public'));
app.set('views', path.join(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// new Users({
//     username: 'bob',
//     password: '125720taco'
// }).save();

app.get('/', function(req, res){
    res.render('chat')
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);