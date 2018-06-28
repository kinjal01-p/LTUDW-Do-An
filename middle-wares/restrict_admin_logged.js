module.exports = (req, res, next) => {
      if (req.session.isAdmin === false) {
            next();
      } else {
            //res.redirect(`/account/login?retUrl=${req.originalUrl}`);
            res.redirect('/admin');
      }
}