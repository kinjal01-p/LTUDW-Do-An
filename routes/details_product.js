var express = require('express');
var router = express.Router();

/* GET users listing. */

var productRepo = require('../database/repos/productRepo.js');

// var productDetails = db.details(2536274226658);
// var productTypes = db.sameTypes(10003);
// var productNXBs = db.sameCategories(20007);


// let product = {};
// let typeProductList = [];
// let caregoryProductList = [];

// productDetails.then(
//         function (val) {
//             product = val[0];
//         })
//     .catch(
//         function (reason) {
//             console.log('Handle rejected promise (' + reason + ') here.');
//         });

// productTypes.then(
//         function (val) {
//             //console.log(val);
//             typeProductList = [...val];
//         })
//     .catch(
//         function (reason) {
//             console.log('Handle rejected promise (' + reason + ') here.');
//         });

// productNXBs.then(
//         function (val) {
//             caregoryProductList = [...val];
//         })
//     .catch(
//         function (reason) {
//             console.log('Handle rejected promise (' + reason + ') here.');
//         });


router.get('/:id_product', function (req, res, next) {
    var id_product = req.params.id_product;
    req.session.id_product = id_product;


    productRepo.details(id_product).then(rows => {
        var product = rows[0];
        Promise.all([productRepo.getSameTypes(product.id_class), productRepo.getSameManufacturer(product.id_manufacturer)]).then(values => {
            res.render('details_product', {
                title: 'Product',
                product,
                sameTypeProducts: values[0],
                sameManufacturerProducts: values[1]
            });
        });
    });
});



module.exports = router;