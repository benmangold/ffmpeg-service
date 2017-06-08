var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
var consts = require(__dirname + '/constants.js');


exports.encode = function(file, format, callback) {
	
	var extension = '';
	
	if(format == consts.MP3_CODEC) {
		extension = '.mp3';
	} if(format == consts.M4A_CODEC) {
		extension = '.m4a';
	}
	
	try {
		fs.writeFileSync('input', file, function(err) {console.log("ERROR " + err)});
	} catch (e) {
		e += 'ERROR GETTING FILE ';
		throw e;	
	}
	
	ffmpegCall(format, function(val) {
		console.log('call call  ' + val);
		// return(val);
		callback(val);
	});
	
function ffmpegCall(format, callback) {
	console.log('calling ffmpeg');
	// try {
		ffmpegConvertCommand = new ffmpeg('input')
			.audioCodec(format)
			.on('error', function(err) {
						console.log('FF ERROR')
	   				console.log('ERROR CONVERTING : ' + err.message);
			})
			.on('end', function() {
			 	 fs.unlinkSync('input');
				 console.log('FF END')
				 // done();
				 callback('output' + extension);
	  	})
			.save('output' + extension);	
		// }
		// catch (e) {
		// 	e += 'ERROR WRITING FILE ';
		// 	throw e;
		// }
	}
}