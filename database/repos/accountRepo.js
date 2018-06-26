var db = require('../db.js');
<<<<<<< HEAD
var config = require('../../config/config.js');

exports.clientInfo = email => {

    var sql = `SELECT * from client where email = '${email}'`;

    return db.load(sql);
}
=======

exports.add = user => {
      var sql = `insert into client(email, name, address, password) values('${user.email}', '${user.name}', '${user.address}', '${user.password}')`;
      return db.save(sql);
}

exports.login = user => {
      var sql = `select * from client where email = '${user.email}' and password = '${user.password}'`;
      return db.load(sql);
}
>>>>>>> 1.1.0
