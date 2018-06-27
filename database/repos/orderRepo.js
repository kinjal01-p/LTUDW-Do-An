var db = require('../db.js');

exports.cart = idorder => {


    var sql = `select p.id_product, p.name, p.price, m.name as manufacturer, s.name as author, o.amount
from (((select * from store.product_order  where id_product_order = ${idorder}) as o
join store.product as p on p.id_product = o.id_product) join store.manufacturer as m
on p.id_manufacturer = m.id_manufacturer) join store.author as s on p.id_author = s.id_author
`;

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