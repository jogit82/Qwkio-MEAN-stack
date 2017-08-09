var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    surveyid: { type: Number, required: true, ref: 'Survey' },
    userkey: { type: String, required: true },
    answers: { type: Array },
    timestamp: { type: String }
});

schema.index({
    surveyid: 1
}, 
{
    unique: false
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Response', schema);