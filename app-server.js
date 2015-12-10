var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//////////////////////////////////////////////////
///////////////////// PiGPIO /////////////////////
var http = require('http');
var GPIO = require('onoff').Gpio;
var reedSwitch = new GPIO(23, 'in', 'both');

var connections = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/ftscroller/lib/ftscroller'))

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

//////////////////////////////////////////////////
/////////////////////   SOCKET   /////////////////
var server = app.listen(8000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	
	socket.once('disconnect', function() {
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s", connections.length);
	});

	socket.emit('message', {
		speed: this.speed
	});

	connections.push(socket);
    console.log("Connected: %s", connections.length);
});

console.log("CloudShip running on 'http://localhost:8000' speed:"+speed);



//////////////////////////////////////////////////
/////////////////////   PIGPIO   /////////////////
var reedVal = 0;
var timer = 0;// time between one full rotation (in ms)
var radius = 20;// tire radius (in mm)
var circumference = 2*3.14*radius;

reedSwitch.watch(function(err, state) {
  reedVal = state;
  if(state == 1)
    reedVal = 1;
  else
    reedVal = 0;
  tick();
});

var speed = 0;
times = [0,0];
var time = 0;

function tick(){
  var stamp = new Date().getTime();
  times[reedVal] = stamp;

  if(reedVal){
    time = times[1] - times[0];
    speed = Math.floor((circumference)/(time));
    console.log("reedVal "+reedVal+" time "+time+" speed[ "+speed+" ]");

    var speedJson = {
      "time":time,
      "speed":speed,
      "ms":stamp
    };

    if(connections[0])
		connections[0].emit('message', speedJson);

	/*fs.writeFile('speed.json', JSON.stringify(speedJson, null, 4), function(err) {
      if(err)
	    console.log();
    });*/
	
  }
  
}