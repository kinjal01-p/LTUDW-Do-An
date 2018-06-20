var db = require('../db.js');

exports.loadAll = () => {
      var sql = 'select * from manufacturer';
      return db.load(sql);
}