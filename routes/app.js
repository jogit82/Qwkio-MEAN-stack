var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
