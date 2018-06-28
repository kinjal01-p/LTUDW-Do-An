var db = require('../db.js');

exports.login = user => {
      var sql = `select * from store.admin where username = '${user.username}' and password = '${user.password}'`;
      return db.load(sql);
}