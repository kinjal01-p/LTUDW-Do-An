var db = require('../db.js');

exports.loadAll = () => {
      var sql = 'select * from class_product';
      return db.load(sql);
}