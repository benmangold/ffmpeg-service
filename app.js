var express = require('express')
var bodyParser = require('body-parser');
const fs = require('fs');

var ffmpeg = require('fluent-ffmpeg');

var app = express()

app.use(bodyParser.raw({ type: '*/*', limit: '200mb' }));

app.get('/', function (req, res) {res.send('Hello World!')})

app.post('/probe', function (req, res) {
	
	fs.writeFileSync('probe', req.body, function(err) {console.log("ERROR " + err);});
	
	ffmpeg.ffprobe('probe', function(err, metadata) {
	  	  console.log(require('util').inspect(metadata, false, null));
	 	  fs.unlinkSync('probe');
		  res.send(require('util').inspect(metadata, false, null))
	});
})

app.post('/', function (req, res) {
	console.log("REQ BODY LENGTH: " + req.body.length);
	try {
		fs.writeFileSync('sample.wav', req.body, function(err) {console.log("ERROR " + err)});
	} catch (e) {
		res.send('ERROR GETTING BODY ' + e)	}
	
	try {
	    mp3Command = new ffmpeg('sample.wav')
		// .inputFormat('wav')
		.audioCodec('libmp3lame')
     		.on('error', function(err) {
   			 console.log('An error occurred: ' + err.message);
  	   	 })
		 .on('end', function() {
		 	 fs.unlinkSync('sample.wav');
    		 	console.log('Processing finished !');
		 	 res.download('sample.mp3');
			 console.log('still here...');
  	   	 })
  	     	.save('sample.mp3');

	} catch (e) {
		res.send('ERROR WRITING MP3 ' + e)
	}
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})