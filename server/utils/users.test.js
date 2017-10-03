const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Bob',
      room: 'Node Course'
    }];
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Name',
      room: 'Room Name'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
    expect(resUser).toEqual(user);
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Bob']);
  });
  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    var user = users.removeUser('3');
    expect(users.users.length).toBe(2);
    expect(users.users).toExclude(user);
  });
  it('should not remove a user', () => {
    var user = users.removeUser('15');
    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('2');
    expect(user.id).toBe('2');
    expect(user).toEqual(users.users[1]);
  });
  it('should not find user', () => {
    var user = users.getUser(75);
    expect(user).toBe(undefined);
  });
});
