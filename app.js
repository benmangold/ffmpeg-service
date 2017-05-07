var express = require('express');
var formidable = require('formidable');
var bodyParser = require('body-parser');
const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.raw({ type: '*/*', limit: '200mb' }));

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme']
});

app.get('/upload', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function (req, res){
	var form = new formidable.IncomingForm();

	form.parse(req);

	form.on('fileBegin', function (name, file){
		file.path = __dirname + '/uploads/' + file.name;
    	});

    	form.on('file', function (name, file){
        	console.log('Uploaded ' + file.name);
    	});

    	res.sendFile(__dirname + '/index.html');
});

app.post('/mp3', function (req, res) {
	
	console.log("REQ BODY LENGTH: " + req.body.length);
	try {
		fs.writeFileSync('sample.wav', req.body, function(err) {console.log("ERROR " + err)});
	} catch (e) {
		res.status(500)
		res.send('ERROR GETTING BODY ' + e)	
	}
	try {	
		mp3Command = new ffmpeg('sample.wav')
		.audioCodec('libmp3lame')
     		.on('error', function(err) {
   			console.log('An error occurred: ' + err.message);
  	   	 })
		 .on('end', function() {
		 	 fs.unlinkSync('sample.wav');
		 	 res.download('sample.mp3');
  	   	 })
  	     	.save('sample.mp3');	
	} catch (e) {
		res.status(500)
		res.send('ERROR WRITING MP3 ' + e)
	}	
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})