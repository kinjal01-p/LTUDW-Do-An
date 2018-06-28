var express = require('express');
var accountRepo = require('../database/repos/accountRepo.js');
var SHA256 = require('crypto-js/sha256');
var router = express.Router();
var moment = require('moment');

var retrict_logged = require('../middle-wares/restrict_logged.js');
var retrict = require('../middle-wares/restrict.js');

var config = require('../config/config.js');

const Recaptcha = require('express-recaptcha').Recaptcha
const recaptcha = new Recaptcha(config.captchaConfig.RECAPTCHA_SITE_KEY, config.captchaConfig.RECAPTCHA_SECRET_KEY);

router.get('/register', retrict_logged, (req, res) => {
      res.render('account_register', {
            isError: false,
            isNotMatch: false,
            isErrorCaptcha: false,
            name: "",
            email: "",
            address: "",
            phone: "",
            dob: ""
      });
});

router.post('/register', (req, res) => {
      recaptcha.verify(req, function (error, data) {
            if (!error) {
                  var user = {
                        password: SHA256(req.body.password + req.body.email).toString(),
                        name: req.body.name,
                        email: req.body.email,
                        address: req.body.address,
                        phone: req.body.phone,
                        dob: moment(req.body.dob, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm')
                  };

                  if (req.body.password != req.body.repassword) {
                        res.render('account_register', {
                              isError: false,
                              isNotMatch: true,
                              isErrorCaptcha: false,
                              name: req.body.name,
                              email: req.body.email,
                              address: req.body.address,
                              phone: req.body.phone,
                              dob: req.body.dob
                        });
                  } else {
                        accountRepo.add(user).then(value => {
                              accountRepo.login(user).then(rows => {
                                    if (rows.length > 0) {
                                          req.session.isLogged = true;
                                          req.session.user = rows[0];
                                          req.session.cart = [];

                                          res.redirect('/');
                                    } else {
                                          res.redirect(req.headers.referer);
                                    }
                              });
                        }).catch(error => {
                              res.render('account_register', {
                                    isError: true,
                                    isNotMatch: false,
                                    isErrorCaptcha: false,
                                    name: req.body.name,
                                    email: req.body.email,
                                    address: req.body.address,
                                    phone: req.body.phone,
                                    dob: req.body.dob
                              });
                        });
                  }
            } else {
                  //error code
                  res.render('account_register', {
                        isError: false,
                        isNotMatch: false,
                        isErrorCaptcha: true,
                        name: req.body.name,
                        email: req.body.email,
                        address: req.body.address,
                        phone: req.body.phone,
                        dob: req.body.dob
                  });
            }
      });
});

router.post('/login', (req, res) => {
      recaptcha.verify(req, function (error, data) {
            if (!error) {
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
                              res.render('account_login', {
                                    isError: true,
                                    isErrorCaptcha: false,
                                    email: req.body.email
                              });
                        }
                  });
            } else {
                  res.render('account_login', {
                        isError: false,
                        isErrorCaptcha: true,
                        email: req.body.email
                  });
            }
      });
});

router.post('/logout', (req, res) => {
      req.session.isLogged = false;
      req.session.user = null;
      req.session.isAdmin = false;
      req.session.admin = null;

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
                        res.render('account_profile', {
                              newError: false,
                              oldError: true
                        });
                  } else {
                        if (req.body.newpassword != req.body.repassword) {
                              res.render('account_profile', {
                                    newError: true,
                                    oldError: false
                              });
                        } else {
                              user.password = SHA256(req.body.newpassword + req.body.email).toString();
                              accountRepo.changePassword(user).then(values => {
                                    var user = {
                                          name: req.body.name,
                                          email: req.body.email,
                                          address: req.body.address,
                                          phone: req.body.phone,
                                          dob: moment(req.body.dob, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm')
                                    };

                                    accountRepo.editProfile(user).then(values => {
                                          req.session.isLogged = false;
                                          req.session.user = null;
                                          res.redirect('/');
                                    });
                              });
                        }
                  }
            });
      } else {
            var user = {
                  name: req.body.name,
                  email: req.body.email,
                  address: req.body.address,
                  phone: req.body.phone,
                  dob: moment(req.body.dob, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm')
            };

            accountRepo.editProfile(user).then(values => {
                  accountRepo.login(req.session.user).then(rows => {
                        if (rows.length > 0) {
                              req.session.user = rows[0];
                              res.redirect('/account/profile');
                        }
                  });
            });
      }
});

router.get('/profile', retrict, (req, res) => {
      res.render('account_profile', {
            newError: false,
            oldError: false
      });
});

module.exports = router;