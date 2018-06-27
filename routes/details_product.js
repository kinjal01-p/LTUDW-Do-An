var express = require('express');
var router = express.Router();

var productRepo = require('../database/repos/productRepo.js');

router.get('/:id_product', function (req, res, next) {
    var id_product = req.params.id_product;

    productRepo.updateViewCount(id_product).then(values => {
        productRepo.details(id_product).then(rows => {
            var product = rows[0];
            Promise.all([productRepo.getSameTypes(product.id_class), productRepo.getSameManufacturer(product.id_manufacturer)]).then(values => {
                res.render('details_product', {
                    title: 'Product',
                    product,
                    sameTypeProducts: values[0],
                    sameManufacturerProducts: values[1]
                });
            }).catch(e => {
                res.render('error');
            });
        }).catch(e => {
            res.render('error');
        });
    }).catch(e => {
        res.render('error');
    });
});

module.exports = router;