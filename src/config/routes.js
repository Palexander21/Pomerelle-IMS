module.exports = (function (app) {
// Routes for rendering
    let indexRouter = require('../routes/index.route');
    let tablesRouter = require('../routes/tables.route');
    let rentalRouter = require('../routes/rentals.route');
    let usersRouter = require('../routes/users.route');
    let adminRouter = require('../routes/admin.route');

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/tables', tablesRouter);
    app.use('/rentals', rentalRouter);
    app.use('/admin', adminRouter);

// API routes
    let users_api = require('../api/v3/routes/users.api.route');
    let rentals_api = require('../api/v3/routes/rentals.api.route');
    let equipment_api = require('../api/v3/routes/equipment.api.route');
    app.use('/api/v3/users', users_api);
    app.use('/api/v3/rentals', rentals_api);
    app.use('/api/v3/equipment', equipment_api);
});
