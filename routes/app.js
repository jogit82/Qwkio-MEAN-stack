var express = require('express');
var router = express.Router();

/* GET home page. localhost/ */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.post('/create', function(req, res, next) {
  res.render('index');
});

module.exports = router;