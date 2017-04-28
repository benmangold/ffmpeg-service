var express = require('express')
var bodyParser = require('body-parser');
const fs = require('fs');

var ffmpeg = require('fluent-ffmpeg');

var app = express()

app.use(bodyParser.raw({ type: '*/*', limit: '200mb' }));

app.get('/', function (req, res) {
	
	// make sure you set the correct path to your video file
	ffmpeg.ffprobe('movie.avi',function(err, metadata) {
	  console.log(require('util').inspect(metadata, false, null));
	});	
	
    res.send('Hello World!')
})

app.post('/wavToMp3', function (req, res) {
	
	// console.log(req.body.length);
	fs.writeFileSync('sample.wav', req.body, function(err) {console.log("ERROR " + err);});
	
	ffmpeg.ffprobe('sample.wav', function(err, metadata) {
  	  console.log(require('util').inspect(metadata, false, null));
	});
	
	mp3Command = new ffmpeg('sample.wav')
		.inputFormat('wav')
		.audioCodec('libmp3lame')
     	.on('error', function(err) {
   			 console.log('An error occurred: ' + err.message);
  	   	 })
		 .on('end', function() {
    		 console.log('Processing finished !');
  	   	 })
  	     .save('sample.mp3');
	
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})