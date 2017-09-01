var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
var Response = require('../models/response');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

router.get('/api/:ak', function(req, res, next) {
  Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      // console.log(doc);
      res.status(201).json({
          message: 'Success',
          obj: doc
      });
    }
  });
});

router.get('/results/:surveyid', function(req, res, next) {
  Response.find({surveyid: req.params.surveyid}, function(err, docs) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      res.status(201).json({
          message: 'Success',
          obj: docs
      });
    }
  });
});

// Creating survey by admin
router.post('/', function(req, res, next) {
  const rawtext = req.body.rawtext;
  const ak = Date.now();
  const input = Buffer.from(ak.toString());
  const hash_ak = highwayhash.asHexString(key, input);
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
        message: 'Survey saved',
        obj: data
      });
    }
  });
});

router.put('/close/:ak', function(req, res, next) {
  Survey.findOneAndUpdate({adminkey: req.params.ak}, {$set:{closed: true}},{new: true}, function(err, doc) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      res.status(201).json({
          message: 'Success',
          obj: doc
      });
    }
  });   
});

router.put('/open/:ak', function(req, res, next) {
  Survey.findOneAndUpdate({adminkey: req.params.ak}, {$set:{closed: false}}, {new: true}, function(err, doc) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      res.status(201).json({
          message: 'Success',
          obj: doc
      });
    }
  });   
});

module.exports = router;