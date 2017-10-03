const _ = require('lodash');

[{
  id: '',
  name: '',
  room: ''
}];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  getUser(id) {
    var user = this.users.filter((user) => user.id === id);
    return user[0];
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      _.pull(this.users, user);
    }
    return user;
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    return users.map((user) => user.name);
  }
}

module.exports = {Users};
