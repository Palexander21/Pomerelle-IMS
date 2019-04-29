let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Charts' });
});
//
// router.post('/', function (req, res, next) {
//   console.log(req.body);
//   res.render('register', {title: 'register'});
// });
module.exports = router;
