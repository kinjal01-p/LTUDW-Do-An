var express = require('express');
var router = express.Router();

var shipRepo = require('../database/repos/shipRepo.js');

var email = 'test@gmail.com'

router.get('/', function (req, res, next) {

    shipRepo.shipInfo(email).then(value => {
        //svar total = value.reduce((sum, ele) => sum + (ele.amount * ele.price), 0);

        var info = {
            id_order: value[0].id_product_order,
            time: value[0].publish_date
        }

        res.render('history', {
            orderInfo: info,
            orders: value
        })


    });

});

module.exports = router;
