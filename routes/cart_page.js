var express = require('express');
var router = express.Router();


var cartRepo = require('../database/repos/cartRepo.js');


router.get('/cart', function (req, res, next) {

      cartRepo.cart('2001').then(rows => {
          res.render('cart_page', {
              title: "Cart",
              products: rows
          });
      }).catch(
          function (reason) {
              console.log('Handle rejected promise (' + reason + ') here.');
          });
    
});

router.post('/add', function (req, res, next) {
   
    let order = {
        id_product: req.session.id_product,
        amount: req.body.amount
    }
     
    cartRepo.add_cart('2001', order.id_product, order.amount).then(rows => {
      
        console.log('successfully !');   
    }).catch(
        function (reason) {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
   
});

module.exports = router;
