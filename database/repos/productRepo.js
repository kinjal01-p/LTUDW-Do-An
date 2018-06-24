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

exports.details = proId => {
      var sql = `SELECT pro.*, manu.name as manufacturer_name, au.name as author_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author
          where id_product = ${proId} limit 1`;

      return db.load(sql);
}

exports.getSameTypes = typeId => {
      var sql = `select * from product where id_class = ${typeId} ORDER BY RAND() limit ${config.appConfig.PRODUCTS_SAME_TYPE}`;
      return db.load(sql);
}

exports.getSameManufacturer = manufacturerId => {
      var sql = `select * from product where id_manufacturer = ${manufacturerId} ORDER BY RAND() limit ${config.appConfig.PRODUCTS_SAME_TYPE}`;
      return db.load(sql);
}

exports.search = (name, offset) => {

      var sql = `SELECT DISTINCT pro.* , manu.name as manufacturer_name, au.name as author_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author 
           where `;

      for (let i = 0; i < name.length; ++i) {
            sql += `pro.name like '%${name[i]}%' or manu.name like '%${name[i]}%' or au.name like '%${name[i]}%'`;
            sql += (i >= name.length - 1) ? `` : ` or `;
      }

      sql += ` limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset}`;

      return db.load(sql);
}
exports.searchAll = (name) => {

      var sql = `SELECT DISTINCT pro.* , manu.name as manufacturer_name, au.name as author_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author where `;

      for (let i = 0; i < name.length; ++i) {
            sql += `pro.name like '%${name[i]}%' or manu.name like '%${name[i]}%' or au.name like '%${name[i]}%'`;
            sql += (i >= name.length - 1) ? `` : ` or `;
      }

      return db.load(sql);
}

exports.searchAdvanded_All = (data) => {

      var sql = `SELECT DISTINCT pro.* , manu.name as manufacturer_name, au.name as author_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author join class_product as class on pro.id_class = class.id_class 
           where pro.name like '%${data.title}%'
           and manu.name like '%${data.manufacturer}%'
           and au.name like '%${data.author}%'
           and class.name like '%${data.class}%'
           `;

      return db.load(sql);
}

exports.searchAdvanded = (data, offset) => {

      var sql = `SELECT DISTINCT pro.* , manu.name as manufacturer_name, au.name as author_name
          FROM product as pro join manufacturer as manu on pro.id_manufacturer = manu.id_manufacturer 
          join author as au on pro.id_author = au.id_author join class_product as class on pro.id_class = class.id_class 
           where pro.name like '%${data.title}%'
           and manu.name like '%${data.manufacturer}%'
           and au.name like '%${data.author}%'
           and class.name like '%${data.class}%'
             limit ${config.appConfig.PRODUCTS_PER_PAGE} offset ${offset}`;

      return db.load(sql);
}