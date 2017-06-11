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
		fs.unlinkSync(__dirname + "/" + val);
	})
})

app.post('/m4a', bodyParser, function (req, res) {
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		res.download(__dirname + "/" + val);
		fs.unlink(__dirname + "/" + val, function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(`removed`);
    }
	});
	})
})

app.get('/upload', function (req, res){
	res.sendFile(__dirname + '/app/views/upload.html');
});

app.post('/upload', fileParser, function (req, res){
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('fileBegin', function (name, file){
		file.path = __dirname + '/uploads/' + file.name;
    	});
    	form.on('file', function (name, file){
        	console.log('Uploaded ' + file.name);
    	});
    	res.sendFile(__dirname + '/app/views/upload.html');
});

app.listen(3000, function () {
	console.log('app listening on port 3000!')
})

module.exports = app;
