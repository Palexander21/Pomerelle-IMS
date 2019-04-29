let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
    const db = req.app.locals.db;
    const collection = db.collection('rentals');
    collection.find({}).toArray(function (err, rentals) {
        if (err) throw err;

        res.render('rentals', {
            title: 'Rentals',
            rentals: rentals,
        });
    });

});

module.exports = router;
