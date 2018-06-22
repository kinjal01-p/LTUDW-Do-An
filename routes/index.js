var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var router = express.Router();

// Demo data
var top_ten = [{
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  },
  {
    name: "7 Thoi quen...",
    id_product: 1,
    price: 60000
  },
  {
    name: "Dam nghi lon...",
    id_product: 2,
    price: 60000
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  Promise.all([productRepo.top_new(), productRepo.top_sale(), productRepo.top_viewed()]).then(values => {
    //console.log(values[0]);
    //console.log(values[1]);

    res.render('index', {
      title: 'Book store',
      top_new: values[0],
      top_sale: values[1],
      top_viewed: values[2],
      products: top_ten
    });
  });
});

module.exports = router;