var typeRepo = require('../database/repos/typeRepo.js');
var manufacturerRepo = require('../database/repos/manufacturerRepo.js');

module.exports = (req, res, next) => {
      if (req.session.isLogged === undefined) {
            req.session.isLogged = false;
      }

      Promise.all([typeRepo.loadAll(), manufacturerRepo.loadAll()]).then(values => {
            res.locals.layoutVM = {
                  type: values[0],
                  manufacturer: values[1],
                  isLogged: req.session.isLogged,
                  curUser: req.session.user
            };

            next();
      });
}