var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New Message', msg);

  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>'); //Render list
  //render anchor tag 'target=_blank' open link in new tab
  var a = jQuery('<a target="_blank">My current location</a>');

  // safer this way than via template string as stops malicious User
  // from injecting html
  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a); // url anchor to list
  jQuery('#messages').append(li); // add updated list to HTML DOM
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();

var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    // ack callbacks
    messageTextbox.val('') // clear textbox
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  //From browser library - geolocation support
  //See https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location');
  });
});
