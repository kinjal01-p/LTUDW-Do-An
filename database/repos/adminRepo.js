var db = require('../db.js');
var config = require('../../config/config.js');

exports.login = user => {
      var sql = `select * from ${config.mysqlConfig.database}.admin where username = '${user.username}' and password = '${user.password}'`;
      return db.load(sql);
}