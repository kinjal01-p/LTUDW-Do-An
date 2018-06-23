var express = require('express');
var router = express.Router();
var productRepo = require('../database/repos/productRepo.js');
var config = require('../config/config');
var productPerTypePromise = productRepo.countPerType();
var revenuePerTypePromise = productRepo.loadTotalRevenuePerType();
var productPerTypeArr = [];
var revenuePerTypeArr = [];


router.get('/dashboard', function (req, res, next) {
    Promise.all([productRepo.countPerType(), productRepo.loadTotalRevenuePerType()]).then(values => {
        //console.log(values[0]);
        //console.log(values[1]);
        res.render('admin_dashboard', {
            layout: 'admin_layout',
            productPerTypeArr: values[0],
            revenuePerTypeArr: values[1]
        });
    });
});

router.get('/', function (req, res, next) {
    res.redirect('admin/dashboard');
});

router.get('/product_manage', function (req, res, next) {
    var page = req.query.page;
    if (typeof (page) == 'undefined') {
        page = 1;
    }
    page = parseInt(page);
    var offSet = (page - 1) * config.appConfig.PRODUCTS_PER_TABLE;
    Promise.all([productRepo.countAll(), productRepo.loadByOffSet(offSet)]).then(values => {
        //console.log(values[0]);
        //console.log(values[1]);
        var numberic = page * config.appConfig.PRODUCTS_PER_TABLE - config.appConfig.PRODUCTS_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            console.log(values[1][i]);
            numberic++;
        }

        var pageNumbers = Math.floor(values[0][0].productNumber / config.appConfig.PRODUCTS_PER_TABLE);
        var minPage;
        var maxPage;
        if (values[0][0].productNumber % config.appConfig.PRODUCTS_PER_TABLE) {
            pageNumbers++;
        }


        if (page - 2 <= 0) {
            minPage = 1;
        }
        else {
            minPage = page - 2;
        }

        if (maxPage > pageNumbers) {
            maxPage = pageNumbers;
        }
        else {
            maxPage = minPage + 4;

        }
        var prevPage = {};
        var nextPage = {};
        if (page <= 1) {
            prevPage['value'] = 1;
            prevPage['isMinimum'] = true;
        }
        else {
            prevPage['value'] = page - 1;
            prevPage['isMinimum'] = false;
        }

        if (page >= pageNumbers) {
            nextPage['value'] = pageNumbers;
            nextPage['isMaximum'] = true;
        }
        else {
            nextPage['value'] = page + 1;
            nextPage['isMaximum'] = false;
        }
        var numbers = [];
        for (var i = minPage; i <= maxPage; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        res.render('admin_product_management', {
            layout: 'admin_layout',
            products: values[1],
            pageNumbers: numbers,
            nextPage: nextPage,
            prevPage: prevPage
        });
    });
});
module.exports = router;