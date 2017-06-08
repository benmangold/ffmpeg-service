var express = require('express');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');

const fs = require('fs');
var consts = require(__dirname + '/constants.js');
var encoder = require(__dirname + '/encoder.js');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var fileParser = bodyParser.urlencoded({ extended: false });
var bodyParser = bodyParser.raw({ type: '*/*', limit: '200mb' });

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme']
});

app.get('/upload', function (req, res){
	res.sendFile(__dirname + '/views/upload.html');
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
    	res.sendFile(__dirname + '/views/upload.html');
});

app.post('/mp3', bodyParser, function (req, res) {
	encoder.encode(req.body, consts.MP3_CODEC, function(val) {
		console.log('controller callback ' + val);
		res.download(__dirname + "/" + val);
	})
})

app.post('/m4a', bodyParser, function (req, res) {
	
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		console.log('controller callback ' + val);
		res.download(__dirname + "/" + val);
	})
	
	
	
	// try {
	// 	fs.writeFileSync('input', req.body, function(err) {console.log("ERROR " + err)});
	// } catch (e) {
	// 	res.status(500)
	// 	res.send('ERROR GETTING FILE ' + e)
	// }
	//
	// try {
	// 	ffmpegConvertCommand = new ffmpeg('input')
	// 	.audioCodec(consts.M4A_CODEC)
	//      		.on('error', function(err) {
	//    			console.log('ERROR CONVERTING d: ' + err.message);
	//   	   	 })
	// 	 .on('end', function() {
	// 	 	 fs.unlinkSync('input');
	// 	 	 res.download('output.m4a');
	//   	   	 })
	//   	     	.save('output.m4a');
	// } catch (e) {
	// 	res.status(500)
	// 	res.send('ERROR WRITING FILE ' + e)
	// }


})

app.listen(3000, function () {
	console.log('app listening on port 3000!')
})

module.exports = app;
