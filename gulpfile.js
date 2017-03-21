var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    minify = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    allTask = ['stylus', 'jade', 'js', 'watch', 'browser-sync'];

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

gulp.task('stylus', function(){
  gulp.src('src/stylus/*')
      .pipe(stylus())
      .pipe(concat('app.min.css'))
      .pipe(minify())
      .pipe(gulp.dest('public/css'))
});

gulp.task('jade', function(){
  gulp.src('src/jade/*')
      .pipe(jade())
      .pipe(gulp.dest('public/'))
});

gulp.task('watch', function(){
  gulp.watch('./src/stylus/*', ['stylus']);
  gulp.watch('./src/jade/*', ['jade']);
  gulp.watch('./src/vendor/js/*', ['vendorJs']);
  gulp.watch('./src/js/*', ['js']);
  gulp.watch('.src/vendor/css/*', ['vendorCss']);
})

gulp.task('browser-sync', function(){
  browserSync.init({
    server:{
      baseDir: 'public/'
    }
  })
});

gulp.task('js', function(){
  gulp.src(['src/js/_*','src/js/*'])
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js/'))
})
gulp.task('vendorJs', function(){
  gulp.src('src/vendor/js/*')
      .pipe(concat('vendor.min.js'))
      .pipe(gulp.dest('public/js/vendor'));

});

gulp.task('vendorCss', function(){
    gulp.src('src/vendor/css/*')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/css'));
})

gulp.task('default', allTask);

module.exports = app;
