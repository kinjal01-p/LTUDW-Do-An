var express = require('express');
var router = express.Router();
var cartRepo = require('../database/repos/cartRepo.js');
var productRepo = require('../database/repos/productRepo.js');

router.get('/', function (req, res) {
    var arr_promise = [];

    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];

        var promise = productRepo.single(cartItem.id_product);
        arr_promise.push(promise);
    }

    var items = [];
    var total = 0;
    Promise.all(arr_promise).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var product = result[i][0];

            var item = {
                product: product,
                amount: req.session.cart[i].amount
            }

            total += +product.price * +item.amount;

            items.push(item);
        }

        //console.log(items);

        res.render('cart_page', {
            title: 'Cart',
            products: items,
            total: total
        });
    });
});

router.post('/add', function (req, res) {
    var item = {
        id_product: req.body.id_product,
        amount: +req.body.amount
    };

    var amountAfter = amountActual(req.session.cart, item);
    productRepo.checkInStock(item.id_product, amountAfter).then(rows => {
        if (rows[0].isOK) {
            cartRepo.add(req.session.cart, item);
            res.redirect(req.headers.referer);
        } else {
            res.send({
                feedback: "Lỗi! Sản phẩm này không có đủ số lượng mà quý khách yêu cầu."
            });
        }
    });
});

router.post('/edit', function (req, res) {
    var item = {
        id_product: req.body.id_product,
        amount: +req.body.amount
    };

    if (cartRepo.checkExist(req.session.cart, item.id_product) == false) {
        res.send({
            feedback: "Lỗi! Sản phẩm không nằm trong giỏ hàng để cập nhật."
        });
    } else {
        productRepo.checkInStock(item.id_product, item.amount).then(rows => {
            if (rows[0].isOK) {
                cartRepo.edit(req.session.cart, item);
                res.redirect(req.headers.referer);
            } else {
                res.send({
                    feedback: "Lỗi! Sản phẩm này không có đủ số lượng mà quý khách yêu cầu."
                });
            }
        });
    }
});

router.post('/remove', function (req, res) {
    cartRepo.remove(req.session.cart, req.body.id_product);
    res.redirect(req.headers.referer);
});

module.exports = router;