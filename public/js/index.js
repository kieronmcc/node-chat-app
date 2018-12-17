var socket = io();

// socket.on('updateRoomList', function (rooms) {
//   console.log('updateRoomsList Called');
//   var sel = jQuery('<select></select>');
//   rooms.forEach(function (room) {
//     sel.append(jQuery('<option></option>').val(room));
//     sel.append(jQuery('<option></option>').text(room));
//   });

socket.on('connect', function (rooms) {
  socket.emit('getRoomsList', function (rooms) {
    var sel = jQuery('#roomsList');
    rooms.forEach(function (room) {
      //sel.append(jQuery('<option></option>').val(room));
      sel.append(jQuery('<option></option>').text(room).attr('value', room));
    });
  });
});

jQuery('#roomsList').on('change', function (existroom) {
  var selRoom = jQuery('#roomsList');
  console.log('Room selected: ', selRoom.val())
  jQuery('[name=room]').text(selRoom.val()).attr('value', selRoom.val());
});
