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
exports.getMaxId = () => {
      var sql = `select max(class_product.id_class) as maxId
      from class_product;`;
      return db.load(sql);
}

exports.countAll = () => {
      var sql = `select count(class_product.id_class) as typeNumber
      from class_product;`;
}

exports.single = id_class => {
      var sql = `select * from class_product where id_class = '${id_class}'`;
      return db.load(sql);
}

exports.isExist = name =>{
      var sql = `select count(class_product.id_class) as result
      from class_product
      where  lower(class_product.name) = lower(N'${name}');`;
      return db.load(sql);
}

exports.add = (id,name) =>{
      var sql = `insert into class_product (id_class, name) values (${id},'${name}');`;
      return db.load(sql);
}

exports.updateNameById = (id,newName) => {
      var sql = `update class_product set class_product.name = N'${newName}' where class_product.id_class = ${id};`;
      return db.load(sql);
}

exports.loadByOffSetWithUsingProduct = offSet => {
      var sql = `select class_product.id_class as id,
      class_product.name as type_name,
      count(product.id_product) as using_products
      from class_product left join product on class_product.id_class = product.id_class
      where class_product.id_class!=0 
      group by class_product.id_class limit  ${config.appConfig.TYPES_PER_TABLE} offset ${offSet};`;
      return db.load(sql);
}

exports.delete = id => {
      var sql = `delete from class_product where class_product.id_class = ${id};`;
      return db.load(sql);
}
