var express = require('express');
var router = express.Router();
var orderRepo = require('../database/repos/orderRepo.js');
var productRepo = require('../database/repos/productRepo.js');

router.get('/', (req, res) => {
    orderRepo.loadByClient(req.session.user.email).then(rows => {
        res.render('history', {
            orders: rows
        });
    });
});

router.get('/:id_order', (req, res) => {
    var id_order = req.params.id_order;

    orderRepo.singleWithClient(id_order, req.session.user.email).then(rows => {
        if (rows.length > 0) {
            Promise.all([orderRepo.single(id_order), orderRepo.loadItemsOrder(id_order)]).then(values => {
                var arr_promise = [];

                for (var i = 0; i < values[1].length; i++) {
                    var promise = productRepo.single(values[1][i].id_product);
                    arr_promise.push(promise);
                }

                var items = [];
                Promise.all(arr_promise).then(result => {
                    for (var i = result.length - 1; i >= 0; i--) {
                        var product = result[i][0];

                        var item = {
                            product: product,
                            amount: values[1][i].amount,
                            price: values[1][i].price
                        }
                        items.push(item);
                    }

                    res.render('details_order', {
                        order: values[0][0],
                        products: items
                    });
                });
            });
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;