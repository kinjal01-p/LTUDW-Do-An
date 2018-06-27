var express = require('express');
var accountRepo = require('../database/repos/accountRepo.js');
var SHA256 = require('crypto-js/sha256');
var router = express.Router();
var moment = require('moment');

var retrict_logged = require('../middle-wares/restrict_logged.js');
var retrict = require('../middle-wares/restrict.js');

router.get('/register', retrict_logged, (req, res) => {
      res.render('account_register', {isError: false, isNotMatch: false, name: "", email: "", address: "", phone: "", dob: ""});
});

router.post('/register', (req, res) => {
      var user = {
            password: SHA256(req.body.password + req.body.email).toString(),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            dob: moment(req.body.dob, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm')
      };

      if (req.body.password != req.body.repassword) {
            res.render('account_register', {isError: false, isNotMatch: true, name: req.body.name, email: req.body.email, address: req.body.address, phone: req.body.phone, dob: req.body.dob});
      }
      else {
            accountRepo.add(user).then(value => {
                  res.redirect(req.headers.referer);
            }).catch(error => {
                  res.render('account_register', {isError: true, isNotMatch: false, name: req.body.name, email: req.body.email, address: req.body.address, phone: req.body.phone, dob: req.body.dob});
            });
      }
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
      });
});

router.post('/logout', (req, res) => {
      req.session.isLogged = false;
      req.session.user = null;

      res.redirect(req.headers.referer);
});

router.post('/edit', retrict, (req, res) => {
      if (req.body.changePassword !== undefined) {
            var user = {
                  email: req.body.email,
                  password: SHA256(req.body.oldpassword + req.body.email).toString()
            };

            accountRepo.login(user).then(rows => {
                  if (rows.length <= 0) {
                        res.render('account_profile', {newError: false, oldError: true});
                        return;
                  } else {
                        if (req.body.newpassword != req.body.repassword) {
                              res.render('account_profile', {newError: true, oldError: false});
                              return;
                        } else {
                              user.password = SHA256(req.body.newpassword + req.body.email).toString();
                              accountRepo.changePassword(user).then();
                        }
                  }
            });
      }

      // var user = {
      //       password: SHA256(req.body.password + req.body.email).toString(),
      //       name: req.body.name,
      //       email: req.body.email,
      //       address: req.body.address,
      //       phone: req.body.phone,
      //       dob: moment(req.body.dob, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm')
      // };

      res.redirect(req.headers.referer);
});

router.get('/profile', retrict, (req, res) => {
      res.render('account_profile', {newError: false, oldError: false});
});

module.exports = router;