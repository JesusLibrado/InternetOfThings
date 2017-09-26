// server.js

// base setup

var mongoose = require('mongoose'); // driver de Mongo
mongoose.connect('mongodb://35.185.213.109:27017/iotec-jesuslibrado');
var Device = require('./app/models/device');


var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

var bodyParser = require('body-parser');

// config app to use bodyParser()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8126; 

// routes for our api

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Router in use...');
  

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  
  res.header('Access-Control-Allow-Headers', 'Content-Type');


	next();  // make sure we go to the next routes
});


// test route

router.get('/', function(req, res) {
 res.json({ message: 'Welcome to our api !' });
});

// more routes for our API will happen here
router.route('/devices')

  // http://localhost:8081/api/devices
 .post(function (req, res) {

   	var device = new Device();
   	device.name = req.body.nombre;
    device.lastname = req.body.apellido;
    device.age = req.body.edad;

   	device.save(function (err) {
   		if (err)
   			res.send(err);
   		res.json({ message: 'Device created !'});
   	});
 })

 // http://localhost:8081/api/devices)
 .get(function (req, res) {

   	Device.find(function(err, devices){
   		if (err)
   			res.send(err);
   		res.json(devices);
   	});
 });

// on routes that end in /devices/:device_id
router.route('/devices/:device_id')
 // get the device with that id 
 // accessed at GET 
 // http://localhost:8081/api/devices/:device_id

 .get(function(req, res){
   	Device.findById(req.params.device_id, function(err, device){
   		if (err)
   			res.send(err);
   		res.json(device);

   	});
  })

 // http://localhost:8126/api/bears/:bear_id

 .put(function (req, res) {

   	Device.findById(req.params.device_id, function(err, device){
   		if (err)
   			res.send(err);

   		device.name = req.body.nombre;
      device.lastname = req.body.apellido;
      device.age = req.body.edad;

   		device.save(function (err) {
   			if (err)
   				res.send(err);
   			res.json({message: 'Device updated !'});
   		});
   	});
  })

 // http://localhost:8081/api/devices/:device_id
 .delete(function (req, res) {

     Device.remove({
     	_id : req.params.device_id
     }, function (err, device) {
     	if (err)
     		res.send(err);
     	res.json({message: 'Device deleted !'});
     });

 });

 

// register our routes
app.use('/api', router);
//app.use(require('cors')());

// start the server

app.listen(port);
console.log('Magic happens on port: ' + port);
