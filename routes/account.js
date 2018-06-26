var express = require('express');
var accountRepo = require('../database/repos/accountRepo.js');
var SHA256 = require('crypto-js/sha256');
var router = express.Router();

var retrict_logged = require('../middle-wares/restrict_logged.js');

router.get('/register', retrict_logged, (req, res) => {
      res.render('account_register', {isError: false, name: "", email: "", address: ""});
});

router.post('/register', (req, res) => {
      var user = {
            password: SHA256(req.body.password + req.body.email).toString(),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
      };
      
      accountRepo.add(user).then(value => {
            res.redirect('/');
      }).catch(error => {
            res.render('account_register', {isError: true, name: req.body.name, email: req.body.email, address: req.body.address});
      });
});

router.post('/login', (req, res) => {
      var user = {
            email: req.body.email,
            password: SHA256(req.body.password + req.body.email).toString()
      };

      accountRepo.login(user).then(rows => {
            if (rows.length > 0) {
                  req.session.isLogged = true;
                  req.session.user = rows[0];
                  req.session.cart = [];

                  res.redirect('/');
            } else {
                  res.render('account_login', {isError: true, email: req.body.email});
            }
      })
});

router.post('/logout', (req, res) => {
      req.session.isLogged = false;
      req.session.user = null;

      res.redirect('/');
});

module.exports = router;