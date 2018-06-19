var express = require('express');
var router = express.Router();

/* GET users listing. */

var db = require('../database/repos/detailsRepo.js');

var productDetails = db.details(2536274226658);
var productTypes = db.sameTypes(10003);
var productNXBs = db.sameCategories(20007);


let product = {};
let typeProductList = [];
let caregoryProductList = [];

productDetails.then(
        function (val) {
            product = val[0];
        })
    .catch(
        function (reason) {
            console.log('Handle rejected promise (' + reason + ') here.');
        });

productTypes.then(
        function (val) {
            //console.log(val);
            typeProductList = [...val];
        })
    .catch(
        function (reason) {
            console.log('Handle rejected promise (' + reason + ') here.');
        });

productNXBs.then(
        function (val) {
            caregoryProductList = [...val];
        })
    .catch(
        function (reason) {
            console.log('Handle rejected promise (' + reason + ') here.');
        });


router.get('/', function (req, res, next) {
    console.log(product);
    // var userName = req.session.passport.user;
    res.render('details_product', {
        title: 'Product',
        product,
        typeProductList,
        caregoryProductList
    });

});

module.exports = router;