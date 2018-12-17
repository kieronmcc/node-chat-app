[{
  id: 'jhdjhd',
  name: '',
  room: ''
}]

// Using ES6 classes
// addUser(id, name, room)
//removeUser(id)
//getUser(id)
// getUserList(room)

// ES6 classes without using 'this' values are set for class!
// class Person {
//   constructor (name, age) { // constructors are optional
//     this.name = name;
//     this.age = age;
//   }
//
//   getPersonDesc () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('Kieron', 55);
// var description = me. getPersonDesc();
// console.log(description);

class Users {
  constructor () {
    this.users = []; //this array is then a public member variable!
  }

  addUser (id, name , room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var removedUser = this.getUser(id);
    if (removedUser) {
      this.users = this.users.filter((removedUser) => removedUser.id !== id);
    }

    return removedUser;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  // getUserList (room) {
  //   var users = this.users.filter((user) => {
  //     return user.room === room;
  //   })
  // Equivalent shorthand for above
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
} // End of Users class

module.exports = {Users};
