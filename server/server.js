const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createMessage', (message) => {
    var newMessage = {
      to: message.to,
      text: message.text,
      createdAt: Date()
    };
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date().get

    });
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
