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
	
	//write input to disk and call ffmpeg conversion 
	writeInputFile(file, function() {
		ffmpegCall(format, function(val) {
			callback(val);
		});
	});
	
	function ffmpegCall(format, callback) {
		ffmpegConvertCommand = new ffmpeg('input')
			.audioCodec(format)
			.on('error', function(err) {
				callback(consts.FFMPEG_ERROR);
			})
			.on('end', function() {
			 	 fs.unlinkSync('input');
				 callback('output' + extension);
	  	})
			.save('output' + extension);	
	}

	function writeInputFile(file, callback) {
			fs.writeFileSync('input', file, function(err) {
				callback("ERROR WRITING INPUT " + err)
			});
			callback();
	}
}
