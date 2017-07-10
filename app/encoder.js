const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const consts = require(__dirname + '/constants.js');

/**
 * encode an audio file to specified format
 * @param {file} file audio file as bytes
 * @param {string} format format for encoding
 * @param {function} callback called upon completion
 */
exports.encode = function(file, format, callback) {
	let extension = '';
	if (format == consts.MP3_CODEC) {
		extension = '.mp3';
	} if (format == consts.M4A_CODEC) {
		extension = '.m4a';
	}

	// synchronously write input to disk and call ffmpeg conversion
	writeInputFile(file, function() {
		ffmpegCall(format, function(val) {
			callback(val);
		});
	});

	/** Constructs and executes ffmpeg conversion cmd
	 * @param {string} format - Target audio format
 	 * @param {string} callback - Function called upon completed conversion
	 */
	function ffmpegCall(format, callback) {
		ffmpegConvertCommand = ffmpeg('input/input')
			.audioCodec(format)
			.on('error', function(err) {
				console.log('FFMPEG ERROR ' + err);
				callback(consts.FFMPEG_ERROR);
			})
			.on('end', function() {
				fs.unlinkSync('input/input');
				callback('output' + extension);
			})
			.save('output' + extension);
	}
	/** Writes unencoded file to disk
	 * @param {string} file - Unencoded audio file
 	 * @param {function} callback - Function called upon completed writing
	 */
	function writeInputFile(file, callback) {
		console.log('PATH ' + __dirname);
			fs.writeFileSync('input/input', file, function(err) {
				callback('ERROR WRITING INPUT ' + err);
			});
			callback();
	}
};
