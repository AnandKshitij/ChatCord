const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// run when the client connects
io.on('connection', socket =>{
    // welcome current user
    socket.emit('message', 'Welcome to ChatCord');

    // broadcasting that a user has connected
    // this will tell everyone that the user has connected except the user itself
    socket.broadcast.emit('message', 'A user has entered the chat');

    // runs when client disconnects
    socket.on('disconnect', () => {
        // if we want to broadcast the message to everyone
        io.emit('message', 'A user has left the chat');
    });

    // listen for chat message
    socket.on('chatMessage', msg =>{
        io.emit('message', msg);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port number ${PORT}`);
});