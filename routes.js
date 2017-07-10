const express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
const rawBodyParser = bodyParser.raw({type: '*/*', limit: '200mb'});

const consts = require('./app/constants.js');
const encoder = require('./app/encoder.js');

router.post('/mp3', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.MP3_CODEC, function(val) {
		console.log('out of encoder ' + val);
		if (val != consts.FFMPEG_ERROR) {
			console.log('1');
			res.download(__dirname + '/' + val);
		} else {
			console.log('2');
			res.statusCode = 500;
			res.end();
		}
	});
});

router.post('/m4a', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		console.log('out of encoder ' + val);
		if (val != consts.FFMPEG_ERROR) {
			res.download(__dirname + '/' + val);
		} else {
			res.statusCode = 500;
			res.send();
		}
	});
});

module.exports = router;
