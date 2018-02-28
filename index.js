var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

require('./models/users');
var Users = mongoose.model('userinfos');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/node_modules')));
app.use(express.static(path.join(__dirname + '/config')));

app.set('views', path.join(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

app.get('/index', function(req, res){
    res.render('index')
});
app.get('/', function(req, res){
    res.render('index')
});
app.get('/logged_in', function(req, res){
    res.render('logged_in')
});
app.get('/chat', function(req, res){
    res.render('chat')
});
app.get('/about', function(req, res){
    res.render('about')
});
app.get('/contact', function(req, res){
    res.render('contact')
});
app.get('/find_help', function(req, res){
    res.render('find_help')
});
app.get('/create', function(req, res){
    res.render('create')
});

app.get('/login', function(req, res){
    res.render('login')
});
app.post('/login', urlencodedParser, function(req, res){

    Users.findOne({userID : req.body.user, pswd : req.body.pass})
    .then((loggedInUser) => {
        if(loggedInUser) {
            res.render('logged_in');
        }
        else {
            res.render('login');
        }
    });
});

app.get('/reg', function(req, res){
    res.render('reg')
});
app.post('/reg', urlencodedParser, function(req, res) {
    new Users({
        accnt_id: 0,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        userID: req.body.username,
        pswd: req.body.password
    }).save();

    res.render('login');
});

app.get('/prof_1', function(req, res){
    res.render('prof_1')
});
app.post('/prof_1', urlencodedParser, function(req, res){
    new Users({
        accnt_id: 1,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        userID: req.body.username,
        pswd: req.body.password
    }).save();

    res.render('prof_2');
});
app.get('/prof_2', function(req, res){
    res.render('prof_2')
});

// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));

//     var expires = 'expires = ' + d.toUTCString();
//     document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
// }

// function getCookie(cname) {
//     var name = cname + '=';
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');

//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while(c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if(c.indexOf(name) == 0){
//             return c.substring(name.length, c.length);
//         }
//     }
//     return '';
// }

// function checkCookie() {
//     var userID = getCookie('userID');

//     if(userID != ''){
//         alert('Welcome again ' + userID);
//     } else{
//         userID = prompt('Please log in');
//         render('login');
//     }
// }