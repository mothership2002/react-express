var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
const { runInNewContext } = require('vm');

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(logger(':remote-addr'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var conn = require('./module/connection');
const sql = require('./module/sql');
conn.connectionPoolInit();

app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: 'key',
}))

// app.use('/api/post-all/:page?', async (req, resp, next) => {
//   console.log(1);
//   const count = await conn.getRowResult(sql.selectPostCount());
//   console.log(count);
//   next();
// }); 앱레벨 


module.exports = app;
