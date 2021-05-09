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
    console.log('New Web Socket Connection');

    socket.emit('message', 'Welcome to ChatCord');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port number ${PORT}`);
});