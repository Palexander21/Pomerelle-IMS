let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const users = mongoose.model('Users');
const equipment = mongoose.model('Equipment');

/* GET home page. */
router.get('/', function(req, res, next){
  let last_year = new Date();
  last_year.setFullYear(new Date().getFullYear() - 1);
  last_year = last_year.toISOString().split('T')[0];
  console.log(last_year);
  equipment
      .countDocuments({ last_tune : {$lte: last_year, $ne: "N/A"} })
      .then((count) => {
        equipment.find({last_tune : {$lte: last_year}}).then((found) => {
          console.log(found)
        });
        res.render('index', {
          title: 'Home',
          tunes: count
        });
      })
      .catch(err => {
        console.log(err);
      })
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
