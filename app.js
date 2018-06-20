var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var wnumb = require('wnumb');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var config = require('./config/config.js');

var handle_layout = require('./middle-wares/handle_layout.js');
var restrict = require('./middle-wares/restrict');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  layoutsDir: 'views/layouts/',
  helpers: {
    section: express_handlebars_sections(),
    
    number_format: n => {
      var nf = wnumb({
        thousand: ','
      });
      return nf.to(n);
    },

    block: function (name) {
      var blocks = this._blocks,
        content = blocks && blocks[name];

      return content ? content.join('\n') : null;
    },

    contentFor: function (name, options) {
      var blocks = this._blocks || (this._blocks = {}),
        block = blocks[name] || (blocks[name] = []);

      block.push(options.fn(this));
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
var sessionStore = new MySQLStore(config.mysqlSessionConfig);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
//

// handle layout
app.use(handle_layout);
//

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;