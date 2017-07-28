const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const rawBodyParser = bodyParser.raw({type: '*/*', limit: '200mb'});

const consts = require('../constants.js');
const encoder = require('../encoder.js');

const winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

router.post('/mp3', rawBodyParser, function(req, res) {
	winston.info('Request Recieved - MP3');
	encodeAndDownload(consts.MP3_CODEC, req.body, res);
});
router.post('/m4a', rawBodyParser, function(req, res) {
	winston.info('Request Recieved - M4A');
	encodeAndDownload(consts.M4A_CODEC, req.body, res);
});

/** Encodes a file, downloading the result
 * @param {string} codec - Audio Codec Enum value (from constants.js)
 * @param {file} file - Unencoded audio file
 * @param {res} res - express response for download or error
 */
function encodeAndDownload(codec, file, res) {
	winston.info('Launching Encoding Job');
	encoder.encode(file, codec, function(val) {
		if (val.indexOf(consts.FFMPEG_ERROR) !== -1) {
			winston.log('error', val);
			res.statusCode = 500;
			res.send(val);
		} else {
			winston.info('Downloading Encoded File');
			res.download(val);
		}
	});
}

module.exports = router;
