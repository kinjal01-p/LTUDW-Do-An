var db = require('../db.js');

exports.login = user => {
      var sql = `select * from heroku_8bdc6337206fdaa.admin where username = '${user.username}' and password = '${user.password}'`;
      return db.load(sql);
}