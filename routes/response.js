var express = require('express');
var router = express.Router();
var Response = require('../models/response');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

// Submit response
router.post('/', function(req, res, next) {
  var uk = Date.now();
  const input = Buffer.from(uk.toString);
  var hash_uk = highwayhash.asHexString(key, input);
  response = new Response({
    surveyid: 15008,
    userkey: hash_uk,
    answers: [
        {question: 1, answer: "1,2"}, 
        {question: 2, answer: "1"},
        {question: 3, answer: "5"},
        {question: 4, answer: "hello textbox"},
        {question: 5, answer: "Big big textarea"},
        {question: 6, answer: "1"}
    ],
    timestamp: '2017-01-28 21:43:55.000'
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