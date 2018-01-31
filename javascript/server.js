var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://sjones:Rumple!1630@ds249737.mlab.com:49737/mom_hotline');

var chatSchema = mongoose.Schema({
    created: Date,
    content: String,
    username: String
});

var chat = mongoose.model('Chat', chatSchema);

// allow cross-origin resource sharing (allows resourdces to be requested from another domain)

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