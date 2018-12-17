const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

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


// Setup static page middleware to serve public folder
app.use(express.static(publicPath));

// Register an event listener on socket io object
// each sock is a new client connection endpoint
io.on('connection', (socket) => {
  console.log('New client connected');

  // Sends message to wb socket that just connected
  socket.emit( 'newMessage', generateMessage( 'Admin', 'Welcome to the chat app'));

  // Sends message all sockets except one that just connected
  socket.broadcast.emit('newMessage', generateMessage( 'Admin', 'New user joined'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and Room Name are required.');
    }

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var newMessage = {
      to: message.to,
      text: message.text,
      createdAt: Date()
    };
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    console.log('Message received', message);
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

// so we use the http server instead of app to listen
// So all we used express for here was to setup some
// callbacks and listeners for the http object (server)
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
