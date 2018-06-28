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

var admin_restrict = require('../middle-wares/admin_restrict.js');
var restrict_logged = require('../middle-wares/restrict_logged.js');
var restrict_admin_logged = require('../middle-wares/restrict_admin_logged.js');

var adminRepo = require('../database/repos/adminRepo.js');
var SHA256 = require('crypto-js/sha256');

const Recaptcha = require('express-recaptcha').Recaptcha
const recaptcha = new Recaptcha(config.captchaConfig.RECAPTCHA_SITE_KEY, config.captchaConfig.RECAPTCHA_SECRET_KEY);

var storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/resources')
    },
    filename: (req, file, cb) => {
        productRepo.getMaxId().then(value => {
            cb(null, req.body.productIdToEdit + '.jpg')
        });
    }

});

var uploadEdit = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg') {
            return cb(new Error('Chỉ được dùng ảnh JPG!'));
        }
        cb(null, true)
    }
}).single('product_img');

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

router.get('/dashboard', admin_restrict, function (req, res) {
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

router.get('/', admin_restrict, function (req, res, next) {
    res.redirect('/admin/dashboard');
});

router.get('/product_manage', admin_restrict, function (req, res, next) {
    var page = req.query.page;
    var url = '/admin' + req.url;

    if (url.lastIndexOf('?page') != -1)
        url = url.substr(0, url.lastIndexOf('?page'));

    if (!page) {
        page = 1;
    }

    page = +page;
    var offSet = (page - 1);

    var pageList = [];

    Promise.all([productRepo.countAllProducts(), productRepo.loadByOffSetWithUsingOrder(offSet)]).then(values => {
        var numberic = page * config.appConfig.PRODUCTS_PER_TABLE - config.appConfig.PRODUCTS_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            numberic++;
        }

        var total = values[0][0].TOTAL;
        var numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

        for (var i = 0; i < numberOfPages; i++) {
            pageList.push({
                url: `${url}?page=${i + 1}`,
                isCurPage: (i + 1) === +page,
                val: i + 1
            });
        }

        var prevPage = {
            url: `${url}?page=${+page - 1}`,
            isOK: 1 !== +page
        }

        var nextPage = {
            url: `${url}?page=${+page + 1}`,
            isOK: numberOfPages !== +page
        }

        res.render('admin_product_management', {
            layout: 'admin_layout',
            products: values[1],
            pages: pageList,
            prevPage,
            nextPage
        });
    });
});

router.get('/type_manage', admin_restrict, function (req, res, next) {
    var page = req.query.page;
    var url = '/admin' + req.url;

    if (url.lastIndexOf('?page') != -1)
        url = url.substr(0, url.lastIndexOf('?page'));

    if (!page) {
        page = 1;
    }

    page = +page;
    var offSet = (page - 1);

    var pageList = [];

    Promise.all([typeRepo.countAll(), typeRepo.loadByOffSetWithUsingProduct(offSet)]).then(values => {
        var numberic = page * config.appConfig.TYPES_PER_TABLE - config.appConfig.TYPES_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            numberic++;
        }

        var total = values[0][0].TOTAL;
        var numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

        for (var i = 0; i < numberOfPages; i++) {
            pageList.push({
                url: `${url}?page=${i + 1}`,
                isCurPage: (i + 1) === +page,
                val: i + 1
            });
        }

        var prevPage = {
            url: `${url}?page=${+page - 1}`,
            isOK: 1 !== +page
        }

        var nextPage = {
            url: `${url}?page=${+page + 1}`,
            isOK: numberOfPages !== +page
        }

        res.render('admin_type_management', {
            layout: 'admin_layout',
            types: values[1],
            pages: pageList,
            nextPage,
            prevPage
        });
    });
});

//rout for manu management page
router.get('/manufacturer_manage', admin_restrict, function (req, res, next) {
    var page = req.query.page;
    var url = '/admin' + req.url;

    if (url.lastIndexOf('?page') != -1)
        url = url.substr(0, url.lastIndexOf('?page'));

    if (!page) {
        page = 1;
    }

    page = +page;
    var offSet = (page - 1);

    var pageList = [];

    Promise.all([manuRepo.countAll(), manuRepo.loadByOffSetWithUsingProduct(offSet)]).then(values => {
        var numberic = page * config.appConfig.MANUFACTURERS_PER_TABLE - config.appConfig.MANUFACTURERS_PER_TABLE + 1;
        for (var i = 0; i < values[1].length; i++) {
            values[1][i]['numberic'] = numberic;
            numberic++;
        }

        var total = values[0][0].TOTAL;
        var numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

        for (var i = 0; i < numberOfPages; i++) {
            pageList.push({
                url: `${url}?page=${i + 1}`,
                isCurPage: (i + 1) === +page,
                val: i + 1
            });
        }

        var prevPage = {
            url: `${url}?page=${+page - 1}`,
            isOK: 1 !== +page
        }

        var nextPage = {
            url: `${url}?page=${+page + 1}`,
            isOK: numberOfPages !== +page
        }

        res.render('admin_manufacturer_management', {
            layout: 'admin_layout',
            manus: values[1],
            pages: pageList,
            nextPage,
            prevPage
        });
    });
});
//rout for add manufac
router.post('/manufacturer_manage/add', admin_restrict, (req, res) => {

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
        } else {
            var vm = {
                feedback: 'Nhà xuất bản đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});
//rout for edit manu
router.post('/manufacturer_manage/edit', admin_restrict, (req, res) => {
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
        } else {
            var vm = {
                feedback: 'Nhà xuất bản đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});

//rout for delete manu
router.post('/manufacturer_manage/delete', admin_restrict, (req, res) => {
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
router.post('/type_manage/add', admin_restrict, (req, res) => {

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
        } else {
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
router.post('/type_manage/edit', admin_restrict, (req, res) => {
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
        } else {
            var vm = {
                feedback: 'Loại sản phẩm đã tồn tại',
                isSuccess: false
            }
            res.send(vm);
        }
    });
});

//rout for delete type
router.post('/type_manage/delete', admin_restrict, (req, res) => {
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
router.post('/product_manage/upload', admin_restrict, (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            err.name = '';
            console.log(err.toString());

            var vm = {
                feedback: err.toString(),
                isSuccess: false
            };
            res.send(vm)
        } else {
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
                } else {
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
    });
});

//rout for edit product
router.post('/product_manage/edit', admin_restrict, (req, res, next) => {
    uploadEdit(req, res, function (err) {
        if (err) {
            err.name = '';
            console.log(err.toString());

            var vm = {
                feedback: err.toString(),
                isSuccess: false
            };
            res.send(vm)
        } else {
            authorRepo.isExist(req.body.author).then(result => {
                console.log(result[0].result);

                if (result[0].result == 0) {
                    authorRepo.getMaxId().then(maxId => {
                        var newAuthorId = parseInt(maxId[0].maxId) + 1;
                        console.log(newAuthorId);
                        authorRepo.add(newAuthorId, req.body.author).then(result => {
                            productRepo.updateProduct(req.body.productIdToEdit, req.body.product_name,
                                req.body.decription, req.body.price,
                                req.body.product_type, req.body.product_manu,
                                newAuthorId, req.body.publish_date,
                                req.body.in_stock, req.body.import_price).then(result => {
                                var vm = {
                                    feedback: "Cập nhật sản phẩm thành công",
                                    isSuccess: true
                                }
                                res.send(vm)
                            }).catch(err => {
                                console.log("Error occurs when UPDATE PRODUCT , err:" + err);
                                var vm = {
                                    feedback: "Lỗi khi cập nhật sản phẩm",
                                    isSuccess: false
                                }
                                res.send(vm)
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
                } else {
                    var existedAuthorID = parseInt(result[0].id);
                    productRepo.updateProduct(req.body.productIdToEdit, req.body.product_name,
                        req.body.decription, req.body.price,
                        req.body.product_type, req.body.product_manu,
                        existedAuthorID, req.body.publish_date,
                        req.body.in_stock, req.body.import_price).then(result => {
                        console.log(result[0]);

                        var vm = {
                            feedback: "Cập nhật sản phẩm thành công",
                            isSuccess: true
                        }
                        res.send(vm)
                    }).catch(err => {
                        console.log("Error occurs when UPDATE PRODUCT , err:" + err);
                        var vm = {
                            feedback: "Lỗi khi cập nhật sản phẩm",
                            isSuccess: false
                        }
                        res.send(vm)
                    });

                }
            });

        }
    });
});

//rout for delete product
router.post('/product_manage/delete', admin_restrict, (req, res, next) => {
    var productIdToDelete = req.body.productIdToDelete;
    console.log(req.body);

    productRepo.delete(productIdToDelete).then(result => {
        var vm = {
            feedback: "Xóa sản phẩm thành công",
            isSuccess: true
        }
        res.send(vm)
    }).catch(err => {
        console.log("Error occurs when DELETE PRODUCT , err:" + err);
        var vm = {
            feedback: "Lỗi khi xóa sản phẩm",
            isSuccess: false
        }
        res.send(vm)
    });
});

router.get('/login', restrict_logged, restrict_admin_logged, (req, res) => {
    res.render('admin/login');
});

router.post('/login', restrict_logged, restrict_admin_logged, (req, res) => {
    recaptcha.verify(req, function (error, data) {
        if (!error) {
            var user = {
                username: req.body.username,
                password: SHA256(req.body.password + req.body.username).toString()
            };

            adminRepo.login(user).then(rows => {
                if (rows.length > 0) {
                    req.session.isAdmin = true;
                    req.session.user = rows[0];

                    res.redirect('/admin');
                } else {
                    res.render('admin/login', {
                        isError: true,
                        isErrorCaptcha: false,
                        username: req.body.username
                    });
                }
            });
        } else {
            res.render('admin/login', {
                isError: false,
                isErrorCaptcha: true,
                username: req.body.username
            });
        }
    });
});

router.post('/logout', admin_restrict, (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.isAdmin = false;

    res.redirect('/');
});

module.exports = router;