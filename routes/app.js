var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Rendering survey on a public link so users can take the survey
router.get('/pk/:pk', function(req, res, next) {
    console.log("ROUTER GET, reqparamspk: " + req.params.pk);
    var surveyid = parseInt(req.params.pk, 36);
    console.log(":pk after paseInt" + surveyid);
    Survey.findOne({surveyid: surveyid}, function(err, doc) {
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