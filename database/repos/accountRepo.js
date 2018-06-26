var db = require('../db.js');
var config = require('../../config/config.js');

exports.clientInfo = email => {

    var sql = `SELECT * from client where email = '${email}'`;

    return db.load(sql);
}
