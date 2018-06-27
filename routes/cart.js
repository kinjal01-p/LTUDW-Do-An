var express = require('express');
var router = express.Router();
var cartRepo = require('../database/repos/cartRepo.js');

router.get('/cart', function (req, res) {
    
});

router.post('/add', function (req, res) {
    var item = {
        id_product: req.body.id_product,
        amount: +req.body.amount
    }

    cartRepo.add(req.session.cart, item);
    console.log(req.session.cart);
    res.redirect(req.headers.referer);
});

router.post('/remove', function (req, res) {
    cartRepo.remove(req.session.cart, req.body.id_product);
    res.redirect(req.headers.referer);
});

module.exports = router;