var db = require('../db.js');
var config = require('../../config/config.js');

exports.loadAll = offset => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;
      return db.load(sql);
}

exports.countAllProducts = () => {
      var sql = `select count(*) as TOTAL from product`;
      return db.load(sql);
}

exports.loadAllByType = (typeId, offset) => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product where id_class = ${typeId} limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;
      return db.load(sql);
}

exports.countByType = typeId => {
      var sql = `select count(*) as TOTAL from product where id_class = ${typeId}`;
      return db.load(sql);
}

exports.loadAllByManufacturer = (manufacturerId, offset) => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product where id_manufacturer = ${manufacturerId} limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;
      return db.load(sql);
}

exports.countByManufacturer = manufacturerId => {
      var sql = `select count(*) as TOTAL from product where id_manufacturer = ${manufacturerId}`;
      return db.load(sql);
}

exports.single = proId => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product where id_product = ${proId}`;
      return db.load(sql);
}

exports.top_new = () => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product ORDER BY publish_date DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}

exports.top_sale = () => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product ORDER BY sell_amount DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}

exports.top_viewed = () => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product ORDER BY view_count DESC limit ${config.appConfig.PRODUCTS_PER_TOP} offset 0`;
      return db.load(sql);
}

exports.details = proId => {
      var sql = `SELECT pro.*, (pro.in_stock <= 0) as out_of_stock, manu.name as manufacturer_name, au.name as author_name, type.name as type_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author
          join class_product as type on pro.id_class = type.id_class
          where id_product = ${proId} limit 1`;

      return db.load(sql);
}

exports.getSamples = () => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product ORDER BY RAND() limit ${config.appConfig.PRODUCTS_SAMPLE}`;
      return db.load(sql);
}

exports.getSameTypes = typeId => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product where id_class = ${typeId} ORDER BY RAND() limit ${config.appConfig.PRODUCTS_SAME_TYPE}`;
      return db.load(sql);
}

exports.getSameManufacturer = manufacturerId => {
      var sql = `select *, (in_stock <= 0) as out_of_stock from product where id_manufacturer = ${manufacturerId} ORDER BY RAND() limit ${config.appConfig.PRODUCTS_SAME_TYPE}`;
      return db.load(sql);
}

exports.search = (name, offset) => {
      var sql = `SELECT *, (in_stock <= 0) as out_of_stock FROM product where name like '%${name}%' limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;

      return db.load(sql);
}
exports.countAllSearch = (name) => {
      var sql = `SELECT COUNT(*) AS TOTAL FROM product where name like '%${name}%'`;

      return db.load(sql);
}

exports.countAllSearchAdvanded = (data) => {
      var sql = `SELECT COUNT(*) AS TOTAL
      FROM product
      where name like '%${data.title}%'
      and id_manufacturer like '%${data.id_manufacturer}%'
      and id_class like '%${data.id_class}%'`;

      return db.load(sql);
}

exports.searchAdvanded = (data, offset) => {
      var sql = `SELECT *, (in_stock <= 0) as out_of_stock
      FROM product
      where name like '%${data.title}%'
      and id_manufacturer like '%${data.id_manufacturer}%'
      and id_class like '%${data.id_class}%'
      limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;

      return db.load(sql);
}

exports.loadAllByPrice = (minPrice, maxPrice, offset) => {
      var sql = `SELECT *, (in_stock <= 0) as out_of_stock
      FROM product
      where ${minPrice} <= price
      and price < ${maxPrice}
      limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset * config.appConfig.PRODUCTS_PER_PAGE}`;
      return db.load(sql);
}

exports.countAllByPrice = (minPrice, maxPrice) => {
      var sql = `SELECT COUNT(*) AS TOTAL
      FROM product
      where ${minPrice} <= price
      and price < ${maxPrice}`;
      return db.load(sql);
}

exports.updateViewCount = id_product => {
      var sql = `update product
      set view_count = view_count + 1
      where id_product = '${id_product}'`;
      return db.save(sql);
}