let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let forgotRouter = require('./routes/forgot-password');
let tablesRouter = require('./routes/tables');
let rentalRouter = require('./routes/rentals');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':remote-addr [:date[web]] :method :url :status - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tables', tablesRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/rentals', rentalRouter);
app.use('/forgot-password', forgotRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404), {title: '404 Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404error');
});

module.exports = app;
