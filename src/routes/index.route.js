const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/index.controller'),
    auth = require('../middleware/auth');

router.get('/', controller.getDashboard);


// router.get('/tasks', function (req, res, next) {
//     let last_year = getDateRange(1);
//     equipment.find({last_tune : {$lte: last_year}})
//         .then((found) => {
//             res.render('tasks', {
//                 title: 'Tasks',
//                 data: found
//             })
//         })
//         .catch(error => {
//             console.error(`Failed to find equipment with specified query "$lte: ${last_year}: ${error}`);
//         })
// });
//
// router.get('/charts', function(req, res, next) {
//
//     res.render('charts', { title: 'Charts' });
// });
//
// function getDateRange(range=1) {
//     let last_year = new Date();
//     last_year.setFullYear(new Date().getFullYear() - range);
//     return last_year.toISOString().split('T')[0];
// }
module.exports = router;
