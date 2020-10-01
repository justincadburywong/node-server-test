var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const serveStatic = require('serve-static');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const setCustomCacheControl = (res, path) => {
  // if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0')
  // }
}

app.use(serveStatic(path.join(__dirname, 'public'), {
  setHeaders: setCustomCacheControl
}));

// app.get('/*', function (req, res, next) {
//
//   if (req.url.indexOf("/images/") === 0 || req.url.indexOf("/stylesheets/") === 0) {
//     res.setHeader("Cache-Control", "public, max-age=601");
//     res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
//   }
//   next();
// });

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
