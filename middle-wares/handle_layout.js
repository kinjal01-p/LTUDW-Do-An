var typeRepo = require('../database/repos/typeRepo.js');
var manufacturerRepo = require('../database/repos/manufacturerRepo.js');
var config = require('../config/config.js');

const Recaptcha = require('express-recaptcha').Recaptcha
const recaptcha = new Recaptcha(config.captchaConfig.RECAPTCHA_SITE_KEY, config.captchaConfig.RECAPTCHA_SECRET_KEY);

module.exports = (req, res, next) => {
      if (req.session.isLogged === undefined) {
            req.session.isLogged = false;
      }

      if (req.session.isAdmin === undefined) {
            req.session.isAdmin = false;
      }

      var totalInCart = 0;

      if (req.session.cart !== undefined) {
            for (var i = 0; i < req.session.cart.length; i++) {
                  totalInCart += +req.session.cart[i].amount;
            }
      }

      Promise.all([typeRepo.loadAll(), manufacturerRepo.loadAll()]).then(values => {
            res.locals.layoutVM = {
                  type: values[0],
                  manufacturer: values[1],
                  isLogged: req.session.isLogged,
                  curUser: req.session.user,
                  countCart: totalInCart,
                  captcha: recaptcha.render()
            };

            next();
      });
}