var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var app = express();
var mongoose = require('mongoose');

app.use(express.static('C:/Users/Sarah/Desktop/Capstone/Mom' + '/public'));

mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

var chatSchema = mongoose.Schema({
    created: Date,
    content: String,
    username: String
});

var chat = mongoose.model('Chat', chatSchema);

// allow cross-origin resource sharing (allows resourdces to be requested from another domain)
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

io.on('connection', function(socket){
    var defaultRoom = 'general';

    socket.on('new user', function(data){
        data.room = defaultRoom;
        socket.join(defaultRoom);

        io.in(defaultRoom).emit('user joined', data);
    });

    socket.on('new message', function(data){
        var newMsg = new Chat({
            username: data.username,
            content: data.message,
            room: data.room.toLowerCase(),
            created: new Date()
        });

        newMsg.save(function(err, msg){
            io.in(msg.room).emit('message created', msg);
        });
    });
});