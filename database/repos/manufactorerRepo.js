var db = require('../db.js');

exports.loadAll = () => {
      var sql = 'select * from manufactorer';
      return db.load(sql);
}