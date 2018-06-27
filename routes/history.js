var express = require('express');
var router = express.Router();
var orderRepo = require('../database/repos/orderRepo.js');

router.get('/', (req, res) => {
    orderRepo.loadByClient(req.session.user.email).then(rows => {
        console.log(rows);
        res.render('history', {orders: rows});
    });
});

module.exports = router;
