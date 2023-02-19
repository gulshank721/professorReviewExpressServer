var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./config');
// var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviewsRouter');
const { default: mongoose } = require('mongoose');

var app = express();

//connection string 
// const url = 'mongodb://localhost:27017/conFusion'; 
//instead of local database we here connect to cloud mongodb which atlas
const url = config.mongoUrl;
// const dotenv =require('dotenv') ;
// dotenv.config();
// const url = process.env.MONGO_URL;

// mongoose.Promise = global.Promise;
const connect = mongoose.connect(url,{
   useNewUrlParser: true, useUnifiedTopology: true
  //  useCreateIndex:true
   
});   //getting connect
connect.then((db) => {    //handling responce after connection either success or failure
    console.log("Connected correctly to MongoDB");
    // console.log(db);
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

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

module.exports = app;
