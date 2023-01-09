var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
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
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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


var conn = require('./module/connection');
conn.connectionPoolInit();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secure: ture,	                        // https 환경에서만 session 정보를 주고받도록처리
  secret: process.env.COOKIE_SECRET,    // 암호화하는 데 쓰일 키
  resave: false,                        // 세션을 언제나 저장할지 설정함
  saveUninitialized: true,              // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: {	                            //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true,                     // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: true
  },
  name: 'session-cookie'                // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
}));


module.exports = app;
