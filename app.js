const path = require('path');
const express = require('express');
const formidable = require('formidable');

let bodyParser = require('body-parser');
const fileParser = bodyParser.urlencoded({extended: false});
const rawBodyParser = bodyParser.raw({type: '*/*', limit: '200mb'});

const consts = require(__dirname + '/app/constants.js');
const encoder = require(__dirname + '/app/encoder.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme'],
});

app.post('/mp3', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.MP3_CODEC, function(val) {
		res.download(__dirname + '/' + val);
	});
});

app.post('/m4a', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		res.download(__dirname + '/' + val);
	});
});

app.get('/upload', function(req, res) {
	res.sendFile(__dirname + '/app/views/upload.html');
});

app.post('/upload', fileParser, function(req, res) {
	const form = new formidable.IncomingForm();
	form.parse(req);
	form.on('fileBegin', function(name, file) {
		file.path = __dirname + '/uploads/' + file.name;
		});
		form.on('file', function(name, file) {
			console.log('Uploaded ' + file.name);
		});
		res.sendFile(__dirname + '/app/views/upload.html');
});

app.listen(3000, function() {
	console.log('app listening on port 3000!');
});

module.exports = app;
