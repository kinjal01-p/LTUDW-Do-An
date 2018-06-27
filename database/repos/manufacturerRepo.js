var db = require('../db.js');
var config = require('../../config/config.js');

exports.loadAll = () => {
      var sql = `select * from manufacturer`;
      return db.load(sql);
}

exports.isExist = name =>{
      var sql = `select count(manufacturer.id_manufacturer) as result
      from manufacturer
      where  lower(manufacturer.name) = lower(N'${name}');`;
      return db.load(sql);
}

exports.loadByOffSet = offSet => {
      var sql = `select manufacturer.id_manufacturer as id,
      manufacturer.name as manu_name
      from manufacturer
      where manufacturer.id_manufacturer!=0 limit ${config.appConfig.MANUFACTURERS_PER_TABLE} offset ${offSet}`;
      return db.load(sql);
}

exports.countAll = () => {
      var sql = `select count(manufacturer.id_manufacturer) as manuNumber
      from manufacturer;`;
      return db.load(sql);
}

exports.getMaxId = () => {
      var sql = `select max(manufacturer.id_manufacturer) as maxId
      from manufacturer;`;
      return db.load(sql);
}

exports.add = (id,name) =>{
      var sql = `insert into manufacturer (id_manufacturer, name) values (${id},'${name}');`;
      return db.load(sql);
}

exports.updateNameById = (id,newName) => {
      var sql = `update manufacturer set manufacturer.name = N'${newName}' where manufacturer.id_manufacturer = ${id};`;
      return db.load(sql);
}

exports.single = id_manufacturer => {
      var sql = `select * from manufacturer where id_manufacturer = ${id_manufacturer}`;
}
exports.loadByOffSetWithUsingProduct = offSet => {
      var sql = `select manufacturer.id_manufacturer as id,
      manufacturer.name as manu_name,
      count(product.id_product) as using_products
      from manufacturer left join product on manufacturer.id_manufacturer = product.id_manufacturer
      where manufacturer.id_manufacturer!=0 
      group by manufacturer.id_manufacturer limit  ${config.appConfig.MANUFACTURERS_PER_TABLE} offset ${offSet};`;
      return db.load(sql);
}

exports.delete = id => {
      var sql = `delete from manufacturer where manufacturer.id_manufacturer = ${id};`;
      return db.load(sql);
}