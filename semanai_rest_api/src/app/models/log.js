//  app/models/device.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	date: String,
	info: String,
	imageUrl: String
});

module.exports = mongoose.model('Log', LogSchema);
