//  app/models/device.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	device_id: String,
	date: String,
	info: Object,
	imageUrl: String
});

module.exports = mongoose.model('Log', LogSchema);
