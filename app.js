const express = require('express');
const socket = require('socket.io');
const path = require('path');

// init express;
const app = express();

// serve static files;
app.use(express.static(path.join(__dirname, 'public')));

// create server;
const server = app.listen(3000, (socket)=> {
    console.log('now listening to server and socket is ready to connect....');
});

const io = socket(server);

// check for successful connection;
io.on('connection', (socket)=> {
    console.log('connection to socket on the client was successful...',socket.id);
    // chat events
    socket.on('chat', (data)=>{
        io.sockets.emit('chat',data);
    });

    // typing event
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});