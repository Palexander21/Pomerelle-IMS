require('./src/models/Users');
require('./src/models/Equipment');
require('./src/models/Customers');
require('./src/models/OpenRentals');
require('./src/models/Rentals');
require('./src/models/Tickets');
require('./src/models/Kitchen');
require('./src/models/Configuration');
require('dotenv').config();
const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    uuid = require('uuid/v4');
    cookieParser = require('cookie-parser');

let db;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':remote-addr [:date[web]] :method :url :status - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
        initApp();

    })
    .catch(err => {
        console.error(`Failed to connect to mongo database: ${err.message}`);
    });

initApp = function() {

    db = mongoose.connection;
    app.use(session({
        genid: function() {
            return uuid()
        },
        secret: process.env.SECRET,
        resave: true,
        store: new MongoStore({mongooseConnection: db}),
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            maxAge: 3600000 // 1 hour
        }
    }));


// Load routes
    require('./src/config/routes')(app);


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
        // res.render('404error');
    });
};

module.exports = app;
