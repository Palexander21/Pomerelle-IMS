require('./src/models/Users');
require('./src/models/Equipment');
require('./src/models/Customers');
require('./src/models/OpenRentals');
require('./src/models/Rentals');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let uuid = require('uid-safe');
require('dotenv').config();
let node_acl,
    db;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':remote-addr [:date[web]] :method :url :status - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
        node_acl = require('./src/config/security');
        // node_acl.whatResources('admin', (err, res) => {
        //     console.log(res)
        // })
    })
    .catch(err => {
        console.error(`Failed to connect to mongo database: ${err.message}`);
    });

db = mongoose.connection;
app.use(session({
    // genid: function(req) {
    //     return uuid(18)
    // },
    secret: process.env.SECRET,
    resave: false,
    store: new MongoStore({mongooseConnection: db}),
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        maxAge: 3 * 3600000 // 3 hours
    }
}));


// Load routes
require('./src/config/routes')(app);
let auth = require('./src/middleware/auth');

// Check a user is logged in
app.use(auth.storeSession);
app.use(auth.isLoggedIn);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404), {title: '404 Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404error');
});

module.exports = app;
