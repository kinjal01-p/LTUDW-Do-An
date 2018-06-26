var db = require('../db.js');

exports.add = user => {
      var sql = `insert into client(email, name, address, password) values('${user.email}', '${user.name}', '${user.address}', '${user.password}')`;
      return db.save(sql);
}

exports.login = user => {
      var sql = `select * from client where email = '${user.email}' and password = '${user.password}'`;
      return db.load(sql);
}