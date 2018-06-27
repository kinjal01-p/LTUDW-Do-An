module.exports = (req, res, next) => {
      if (req.session.isLogged === true && req.session.cart.length > 0) {
            next();
      } else {
            //res.redirect(`/account/login?retUrl=${req.originalUrl}`);
            res.redirect('/');
      }
}