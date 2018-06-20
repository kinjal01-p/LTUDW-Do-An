var express = require('express');
var router = express.Router();
var productRepo = require('../database/repos/productRepo.js');
var productPerTypePromise = productRepo.countPerType();
var revenuePerTypePromise = productRepo.loadTotalRevenuePerType();
var productPerTypeArr = [];
var revenuePerTypeArr = [];

productPerTypePromise.then(values => {
    productPerTypeArr = [...values];
}).catch(reason => {
    console.log('Handle rejected promise (' + reason + ') here.');
});

revenuePerTypePromise.then(values => {
    revenuePerTypeArr = [...values];
}).catch(reason => {
    console.log('Handle rejected promise (' + reason + ') here.');
});

router.get('/', function (req, res, next) {
    console.log(revenuePerTypeArr);
    res.render('admin_dashboard', {
        layout: 'admin_layout',
        productPerTypeArr: productPerTypeArr,
        revenuePerTypeArr: revenuePerTypeArr
    });
});

module.exports = router;