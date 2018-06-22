var express = require('express');
var router = express.Router();


var db = require('../database/repos/cartRepo.js');

// email client
var productList = db.cart('2001');

let products = [];

productList.then(
        function (val) {
            products = [...val];
        })
    .catch(
        function (reason) {
            console.log('Handle rejected promise (' + reason + ') here.');
        });

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('cart_page',{title:"Cart" , products});
});

module.exports = router;
