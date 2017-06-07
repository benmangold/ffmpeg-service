var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
var consts = require(__dirname + '/constants.js');


exports.encode = function(file, format, callback) {
	
	var extension = '';
	
	if(format == consts.MP3_CODEC) {
		console.log('GOT MP3 EXTENSION')
		extension = '.mp3';
	} if(format == consts.M4A_CODEC) {
		extension = '.m4a';
	}
	
	try {
		fs.writeFileSync('input', file, function(err) {console.log("ERROR " + err)});
		console.log('WROTE FILE')
		
	} catch (e) {
		e += 'ERROR GETTING FILE ';
		throw e;	
	}
	
	try {	
		ffmpegConvertCommand = new ffmpeg('input')
		.audioCodec(format)
     		.on('error', function(err) {
		console.log('FF ERROR')
			
   			console.log('ERROR CONVERTING d: ' + err.message);
  	   	 })
		 .on('end', function() {
			 console.log('FF END')
			 console.log('output' + extension)
			 
			 
		 	 fs.unlinkSync('input');
		 	 // res.download('output.mp3');
			 return('output' + extension);
			 callback('output' + extension)
			 console.log('past callback')
  	   	 })
  	     	.save('output' + extension);	
	} catch (e) {
		e += 'ERROR WRITING FILE ';
		throw e;
	}
}