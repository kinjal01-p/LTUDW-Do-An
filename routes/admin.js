var express = require('express');
var router = express.Router();
var productRepo = require('../database/repos/productRepo.js');
var typeRepo = require('../database/repos/typeRepo.js');
var manuRepo = require('../database/repos/manufacturerRepo.js');
var authorRepo = require('../database/repos/authorRepo.js');
var config = require('../config/config');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/resources')
    },
    filename: (req, file, cb) => {
        productRepo.getMaxId().then(value => {

            var maxId = parseInt(value[0].maxId) + 1;
            cb(null, maxId.toString() + '.jpg')
        });
    }

});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg') {
            return cb(new Error('Chỉ được dùng ảnh JPG!'));
        }
        cb(null, true)
    }
}).single('product_img');

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
    Promise.all([productRepo.countAll(), productRepo.loadByOffSet(offSet), manuRepo.loadAll(), typeRepo.loadAll()]).then(values => {
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
            manus: values[2],
            types: values[3],
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
    Promise.all([typeRepo.countAll(), typeRepo.loadByOffSetWithUsingProduct(offSet)]).then(values => {
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

//rout for manu management page
router.get('/manufacturer_manage', function (req, res, next) {
    var page = req.query.page;
    if (typeof (page) == 'undefined') {
        page = 1;
    }
    page = parseInt(page);
    var offSet = (page - 1) * config.appConfig.MANUFACTURERS_PER_TABLE;
    Promise.all([manuRepo.countAll(), manuRepo.loadByOffSetWithUsingProduct(offSet)]).then(values => {
        //console.log(values[0]);
        var numberic = page * config.appConfig.MANUFACTURERS_PER_TABLE - config.appConfig.MANUFACTURERS_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
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
//rout for add manufac
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
            var vm = {
                feedback: 'Nhà xuất bản đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});
//rout for edit manu
router.post('/manufacturer_manage/edit', (req, res) => {
    manuRepo.isExist(req.body.newManuName).then(isExist => {
        if (isExist[0].result < 1) {
            manuRepo.updateNameById(req.body.manuId, req.body.newManuName).then(result => {
                var vm = {
                    feedback: "Sửa nhà xuất bản thành công",
                    isSuccess: true
                };
                console.log("UPDATE MANUFACTURER: Name: " + req.body.newManuName + " - ID: " + req.body.manuId);

                res.send(vm);
            }).catch(err => {
                console.log("Error occurs when UPDATE manufaturer, err:" + err);

                var vm = {
                    feedback: "Lỗi khi sửa sản phẩm",
                    isSuccess: false
                }
                res.send(vm);
            });
        }
        else {
            var vm = {
                feedback: 'Nhà xuất bản đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});

//rout for delete manu
router.post('/manufacturer_manage/delete', (req, res) => {
    manuRepo.delete(req.body.manuIdToDelete).then(result => {
        console.log("DELETE MANUFACTURER: Name: " + req.body.manuNameToDelete + " - ID: " + req.body.manuIdToDelete);
        var vm = {
            feedback: "Xóa nhà xuất bản thành công",
            isSuccess: true
        };
        res.send(vm);
    }).catch(err => {
        console.log("Error occurs when DELETE manufaturer, err:" + err);
        var vm = {
            feedback: "Lỗi khi nhà xuất bản",
            isSuccess: false
        }
        res.send(vm);
    });
});

//rout for add type
router.post('/type_manage/add', (req, res) => {

    typeRepo.isExist(req.body.typeName).then(result => {
        if (result[0].result < 1) {
            typeRepo.getMaxId().then(maxId => {
                console.log(maxId);
                var newId = parseInt(maxId[0].maxId) + 1;
                typeRepo.add(newId, req.body.typeName).then(value => {
                    var vm = {
                        feedback: "Thêm loại sản phẩm thành công",
                        isSuccess: true
                    };
                    res.send(vm);
                }).catch(err => {
                    console.log("Error occurs when INSERT type, err:" + err);

                    var vm = {
                        feedback: "Lỗi khi thêm loại sản phẩm",
                        isSuccess: false
                    }
                    res.send(vm);
                });
            });
        }
        else {
            console.log("aaaa");

            var vm = {
                feedback: 'Loại sản phẩm đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});
//rout for edit type
router.post('/type_manage/edit', (req, res) => {
    typeRepo.isExist(req.body.newTypeName).then(isExist => {
        if (isExist[0].result < 1) {
            typeRepo.updateNameById(req.body.typeId, req.body.newTypeName).then(result => {
                var vm = {
                    feedback: "Sửa loại sản phẩm thành công",
                    isSuccess: true
                };
                console.log("UPDATE TYPE: Name: " + req.body.newTypeName + " - ID: " + req.body.typeId);

                res.send(vm);
            }).catch(err => {
                console.log("Error occurs when UPDATE type, err:" + err);

                var vm = {
                    feedback: "Lỗi khi sửa sản phẩm",
                    isSuccess: false
                }
                res.send(vm);
            });
        }
        else {
            var vm = {
                feedback: 'Loại sản phẩm đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});

//rout for delete type
router.post('/type_manage/delete', (req, res) => {
    typeRepo.delete(req.body.typeIdToDelete).then(result => {
        console.log("DELETE PRODUCT TYPE: Name: " + req.body.typeNameToDelete + " - ID: " + req.body.typeIdToDelete);
        var vm = {
            feedback: "Xóa loại sản phẩm thành công",
            isSuccess: true
        };
        res.send(vm);
    }).catch(err => {
        console.log("Error occurs when Delete product type, err:" + err);
        var vm = {
            feedback: "Lỗi khi xóa loại sản phẩm",
            isSuccess: false
        }
        res.send(vm);
    });
});

//rout for add product
router.post('/product_manage/upload', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            err.name = '';
            console.log(err.toString());

            var vm = {
                feedback: err.toString(),
                isSuccess: false
            };
            res.send(vm)
        }
        else {
            authorRepo.isExist(req.body.author).then(result => {
                if (result[0].result == 0) {
                    authorRepo.getMaxId().then(maxId => {
                        var newAuthorId = parseInt(maxId[0].maxId) + 1;
                        authorRepo.add(newAuthorId, req.body.author).then(result => {
                            productRepo.getMaxId().then(maxId => {
                                var newProductId = parseInt(maxId[0].maxId) + 1;
                                var product_type = req.body.product_type;
                                var product_manu = req.body.product_manu;
                                var decription = req.body.decription;
                                var publish_date = req.body.publish_date;
                                var product_name = req.body.product_name;
                                var price = req.body.price;
                                var import_price = req.body.import_price;
                                var in_stock = req.body.in_stock;
                                productRepo.add(newProductId, product_name, decription, price,
                                    import_price, product_type, product_manu,
                                    newAuthorId, publish_date, in_stock).then(result => {
                                        var vm = {
                                            feedback: "Thêm sản phẩm mới thành công",
                                            isSuccess: true
                                        }
                                        res.send(vm)
                                    }).catch(err => {
                                        console.log("Error occurs when ADD new Product , err:" + err);
                                        var vm = {
                                            feedback: "Lỗi khi thêm mới sản phẩm",
                                            isSuccess: false
                                        }
                                        res.send(vm)
                                    });
                            });
                        }).catch(err => {
                            console.log("Error occurs when ADD new author , err:" + err);
                            var vm = {
                                feedback: "Lỗi khi thêm tác giả mới",
                                isSuccess: false
                            }
                            res.send(vm)
                        });

                    });
                }
                else {
                    var existedAuthorID = parseInt(result[0].id);
                    productRepo.getMaxId().then(maxId => {
                        var newProductId = parseInt(maxId[0].maxId) + 1;
                        var product_type = req.body.product_type;
                        var product_manu = req.body.product_manu;
                        var decription = req.body.decription;
                        var publish_date = req.body.publish_date;
                        var product_name = req.body.product_name;
                        var price = req.body.price;
                        var import_price = req.body.import_price;
                        var in_stock = req.body.in_stock;
                        productRepo.add(newProductId, product_name, decription, price,
                            import_price, product_type, product_manu,
                            existedAuthorID, publish_date, in_stock).then(result => {
                                var vm = {
                                    feedback: "Thêm sản phẩm mới thành công",
                                    isSuccess: true
                                }
                                res.send(vm)
                            }).catch(err => {
                                console.log("Error occurs when ADD new Product , err:" + err);
                                var vm = {
                                    feedback: "Lỗi khi thêm mới sản phẩm",
                                    isSuccess: false
                                }
                                res.send(vm)
                        });
                    });
                }
            });

        }
        // typeRepo.delete(req.body.typeIdToDelete).then(result => {
        //     console.log("DELETE PRODUCT TYPE: Name: " + req.body.typeNameToDelete + " - ID: " + req.body.typeIdToDelete);
        //     var vm = {
        //         feedback: "Xóa loại sản phẩm thành công",
        //         isSuccess: true
        //     };
        //     res.send(vm);
        // }).catch(err => {
        //     console.log("Error occurs when Delete product type, err:" + err);
        //     var vm = {
        //         feedback: "Lỗi khi xóa loại sản phẩm",
        //         isSuccess: false
        //     }
        //     res.send(vm);
        // });

    });


});

module.exports = router;