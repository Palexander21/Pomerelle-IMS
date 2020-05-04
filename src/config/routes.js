module.exports = (function (app) {

    let auth = require('../middleware/auth');

    let unless = function(middleware, ...paths) {
        return function(req, res, next) {
            const pathCheck = paths.some(path =>{
                let regex = RegExp(path);
                return regex.test(req.path)
            });
            pathCheck ? next() : middleware(req, res, next);
        };
    };


// Routes for rendering
    let indexRouter = require('../routes/index.route');
    let rentalRouter = require('../routes/rentals.route');
    let usersRouter = require('../routes/users.route');
    let adminRouter = require('../routes/admin.route');
    let ticketRouter = require('../routes/tickets.route');

    app.use(unless(auth.isAuthorized, '/api/\*', '/users/login'));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/rental_shop', rentalRouter);
    app.use('/admin', adminRouter);
    app.use('/ticketing', ticketRouter);

    app.use(unless(auth.api_auth, '/api/v3/users/login', '/api/v3/users/logout'));

// API routes
    let users_api = require('../api/v3/routes/users.api.route');
    let rentals_api = require('../api/v3/routes/rentals.api.route');
    let equipment_api = require('../api/v3/routes/equipment.api.route');
    let tickets_api = require('../api/v3/routes/tickets.api.route');
    app.use('/api/v3/users', users_api);
    app.use('/api/v3/rentals', rentals_api);
    app.use('/api/v3/equipment', equipment_api);
    app.use('/api/v3/tickets', tickets_api);

});
