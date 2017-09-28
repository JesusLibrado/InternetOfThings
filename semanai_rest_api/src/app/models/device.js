//  app/models/device.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
	name : String,
	code: String,
	description: String,
	location: String,
	date: String
});

module.exports = mongoose.model('Device', DeviceSchema);
