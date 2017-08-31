var express = require('express');
var router = express.Router();
var Response = require('../models/response');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

// Submit response
router.post('/', function(req, res, next) {
  console.log(Date.now());
  var uk = Date.now().toString();
  const input = Buffer.from(uk);
  var hash_uk = highwayhash.asHexString(key, input);
  response = new Response({
    surveyid: req.body.surveyid,
    userkey: hash_uk,
    answers: req.body.answers,
    timestamp: uk
  });
  response.save(function(err, data) {
    if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
    }
    else {
      res.status(201).json({
        message: "Successful response",
        obj: data
      });
    }
  });
});

module.exports = router;