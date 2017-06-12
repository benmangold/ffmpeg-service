var express = require('express');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');

const fs = require('fs');
var consts = require(__dirname + '/app/constants.js');
var encoder = require(__dirname + '/app/encoder.js');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var fileParser = bodyParser.urlencoded({ extended: false });
var bodyParser = bodyParser.raw({ type: '*/*', limit: '200mb' });

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme']
});

app.post('/mp3', bodyParser, function (req, res) {
	encoder.encode(req.body, consts.MP3_CODEC, function(val) {
		res.download(__dirname + "/" + val);
	})
})

app.post('/m4a', bodyParser, function (req, res) {
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		res.download(__dirname + "/" + val);
	})
})

app.listen(3000, function () {
	console.log('app listening on port 3000!')
})

module.exports = app;
