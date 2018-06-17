var express = require('express');
var router = express.Router();

// Demo data
var manufactorers = [
  {
    name: "NXB Kim Dong",
    count: 1000
  }, 
  {
    name: "NXB Tre",
    count: 2123
  }
]

var type_books = [
  {
    name: "Trinh tham",
    count: 1213
  }, 
  {
    name: "Van hoc",
    count: 1231,
  }
]

var top_ten = [
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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book store',  manufactorer: manufactorers, type_book: type_books, top_new: top_ten, top_sale: top_ten, top_viewed: top_ten, products: top_ten});
});

module.exports = router;
