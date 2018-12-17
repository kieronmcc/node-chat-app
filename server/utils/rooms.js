class Rooms {
  constructor() {
    this.rooms = []; // this class will manage this array
    this.rooms.push({name: 'Choose a room'});
  }

  checkRoom (name) {
    name = name.toLowerCase();
    var existRoom = this.rooms.filter((room) => room.name === name)[0];
    console.log('Found Room: ', existRoom)
    if (existRoom) {
      return existRoom;
    }

    var room = {name};
    this.rooms.push(room);
    return room;
  }

  removeRoom (name) {
    var removedRoom = this.rooms.filter((room) => room.name === name)[0];
    if (removedRoom) {
      this.rooms = this.rooms.filter((removedRoom) => removedRoom.name !== name);
    }

    return removedRoom;
  }

  getRoomsList () {
    return this.rooms.map((room) => room.name);
  }
}

module.exports = {Rooms};
