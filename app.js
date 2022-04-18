const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routers = {
  index: require('./routes/index'),
  users: require('./routes/users'),
  posts: require('./routes/posts'),
  reviews: require('./routes/reviews')
};

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers.index);
app.use('/users', routers.users);
app.use('/posts', routers.posts);
app.use('/posts/:post/reviews', routers.reviews);

// catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use((error, request, response, next) => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  // render the error page
  response.status(err.status || 500);
  response.render('error');
});

module.exports = app;
