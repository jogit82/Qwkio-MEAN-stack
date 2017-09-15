var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var connection = mongoose.connect('mongodb://qwkioadmin:ilovemandy123@ds135444.mlab.com:35444/qwkio', {
  useMongoClient: true
});
autoIncrement.initialize(connection);

var schema = new Schema({
    adminkey: { type: String, required: true },
    rawtext: { type: String },
    closed: { type: Boolean, default: false }
    // responses: { type: Schema.Types.ObjectId, ref: 'Response'}
});

schema.plugin(autoIncrement.plugin, {
     model: 'Survey', 
     field: 'surveyid',
     startAt: 15000,
     incrementBy: 1
});

schema.plugin(mongooseUniqueValidator);

schema.index({
    surveyid: 1,
    adminkey: 1
}, 
{
    unique: true
});

module.exports = mongoose.model('Survey', schema);