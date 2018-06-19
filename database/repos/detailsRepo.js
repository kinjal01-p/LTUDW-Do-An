var db = require('../db.js');
var config = require('../../config/config.js');


exports.details = proId => {    
  
    var sql = `SELECT product.name ,product.sell_amount, product.description, product.price, product.view_count , manu.name as manufacturer, au.name as author
        FROM store.product as product join store.manufacturer as manu on product.id_manufacturer = manu.id_manufacturer 
        join store.author as au on product.id_author = au.id_author
        where id_product = ${proId} limit 1`;

    return db.load(sql);
}

exports.sameTypes = typeId => {
    var sql = `select name, price from product where id_class = ${typeId}  limit ${config.appConfig.PRODUCTS_SAME_TYPE}`;
    return db.load(sql);
}

exports.sameCategories = cateId => {
    var sql = `select name, price from product where id_manufacturer = ${cateId}  limit ${config.appConfig.PRODUCTS_SAME_TYPE}` ;
    return db.load(sql);
}