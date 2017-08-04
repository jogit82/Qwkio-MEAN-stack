var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

router.get('/survey/:ak', function(req, res, next) {
  Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
    if (err) {
      return res.send('Error');
    }
    res.render('survey', { survey: doc });
  });
});

router.post('/', function(req, res, next) {
  var rawtext = req.body.rawtext;
  var ak = Date.now();
  const input = Buffer.from(ak.toString);
  var hash_ak = highwayhash.asHexString(key, input);
  survey = new Survey({
    adminkey: hash_ak,
    rawtext: rawtext
  });
  survey.save(function(err, result) {
    if (err) {
        return res.status(500).json({
            title: 'An error occured',
            error: err
        });
    }
    res.status(201).json({
        message: 'Saved survey',
        obj: result
    });
  });
});
//   var rawtext = req.body.survey;
//   var ak = Date.now();
//   const input = Buffer.from(ak.toString);
//   var hash_ak = highwayhash.asHexString(key, input);
//   survey = new Survey({
//     adminkey: hash_ak,
//     rawtext: rawtext
//   });
// if (surveyController.validatesurvey(survey)) { 
//     survey.save(function(err, result) {
//     if (err) {
//         return res.status(500).json({
//             title: 'An error occured',
//             error: err
//         });
//     }
//     else {
//         res.status(201).json({
//             message: 'Saved survey',
//             obj: result
//         });
//         res.redirect('/survey/' + hash_ak);
//     }
    
//   });


// //   survey.save();
// //   res.redirect('/survey/' + hash_ak);
// }




// else
//   res.send('invalid survey format');
//   // res.redirect('/invalid', { survey: survey }); // todo set up this page
// });

/* GET home page. */
// router.post('/', function(req, res, next) { // it is actually /survey/ because its routed from app.js in the main folder which has a prefix of /survey
//   // store in Mongodb
//   var survey = new Survey({

//   });
//   survey.save(function(err, result) {
//     if (err) {
//         return res.status(500).json({
//             title: 'An error occured',
//             error: err
//         });
//     }
//     res.status(201).json({
//         message: 'Saved survey',
//         obj: result
//     });
//   });
// });

module.exports = router;