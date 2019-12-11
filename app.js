let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':remote-addr [:date[web]] :method :url :status - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes for rendering
let indexRouter = require('./src/routes/index.route');
let forgotRouter = require('./src/routes/forgot-password.route');
let tablesRouter = require('./src/routes/tables.route');
let rentalRouter = require('./src/routes/rentals.route');
let usersRouter = require('./src/routes/users.route');

app.use('/', indexRouter);
app.use('/tables', tablesRouter);
app.use('/rentals', rentalRouter);
app.use('/forgot-password', forgotRouter);

// API routes
let users_api = require('./src/api/v3/routes/users.api.route');
let rentals_api = require('./src/api/v3/routes/rentals.api.route');
let equipment_api = require('./src/api/v3/routes/equipment.api.route');
app.use('/api/v3/users', users_api);
app.use('/api/v3/rentals', rentals_api);
app.use('/api/v3/equipment', equipment_api);

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
