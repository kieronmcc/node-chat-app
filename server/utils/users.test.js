const expect = require('expect');

const {Users} = require('./users');

// Testsuite for users class test cases
describe('Users class Testsuite', () => {

  var users;

  // execute test fixtures
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Julie',
      room: 'Node Course'
    },
    {
      id: '3',
      name: 'Sandrine',
      room: 'React Course'
    }]
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Kieron',
      room: 'United Fans'
    };
    var res = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  // should remove a user by id
  it('should remove a valid user', () => {
    var userToRemove = users.users[0];
    var removedUser = users.removeUser(userToRemove.id);
    expect(removedUser).toEqual(userToRemove);
    expect(users.users.length).toBe(2);
  });

  // should not remove user for invalid user id
  it('should not remove an invalid user', () => {
    var removedUser = users.removeUser('8');
    expect(removedUser).toNotExist();
    expect(users.users.length).toBe(3);
  });
  // should get a user by id
  it('should return a valid user', () => {
    var validUser = users.users[1];
    var res = users.getUser('2');
    expect(res).toEqual(validUser);
  });

  // should not find user for invalid id
  it('should not return an invalid user', () => {
    var res = users.getUser('8');
    expect(res).toNotExist();
  });


  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Sandrine']);
  });
});
