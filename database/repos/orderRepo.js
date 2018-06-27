var db = require('../db.js');

exports.loadByClient = email => {
    var sql = `select * from store.order where email = '${email}' order by time_place`;
    return db.load(sql);
}

exports.loadItemsOrder = id_order => {
    var sql = `select * from store.product_order where id_order = '${id_order}'`;
    return db.load(sql);
}

exports.createOrder = info => {
    var sql = `insert into store.order(email, time_place, status, total_price) values('${info.email}', '${info.place_day}', '0', '${info.total_price}')`;
    return db.save(sql);
}

exports.addItem2Order = item => {
    var sql = `insert into store.product_order(id_order, id_product, amount, price) values('${item.id_order}', '${item.id_product}', '${item.amount}', '${item.price}')`;
    return db.save(sql);
}