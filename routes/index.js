var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var router = express.Router();

router.get('/', function (req, res, next) {

  Promise.all([productRepo.top_new(), productRepo.top_sale(), productRepo.top_viewed(), productRepo.getSamples()]).then(values => {

    res.render('index', {
      title: 'Book store',
      top_new: values[0],
      top_sale: values[1],
      top_viewed: values[2],
      products: values[3]
    });
  });
});

module.exports = router;