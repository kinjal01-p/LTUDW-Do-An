var express = require('express');
var router = express.Router();
var productRepo = require('../database/repos/productRepo.js');
var typeRepo = require('../database/repos/typeRepo.js');
var manuRepo = require('../database/repos/manufacturerRepo.js');
var config = require('../config/config');



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

        if (page >= pageNumbers) {
            maxPage = pageNumbers;
        }
        else {
            maxPage = minPage + 4;
            if (maxPage > pageNumbers) {
                maxPage = pageNumbers;
            }
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

router.get('/type_manage', function (req, res, next) {
    var page = req.query.page;
    if (typeof (page) == 'undefined') {
        page = 1;
    }
    page = parseInt(page);
    var offSet = (page - 1) * config.appConfig.TYPES_PER_TABLE;
    Promise.all([typeRepo.countAll(), typeRepo.loadByOffSet(offSet)]).then(values => {
        //console.log(values[0]);
        var numberic = page * config.appConfig.TYPES_PER_TABLE - config.appConfig.TYPES_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            numberic++;
        }

        var pageNumbers = Math.floor(values[0][0].typeNumber / config.appConfig.TYPES_PER_TABLE);
        var minPage;
        var maxPage;
        if (values[0][0].typeNumber % config.appConfig.TYPES_PER_TABLE) {
            pageNumbers++;
        }


        if (page - 2 <= 0) {
            minPage = 1;
        }
        else {
            minPage = page - 2;
        }

        if (page >= pageNumbers) {
            maxPage = pageNumbers;
        }
        else {
            maxPage = minPage + 4;
            if (maxPage >= pageNumbers) {
                maxPage = pageNumbers;
            }
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
        res.render('admin_type_management', {
            layout: 'admin_layout',
            types: values[1],
            pageNumbers: numbers,
            nextPage: nextPage,
            prevPage: prevPage
        });
    });
});

router.get('/manufacturer_manage', function (req, res, next) {
    var page = req.query.page;
    if (typeof (page) == 'undefined') {
        page = 1;
    }
    page = parseInt(page);
    var offSet = (page - 1) * config.appConfig.MANUFACTURERS_PER_TABLE;
    Promise.all([manuRepo.countAll(), manuRepo.loadByOffSet(offSet)]).then(values => {
        //console.log(values[0]);
        var numberic = page * config.appConfig.MANUFACTURERS_PER_TABLE - config.appConfig.MANUFACTURERS_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            console.log(values[1][i]);
            numberic++;
        }

        var pageNumbers = Math.floor(values[0][0].manuNumber / config.appConfig.MANUFACTURERS_PER_TABLE);
        var minPage;
        var maxPage;
        if (values[0][0].manuNumber % config.appConfig.MANUFACTURERS_PER_TABLE) {
            pageNumbers++;
        }


        if (page - 2 <= 0) {
            minPage = 1;
        }
        else {
            minPage = page - 2;
        }

        if (page >= pageNumbers) {
            maxPage = pageNumbers;
        }
        else {
            maxPage = minPage + 4;
            if (maxPage >= pageNumbers) {
                maxPage = pageNumbers;
            }
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
        res.render('admin_manufacturer_management', {
            layout: 'admin_layout',
            manus: values[1],
            pageNumbers: numbers,
            nextPage: nextPage,
            prevPage: prevPage,
            showAlert: false,
        });
    });
});
//rout for add
router.post('/manufacturer_manage/add', (req, res) => {

    manuRepo.isExist(req.body.manuName).then(result => {
        if (result[0].result < 1) {
            manuRepo.getMaxId().then(maxId => {
                console.log(maxId);
                var newId = parseInt(maxId[0].maxId) + 1;
                manuRepo.add(newId, req.body.manuName).then(value => {
                    var vm = {
                        feedback: "Thêm nhà xuất bản thành công",
                        isSuccess: true
                    };
                    res.send(vm);
                }).catch(err => {
                    console.log("Error occurs when INSERT manufaturer, err:" + err);

                    var vm = {
                        feedback: "Lỗi khi thêm sản phẩm",
                        isSuccess: false
                    }
                    res.send(vm);
                });
            });
        }
        else {
            console.log("aaaa");

            var vm = {
                feedback: 'Nhà xuất bản đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});
//rout for edit
router.post('/manufacturer_manage/edit', (req, res) => {

    manuRepo.updateNameById(req.body.manuId, req.body.newManuName).then(result => {
        var vm = {
            feedback: "Sửa nhà xuất bản thành công",
            isSuccess: true
        };
        console.log("UPDATE MANUFACTURER: Name: " + req.body.newManuName + " - ID: " + req.body.manuId);
        
        res.send(vm);
    }).catch(err =>{
        console.log("Error occurs when UPDATE manufaturer, err:" + err);

        var vm = {
            feedback: "Lỗi khi sửa sản phẩm",
            isSuccess: false
        }
        res.send(vm);
    });
});
module.exports = router;