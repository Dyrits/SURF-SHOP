const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const mongoose = require('./database/mongoose');


const routers = {
  index: require('./routes/index'),
  users: require('./routes/users'),
  posts: require('./routes/posts'),
  reviews: require('./routes/reviews')
};

const User = require('./models/user');

const app = express();

mongoose.connect();
mongoose.database.on('error', console.error.bind(console, 'Connection error:'));
mongoose.database.once('open', () => {
    console.log('Connected to MongoDB!');
});


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares:
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration:
app.use(session({
    secret: '#SECRET#',
    resave: false,
    saveUninitialized: true,
}));

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount routes
app.use('/', routers.index);
app.use('/users', routers.users);
app.use('/posts', routers.posts);
app.use('/posts/:post/reviews', routers.reviews);

// Catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// Error handler
app.use((error, request, response, next) => {
  // Set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  // Render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
