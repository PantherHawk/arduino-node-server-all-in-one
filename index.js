const SerialPort = require('serialport');
const fs = require('fs');
const express = require('express');
const app = express();
const sockjs = require('sockjs');
const port = new SerialPort('/dev/tty.usbmodem1421', {
	baudRate: 9600
});

function postMessage(mes, cb) {
	return mes;
	cb();
}

let stream = '';
let i = 0;
let target;
let result = '';
port.on('data', data => {
	console.log('byte data: ', data);
	stream += data.toString();
	target = stream.indexOf('\n');
	if (target > -1) {
	 	result = stream.slice(0, target);
		console.log('i: ', i);
		console.log('target: ', target);
		stream = stream.slice(++target);
		console.log('stream: ', stream);
		console.log('result: ', result);
		if (g_conn) g_conn.write(result);
	}
});

var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

let g_conn;

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
	console.log('socket opened');
	g_conn = conn;
});


app.use(express.static('public'));

const server = app.listen(3000, () => {
	console.log('listening on port 3000..');
});
sockjs_echo.installHandlers(server, { prefix: '/echo' });
