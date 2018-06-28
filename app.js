var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var wnumb = require('wnumb');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var bodyParser = require('body-parser')

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var config = require('./config/config.js');

var handle_layout = require('./middle-wares/handle_layout.js');
var restrict = require('./middle-wares/restrict.js');
var restrict_checkout = require('./middle-wares/restrict_check_out.js');
var restrict_admin_logged = require('./middle-wares/restrict_admin_logged.js');

var indexRouter = require('./routes/index');
var detailsRouter = require('./routes/details_product');
var cartRouter = require('./routes/cart.js');
var searchRouter = require('./routes/search.js');
var productsRouter = require('./routes/list_product.js');
var accountRouter = require('./routes/account.js');
var checkoutRouter = require('./routes/check_out.js');
var history = require('./routes/history.js');

var adminRouter = require('./routes/admin');
var app = express();

const order_status_str = ['Chưa giao', 'Đang giao', 'Đã giao', 'Đã huỷ'];

// view engine setup
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  layoutsDir: 'views/layouts/',
  helpers: {
    section: express_handlebars_sections(),

    date_format: date => {
      var dob = new Date(date);
      //dob.setTime(dob.getTime() + (24 * 60 * 60 * 1000));
      return moment(dob, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD');
    },

    order_status: n => {
      var number = +n;
      return order_status_str[number];
    },

    date_time_format: date => {
      var dob = new Date(date);
      return moment(dob, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD HH:mm:ss');
    },

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

app.enable('view cache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.use('/admin', adminRouter);
app.use(restrict_admin_logged);

app.use('/', indexRouter);
app.use('/details', detailsRouter);
app.use('/search', searchRouter);
app.use('/cart', restrict, cartRouter);
app.use('/products', productsRouter);
app.use('/account', accountRouter);
app.use('/check_out', restrict_checkout, checkoutRouter);
app.use('/history', restrict, history);

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