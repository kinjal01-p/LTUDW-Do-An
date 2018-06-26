module.exports = (req, res, next) => {
      if (req.session.isLogged === false) {
            next();
      } else {
            //res.redirect(`/account/login?retUrl=${req.originalUrl}`);
            res.redirect('/');
      }
}