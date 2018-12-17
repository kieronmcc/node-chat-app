const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);

// Grab handle to express webappframework
var app = express();
// var server = http.createServer((req, res) => {
//
// });
// Equivalent to code above because express
// is built on node http
var server = http.createServer(app);
//make our server a web socket event handler
var io = socketIO(server);
var users = new Users();


// Setup static page middleware to serve public folder
app.use(express.static(publicPath));

// Register an event listener on socket io object
// each socket is a new client connection endpoint
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room Name are required.');
    }

    //socket.leave() - this inverse

    // io.emit -> io.to(''room name).emit - everyone on that channel
    // socket.broadcast.emit -> socket.broadcast.to('room').emit - everyone but user on that channel
    // socket.emit - to that user only

    socket.join(params.room);
    users.removeUser(socket.id); // So duplicate user not allowed
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // Sends message to wb socket that just connected
    socket.emit( 'newMessage', generateMessage( 'Admin', 'Welcome to the chat app'));

    // Sends message all sockets except one that just connected
    socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'Admin', `${params.name} has joined.`));

    callback();
  });



  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }


    callback();

  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      // update userlist
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      // Enit message saying user has left
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

// so we use the http server instead of app to listen
// So all we used express for here was to setup some
// callbacks and listeners for the http object (server)
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
