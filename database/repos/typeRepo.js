var db = require('../db.js');

exports.loadAll = () => {
      var sql = 'select * from class_product';
      return db.load(sql);
}

exports.single = id_class => {
      var sql = `select * from class_product where id_class = '${id_class}'`;
      return db.load(sql);
}