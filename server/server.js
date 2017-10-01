const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.emit('newMessage', {
    from: 'chatUser',
    text: 'this is a test chat',
    createdAt: 54321
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
