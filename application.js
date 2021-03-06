var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var surveyRoutes = require('./routes/survey');
var adminRoutes = require('./routes/admin');
var responseRoutes = require('./routes/response');

var app = express();
// mongoose.connect('mongodb://localhost/qwkio_mean', {
  mongoose.connect('mongodb://qwkioadmin:ilovemandy123@ds135444.mlab.com:35444/qwkio', {
  useMongoClient: true
}) // create a mongodb database on the fly


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// handle req with specific route first before more generic routes.
app.use('/admin', adminRoutes);
app.use('/survey', surveyRoutes); 
app.use('/response', responseRoutes); 
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

// var server = app.listen(4200, function() {
//     console.log('Ready on port %d', server.address().port);
// });

module.exports = app;
