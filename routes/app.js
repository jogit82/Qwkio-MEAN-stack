var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/:ak', function(req, res, next) {
//   Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
//     if (err) {
//       return res.send('Error');
//     }
//     res.render('survey', { survey: doc });
//   });
// });

// Rendering survey on a public link so users can take the survey


module.exports = router;