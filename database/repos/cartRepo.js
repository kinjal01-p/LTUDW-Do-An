var db = require('../db.js');
var config = require('../../config/config.js');


exports.cart = id_order => {


    var sql = `select p.*, m.name as manufacturer, s.name as author, o.amount
from (((select * from store.product_order  where id_product_order = ${id_order}) as o
join store.product as p on p.id_product = o.id_product) join store.manufacturer as m
on p.id_manufacturer = m.id_manufacturer) join store.author as s on p.id_author = s.id_author
`;

    return db.load(sql);
}

exports.cart = id_order => {


    var sql = `select p.*, m.name as manufacturer, s.name as author, o.amount
from (((select * from store.product_order  where id_product_order = ${id_order}) as o
join store.product as p on p.id_product = o.id_product) join store.manufacturer as m
on p.id_manufacturer = m.id_manufacturer) join store.author as s on p.id_author = s.id_author
`;

    return db.load(sql);
}

exports.add_cart = (id_product_order, id_product, amount) => {


    var sql = `INSERT INTO  store.product_order( id_product_order , id_product , amount )
            VALUES (${id_product_order}, ${id_product}, ${amount})`;


    return db.save(sql);
}