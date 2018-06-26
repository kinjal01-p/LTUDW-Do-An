var express = require('express');
var router = express.Router();

var shipRepo = require('../database/repos/shipRepo.js');
var accountRepo = require('../database/repos/accountRepo.js');

var email = 'test@gmail.com';

router.get('/', function (req, res, next) {

    Promise.all([accountRepo.clientInfo(email), shipRepo.shipInfo(email)]).then(rows => {
        
        var total = rows[1].reduce((sum , ele) => sum + (ele.amount * ele.price) , 0);
        
        res.render('shipping', {
            client : rows[0],
            products: rows[1],
            total
        })


    });



});

module.exports = router;