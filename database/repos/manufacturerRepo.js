var db = require('../db.js');

exports.loadAll = () => {
      var sql = 'select * from manufacturer';
      return db.load(sql);
}

exports.single = id_manufacturer => {
      var sql = `select * from manufacturer where id_manufacturer = ${id_manufacturer}`;
      return db.load(sql);
}