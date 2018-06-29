var db = require('../db.js');
var config = require('../../config/config.js');

exports.loadByClient = email => {
    var sql = `select * from ${config.mysqlConfig.database}.order where email = '${email}' order by time_place desc`;
    return db.load(sql);
}

exports.single = id_order => {
    var sql = `select * from ${config.mysqlConfig.database}.order where id_order = '${id_order}'`;
    return db.load(sql);
}

exports.singleWithClient = (id_order, email) => {
    var sql = `select * from ${config.mysqlConfig.database}.order where id_order = '${id_order}' and email = '${email}'`;
    return db.load(sql);
}

exports.loadItemsOrder = id_order => {
    var sql = `select * from ${config.mysqlConfig.database}.product_order where id_order = '${id_order}'`;
    return db.load(sql);
}

exports.createOrder = info => {
    var sql = `insert into ${config.mysqlConfig.database}.order(email, time_place, status, total_price) values('${info.email}', '${info.place_day}', '0', '${info.total_price}')`;
    return db.save(sql);
}

exports.addItem2Order = item => {
    var sql = `insert into ${config.mysqlConfig.database}.product_order(id_order, id_product, amount, price) values('${item.id_order}', '${item.id_product}', '${item.amount}', '${item.price}')`;
    return db.save(sql);
}

exports.loadAllByOffset = offset => {
    var sql = `select o.id_order,
    o.email, 
    DATE_FORMAT(o.time_place, '%d-%m-%Y') as time_place,
    o.status,
    o.total_price
    from ${config.mysqlConfig.database}.order as o
    where o.id_order !=0 
    order by o.time_place desc limit ${config.appConfig.ORDERS_PER_TABLE} offset ${config.appConfig.ORDERS_PER_TABLE * offset};`;
    return db.load(sql);
}

exports.countAll = () => {

    var sql = `select count(*) as TOTAL
    from ${config.mysqlConfig.database}.order as o
    where o.id_order !=0 ;`;
    return db.load(sql);
}

exports.updateStatus = (id,status) => {
    var sql = `UPDATE ${config.mysqlConfig.database}.order SET status = ${status} WHERE (id_order = ${id});`;
    
    return db.load(sql); 
}

exports.deleteOrder = (id) => {
    var sql = `delete from ${config.mysqlConfig.database}.order
    where id_order = ${id};`
    return db.load(sql); 

}
exports.deleteProductOrder = (id) => {
    var sql = `delete from ${config.mysqlConfig.database}.product_order
    where id_order = ${id};`
    return db.load(sql); 

}
