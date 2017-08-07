var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');

// router.get('/:ak', function(req, res, next) {
//   Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
//     if (err) {
//       return res.send('Error');
//     }
//     res.render('survey', { survey: doc });
//   });
// });

module.exports = router;