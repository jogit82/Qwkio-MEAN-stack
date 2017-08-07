var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

router.get('/:ak', function(req, res, next) {
  console.log("GET SURVEY ROUTER");
  Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      console.log(doc);
      res.status(201).json({
          message: 'Success',
          obj: doc
      });
    }
  });
});

// Creating survey by admin
router.post('/', function(req, res, next) {
  var rawtext = req.body.rawtext;
  var ak = Date.now();
  const input = Buffer.from(ak.toString);
  var hash_ak = highwayhash.asHexString(key, input);
  survey = new Survey({
    adminkey: hash_ak,
    rawtext: rawtext
  });
  survey.save(function(err, data) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      res.status(201).json({
        message: 'Survey Id: ' + data.surveyid + '. Admin Key: ' + data.adminkey,
        obj: data
      });
    }
  });
});

module.exports = router;