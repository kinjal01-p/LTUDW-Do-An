var db = require('../db.js');
var config = require('../../config/config.js');



exports.shipInfo = email => {

    var sql = `SELECT  pro_o.* , pro.*
          FROM client as cli join store.order as o on cli.email = o.email
          join product_order as pro_o on o.id_prodcut_order = pro_o.id_product_order
          join product as pro on pro_o.id_product = pro.id_product
			where cli.email = '${email}'`;

    return db.load(sql);
}
