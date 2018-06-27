var db = require('../db.js');

exports.add = user => {
      var sql = `insert into client(email, name, address, password, phone_number, date_of_birth) values('${user.email}', '${user.name}', '${user.address}', '${user.password}', '${user.phone}', '${user.dob}')`;
      return db.save(sql);
}

exports.login = user => {
      var sql = `select * from client where email = '${user.email}' and password = '${user.password}'`;
      return db.load(sql);
}

exports.changePassword = user => {
      var sql = `update client set password = '${user.password}' where email = '${user.email}'`;
      return db.save(sql);
}

exports.editProfile = user => {
      var sql = `update client 
      set name = '${user.name}',
      address = '${user.address}',
      phone_number = '${user.phone}',
      date_of_birth = '${user.dob}'
      where email = '${user.email}'`;
      return db.save(sql);
}

exports.remove = user => {
      var sql = `delete from client where password = '${user.password}' and email = '${user.email}'`;
      return db.save(sql);
}