const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // socket.emit from Admin text "Welcome to the chat app"
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit "from Admin" text "New user joined"
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // emits to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    // Send this message to everyone except this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
