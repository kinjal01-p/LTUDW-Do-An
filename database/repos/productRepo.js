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

exports.countAll = () => {
      var sql = `select count(product.id_product) as productNumber from product;`;
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

exports.countPerType = () => {
      var sql = `select class_product.name as type_name, count(product.id_product) as quantity
      from product inner join class_product on product.id_class = class_product.id_class
      group by product.id_class`;
      return db.load(sql);
}

exports.loadTotalRevenuePerType = () => {
      var sql = `select class_product.name as type_name, sum(product.sell_amount*(product.price - product.import_price)) as revenue
      from product inner join class_product on product.id_class = class_product.id_class
      group by product.id_class`;
      return db.load(sql);
}
exports.loadByOffSet = offSet => {
      var sql = `select product.id_product as id,
      product.name as prod_name, 
      product.description as description,
      product.price as price, 
      product.import_price as import_price, 
      date_format(product.publish_date, "%d-%m-%Y") as publish_date,
      product.in_stock as in_stock,
      class_product.name as prod_type,
      manufacturer.name as manufacturer,
      author.name as author
      from product inner join class_product on class_product.id_class = product.id_class
      inner join manufacturer on manufacturer.id_manufacturer = product.id_manufacturer
      inner join author on author.id_author = product.id_author 
      where product.id_product != 0  limit ${config.appConfig.PRODUCTS_PER_TABLE} offset ${offSet}`;
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

exports.updateAmount = (id_product, amount) => {
      var sql = `update product
      set sell_amount = sell_amount + ${amount},
      in_stock = in_stock - ${amount}
      where id_product = '${id_product}'`;
      return db.save(sql);
}
exports.getMaxId = () => {
      var sql = `SELECT max(product.id_product) as maxId FROM ${config.mysqlConfig.database}.product;`;
      return db.load(sql);
}

exports.add = (id_product, name, description, price, import_price, id_class, id_manufacturer, id_author, publish_date, in_stock) => {
      var sql = `INSERT INTO product (id_product, name, description, price, import_price , id_class, id_manufacturer, id_author, publish_date, in_stock, view_count, sell_amount)
       VALUES ('${id_product}', N'${name}', N'${description}', ${price}, ${import_price}, ${id_class}, ${id_manufacturer}, ${id_author}, STR_TO_DATE( '${publish_date}', '%Y-%m-%d'), ${in_stock}, 0, 0);`;
      console.log(sql);
       return db.load(sql);
}

exports.loadByOffSetWithUsingOrder = offSet => {
      var sql = `select product.id_product as id,
      product.name as prod_name, 
      product.description as description,
      product.price as price, 
      product.import_price as import_price, 
      date_format(product.publish_date, "%d-%m-%Y") as publish_date,
      product.in_stock as in_stock,
      class_product.name as prod_type,
      manufacturer.name as manufacturer,
      author.name as author,
      (product.price - product.import_price)*sell_amount as revenue,
      count(product_order.id_order) as using_orders
      from product inner join class_product on class_product.id_class = product.id_class
      inner join manufacturer on manufacturer.id_manufacturer = product.id_manufacturer
      inner join author on author.id_author = product.id_author 
      left join product_order on product_order.id_product = product.id_product
      where product.id_product != 0 
      group by product.id_product limit ${config.appConfig.PRODUCTS_PER_TABLE} offset ${offSet * config.appConfig.PRODUCTS_PER_TABLE}`;
      return db.load(sql);
}

exports.updateProduct = (id,name,description,price,id_class,id_manufacturer,id_author,publish_date,in_stock,import_price) => {
      var sql = `UPDATE ${config.mysqlConfig.database}.product
      SET name = N'${name}',
      description = N'${description}',
      price = ${price},
      id_class = ${id_class},
      id_manufacturer = ${id_manufacturer},
      id_author = ${id_author},
      publish_date = STR_TO_DATE( '${publish_date}', '%Y-%m-%d'),
      in_stock = ${in_stock},
      import_price = ${import_price}
      WHERE (id_product = '${id}');`
      console.log(sql);
      
      return db.load(sql);
}

exports.delete =  (id) => {
      var sql = `delete from product 
      where product.id_product = '${id}' and product.id_product not in 
      (select product_order.id_product from product_order);`
      console.log(sql);
      return db.load(sql);
}