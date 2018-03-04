var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var user = require('./routes/user.route');
var getRoom = require('./routes/room.route');
var joinRoom = require('./routes/room-join.route');
var leaveRoom = require('./routes/room-leave.route');
var startRoom = require('./routes/room-start.route');
var biedRoom = require('./routes/room-bied.route');
var passRoom = require('./routes/room-pass.route');
var partnerRoom = require('./routes/room-partner.route');
var startGame = require('./routes/room-start-game.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const basePath = '/api/v1';
app.use(basePath, user);
app.use(basePath, getRoom);
app.use(basePath, joinRoom);
app.use(basePath, leaveRoom);
app.use(basePath, startRoom);
app.use(basePath, biedRoom);
app.use(basePath, passRoom);
app.use(basePath, partnerRoom);
app.use(basePath, startGame);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../vrikken-ui/dist')));
}else{
  var proxy = require('express-http-proxy');
  app.use(proxy('localhost:4200'))
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
