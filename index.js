var mongoose = require('mongoose');
var express = require('express');
require('./models/users');

var app = express();

var Users = mongoose.model('userInfo');
mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

app.use(express.static('C:/Users/Sarah/Desktop/Capstone/Mom' + '/public'));

new Users({
    username: 'bob',
    password: '125720taco'
}).save();

app.get('/', function(req, res){
    res.sendFile('C:/Users/Sarah/Desktop/Capstone/Mom/views/chat.html')
});

app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

    if(req.method == 'OPTIONS'){
        res.status(200).end();
    }
    else {
        next();
    }
});

app.get('/', function(req, res){
    res.sendFile('chat.html')
});

app.post('/setup', function(req, res){
    var chatData = [{
        created: new Date(),
        content: 'Hi',
        username: 'Sahara'
    }, {
        created: new Date(),
        content: 'You suck',
        username: 'Bob'
    }];

    for(var c = 0; c < chatData.length; c++){
        var newChat = new Chat(chatData[c]);
        
        newChat.save(function(err, savedChat){
            console.log(savedChat);
        });
    }

    res.send('created');
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);