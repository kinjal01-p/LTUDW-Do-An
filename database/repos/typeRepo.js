var db = require('../db.js');
var config = require('../../config/config.js');

exports.loadAll = () => {
      var sql = 'select * from class_product';
      return db.load(sql);
}

exports.loadByOffSet = offSet => {
      var sql = `select class_product.id_class as id,
      class_product.name as type_name
      from class_product
      where class_product.id_class!=0 limit ${config.appConfig.TYPES_PER_TABLE} offset ${offSet}`;
      return db.load(sql);
}

exports.countAll = () => {
      var sql = `select count(class_product.id_class) as typeNumber
      from class_product;`;
      return db.load(sql);
}