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
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: 'userID',
    secret: 'something',
    resave: false,
    saveUnintialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.userID && !req.session.user) {
        res.clearCookie('userID');
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.userID) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

require('./models/users');
var Users = mongoose.model('userinfos');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline',
    { server: {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        }
    }
);

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

app.get('/index', sessionChecker, function(req, res){
    res.render('index')
});
app.get('/', sessionChecker, function(req, res){
    res.render('index')
});
app.get('/logged_in', sessionChecker, function(req, res){
    res.render('logged_in')
});
app.get('/chat', sessionChecker, function(req, res){
    res.render('chat')
});
app.get('/about', sessionChecker, function(req, res){
    res.render('about')
});
app.get('/contact', sessionChecker, function(req, res){
    res.render('contact')
});
app.get('/find_help', sessionChecker, function(req, res){
    res.render('find_help')
});
app.get('/create', sessionChecker, function(req, res){
    res.render('create')
});

app.get('/login', sessionChecker, function(req, res){
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

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.userID) {
        res.clearCookie('userID');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/reg', sessionChecker, function(req, res){
    res.render('reg')
});
app.post('/reg', function(req, res) {
    new Users({
        accnt_id: 0,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        userID: req.body.username,
        pswd: req.body.password
    }).save();

    app.then(user => {
        req.session.user = user.dataValues;
        res.redirect('/login');
    });
});

app.get('/prof_1', sessionChecker, function(req, res){
    res.render('prof_1')
});
app.post('/prof_1', function(req, res) {
    new Users({
        accnt_id: 1,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        userID: req.body.username,
        pswd: req.body.password
    }).save();

    app.then(user => {
        req.session.user = user.dataValues;
        res.redirect('/prof_2');
    });
});

app.get('/prof_2', sessionChecker, function(req, res){
    res.render('prof_2')
});