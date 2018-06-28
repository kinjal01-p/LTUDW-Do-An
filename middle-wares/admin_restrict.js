module.exports = (req, res, next) => {
      if (req.session.isAdmin === true) {
            next();
      } else {
            //res.redirect(`/account/login?retUrl=${req.originalUrl}`);
            res.redirect('/');
      }
}