var db = require('../db.js');
var config = require('../../config/config.js');

exports.loadAll = () => {
      var sql = 'select * from product';
      return db.load(sql);
}

exports.loadAllByType = (typeId, offset) => {
      var sql = `select * from product where id_class = ${typeId} limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset}`;
      return db.load(sql);
}

exports.countByType = typeId => {
      var sql = `select count(*) as total from product where id_class = ${typeId}`;
      return db.load(sql);
}

exports.countPerType = () =>{
      var sql = `select class_product.name as type_name, count(product.id_product) as quantity
      from product inner join class_product on product.id_class = class_product.id_class
      group by product.id_class`;
      return db.load(sql);
}

exports.loadTotalRevenuePerType = () => {
      var sql = `select class_product.name as type_name, sum(product.sell_amount*product.price) as revenue
      from product inner join class_product on product.id_class = class_product.id_class
      group by product.id_class`;
      return db.load(sql);
}

exports.single = proId => {
      var sql = `select * from product where id_product = ${proId}`;
      return db.load(sql);
}

exports.top_new = () => {
      var sql = `select * from product ORDER BY publish_date DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}

exports.top_sale = () => {
      var sql = `select * from product ORDER BY sell_amount DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}

exports.top_viewed = () => {
      var sql = `select * from product ORDER BY view_count DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}