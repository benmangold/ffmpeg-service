const config = require('../constants.js');

const express = require('express');
const router = express.Router();

/* ffmpeg encoder module */
const encoder = require('../encoder.js');

/* Raw Audio as Bytes Will be Uploaded */
const bodyParser = require('body-parser');
const rawBodyParser = bodyParser.raw({ type: '*/*', limit: config.FILE_LIMIT });

/* Configuring Logger */
const winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: true });

/* MP3 Route */
router.post('/mp3', rawBodyParser, function(req, res) {
  winston.info('Request Recieved - MP3');
  encodeAndDownload(config.MP3_CODEC, req.body, res);
});

/* M4A Route */
router.post('/m4a', rawBodyParser, function(req, res) {
  winston.info('Request Recieved - M4A');
  encodeAndDownload(config.M4A_CODEC, req.body, res);
});

/** Encodes a file, sending a file download response to the clietn
 * @param {string} codec - Audio Codec Enum value (from constants.js)
 * @param {file} file - Unencoded audio file
 * @param {res} res - express response for download or error
 */
function encodeAndDownload(codec, file, res) {
  winston.info('Launching Encoding Job');
  encoder.encode(file, codec, function(val) {
    if (val.indexOf(config.FFMPEG_ERROR) !== -1) {
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
