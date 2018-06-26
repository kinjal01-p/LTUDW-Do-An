var db = require('../db.js');

exports.add = user => {
      var sql = `insert into client(email, name, address, password, phone_number, date_of_birth) values('${user.email}', '${user.name}', '${user.address}', '${user.password}', '${user.phone}', '${user.dob}')`;
      return db.save(sql);
}

exports.login = user => {
      var sql = `select * from client where email = '${user.email}' and password = '${user.password}'`;
      return db.load(sql);
}