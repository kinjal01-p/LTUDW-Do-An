var express = require('express');
var router = express.Router();
var productRepo = require('../database/repos/productRepo.js');
var orderRepo = require('../database/repos/orderRepo.js');
var moment = require('moment');

router.get('/', (req, res) => {
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

            res.render('check_out', {
                  title: 'Check Out',
                  products: items,
                  total: total,
                  client: req.session.user
            });
      });
});

router.post('/', (req, res) => {
      if (req.session.cart.length > 0) {
            var arr_promise = [];

            for (var i = 0; i < req.session.cart.length; i++) {
                  var cartItem = req.session.cart[i];

                  var promise = productRepo.single(cartItem.id_product);
                  arr_promise.push(promise);
            }

            var arr_update_amount = [];
            for (var i = 0; i < req.session.cart.length; i++) {
                  var cartItem = req.session.cart[i];

                  var promise = productRepo.updateAmount(cartItem.id_product, cartItem.amount);
                  arr_update_amount.push(promise);
            }

            Promise.all(arr_update_amount).then(result => {});

            var items = [];
            var total = 0;
            Promise.all(arr_promise).then(result => {
                  for (var i = result.length - 1; i >= 0; i--) {
                        var product = result[i][0];

                        var item = {
                              id_product: product.id_product,
                              price: +product.price,
                              amount: req.session.cart[i].amount
                        }

                        total += +product.price * +item.amount;
                        items.push(item);
                  }

                  var info = {
                        place_day: moment().format('YYYY-MM-DDTHH:mm'),
                        total_price: total,
                        email: req.session.user.email
                  };

                  orderRepo.createOrder(info).then(value => {
                        var id_order = value.insertId;

                        arr_promise = [];

                        for (var i = 0; i < items.length; i++) {
                              var item = {
                                    id_product: items[i].id_product,
                                    price: items[i].price,
                                    amount: items[i].amount,
                                    id_order: id_order
                              };

                              var promise = orderRepo.addItem2Order(item);
                              arr_promise.push(promise);
                        }

                        Promise.all(arr_promise).then(rows => {
                              req.session.cart = [];
                              res.redirect('/');
                        });
                  });
            });
      } else {
            res.redirect(req.headers.referer);
      }
});

module.exports = router;