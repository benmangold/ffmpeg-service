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

app.post('/toMp3', function (req, res) {
	// console.log(req.body.length);
	fs.writeFileSync('sample', req.body, function(err) {console.log("ERROR " + err);});
	
	mp3Command = new ffmpeg('sample')
		// .inputFormat('wav')
		.audioCodec('libmp3lame')
     	.on('error', function(err) {
   			 console.log('An error occurred: ' + err.message);
  	   	 })
		 .on('end', function() {
		 	 fs.unlinkSync('sample');
    		 console.log('Processing finished !');
		 	 res.download('sample.mp3');
			 console.log('still here...');
  	   	 })
  	     .save('sample.mp3');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})