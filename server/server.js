const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      socket.leave(user.room);
    }
  });

  socket.on('join', (params, callback) => {
    var roomName = params.room;
    var name = params.name;
    if (!isRealString(name) || !isRealString(roomName)) {
      return callback('Name and room name are required');
    }

    socket.join(roomName);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, roomName);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(roomName).emit('newMessage', generateMessage('Admin', `${name} has joined`));
    io.to(roomName).emit('updateUserList', users.getUserList(roomName));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords, callback) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
    }
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
