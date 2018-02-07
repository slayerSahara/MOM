var mongoose = require('mongoose');
var express = require('express');
var app = express();
var http = require('http'); 
var io = require('socket.io')(http);
var path = require('path');
var PORT = process.env.PORT || 3000;

require('./models/users');

var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

// new Users({
//     username: 'bob',
//     password: '125720taco'
// }).save();

app.get('/chat', function(req, res){
    res.render('chat')
});
app.get('/about', function(req, res){
    res.render('about')
});
app.get('/contact', function(req, res){
    res.render('contact')
});
app.get('/index' || '/', function(req, res){
    res.render('index')
});
app.get('/find_help', function(req, res){
    res.render('find_help')
});
app.get('/create', function(req, res){
    res.sender('create')
});
app.get('/login', function(req, res){
    res.sender('login')
});
app.get('/prof_1', function(req, res){
    res.sender('prof_1')
});
app.get('/prof_2', function(req, res){
    res.sender('prof_2')
});

app.listen(PORT);