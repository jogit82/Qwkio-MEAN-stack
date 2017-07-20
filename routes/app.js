var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
const highwayhash = require('highwayhash');

// key is a Buffer containing 32 bytes (256-bit)
// input is a Buffer to calculate a hash value of
const key = require('crypto').randomBytes(32);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/survey/:ak', function(req, res, next) {
  Survey.findOne({adminkey: req.params.ak}, function(err, doc) {
    if (err) {
      return res.send('Error');
    }
    res.render('survey', { survey: doc });
  });
});

var surveyController = (function() {
  var surveyObj, title, description, question, re_question, re_multichoice, re_radio, re_dropdown, re_textbox, re_pointrating;
  // validate rawtext and make sure it is the rigth format for a survey
  function validatesurvey(survey) {
    title = '';
    description = '';

    // regular expressions to test what each line is
    re_question = /^\d*\)(.*)$/; // d, ), space?
    re_multichoice = /^\[ \](.*)$/; // [, space, ], space?
    re_radio = /^\( \)(.*)$/; // (, ) space?
    re_dropdown = /^\< \>(.*)$/; // <, >, space?
    re_textbox = /^_{3,}\s*$/; // _(at least 3), space?
    re_pointrating = /^(\(\d+\)\s*){3,10}$/; // (, d, ), space?

    return compile(survey);
  }

  function compile(survey) {
    surveyObj = survey;
    questions = [];
    var is_questionheader, is_multichoice, is_radio, is_dropdown, is_textbox, is_pointrating;
    var curQuestion = {};
    var idx = 1;
    var lines = surveyObj.rawtext.split('\n');
    for(var i = 0; i < lines.length; i ++) {
      if(lines[i] === '') {
        continue;
      }
      line = lines[i].trim();
      is_questionheader = re_question.test(line);
      is_multichoice = re_multichoice.test(line)
      is_radio = re_radio.test(line)
      is_dropdown = re_dropdown.test(line)
      is_textbox = re_textbox.test(line)
      is_pointrating = re_pointrating.test(line)

      if (is_questionheader) {// line is question header
          curQuestion = {} // start a new question
          curQuestion['id'] = idx;
          idx ++;
          questions.push(curQuestion);
          curQuestion['title'] = line.slice(line.indexOf(' ')).trim(); // title of question
      }
      else if (is_multichoice && curQuestion) { // line is multiple choice checkbox
          curQuestion['type'] = curQuestion['type'] || 'checkbox';
          curQuestion['option'] = curQuestion['option'] || [];
          curQuestion['option'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
      }
      else if (is_radio && curQuestion) { // line is radio options
        curQuestion['type'] = curQuestion['type'] || 'radio';
        curQuestion['option'] = curQuestion['option'] || [];
        curQuestion['option'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
      }
      else if (is_dropdown && curQuestion) { // line is dropdown
        curQuestion['type'] = curQuestion['type'] || 'dropdown';
        curQuestion['option'] = curQuestion['option'] || [];
        curQuestion['option'].push(line.slice(line.indexOf(' ', parseInt(line.indexOf(' ') + 1))).trim());
      }
      else if (is_textbox && curQuestion) { // line is text input box
        if (curQuestion['type'] === 'singleline') { // already have a singleline, so let's upgrade it to a multiline
          curQuestion['type'] = 'multiline'
        }
        else if (curQuestion['type'] !== 'multiline') {
          curQuestion['type'] = 'singleline'
        }
      }
      else if (is_pointrating && curQuestion) { // line is point rating
        curQuestion['type'] = curQuestion['type'] || 'pointrating';
        curQuestion['points'] = (line.match(new RegExp(/\(/, "g")) || []).length;
      }
      else if (curQuestion && !curQuestion['type']) {// no format match but we are in a question, make this a question subtext
        curQuestion['subtitle'] = line;
      }
      else if (curQuestion === null) {
        if (title === '') {
          continue;
        }
        description = line;
      }
    }

    if (questions.length === 0) {
      console.log("no question!");
      return false;
    }
    else {
      console.log(questions);
      return true;
    }
  }
  
  return {
    validatesurvey: validatesurvey
  }
})();

router.post('/', function(req, res, next) {
  var rawtext = req.body.survey;
  var ak = Date.now();
  const input = Buffer.from(ak.toString);
  var hash_ak = highwayhash.asHexString(key, input);
  survey = new Survey({
    adminkey: hash_ak,
    rawtext: rawtext
  });
if (surveyController.validatesurvey(survey)) { 
  survey.save();
  res.redirect('/survey/' + hash_ak);
}
else
  res.send('invalid survey format');
  // res.redirect('/invalid', { survey: survey }); // todo set up this page
});

module.exports = router;
