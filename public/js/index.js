var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'km@example.com',
    text: 'Hello new email sent'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New Message', msg);
});
