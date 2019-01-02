const {MP3_CODEC, M4A_CODEC, FFMPEG_ERROR, FILE_LIMIT } = require('../config.js');

const express = require('express');
const router = express.Router();

/* ffmpeg encoder module */
const encoder = require('../encoder.js');

/* Media Files as Raw Bytes Will be uploaded */
const bodyParser = require('body-parser');
const rawBodyParser = bodyParser.raw({ type: '*/*', limit: FILE_LIMIT });

/* Winston Logger - Configured in app.js */
const winston = require('winston');

/* MP3 Route */
router.post('/mp3', rawBodyParser, function(req, res) {
  winston.info('Request Recieved - MP3');
  encodeAndDownload(MP3_CODEC, req.body, res);
});

/* M4A Route */
router.post('/m4a', rawBodyParser, function(req, res) {
  winston.info('Request Recieved - M4A');
  encodeAndDownload(M4A_CODEC, req.body, res);
});

/** Encodes a file, sending a file download response to the clietn
 * @param {string} codec - Audio Codec Enum value (from constants.js)
 * @param {file} file - Unencoded audio file
 * @param {res} res - express response for download or error
 */
function encodeAndDownload(codec, file, res) {
  winston.info('Launching Encoding Job ' + codec);
  encoder.encode(file, codec, (output) => {
    if (output.indexOf(FFMPEG_ERROR) !== -1) {
      winston.log('error', output);
      res.statusCode = 500;
      res.send(output);
    } else {
      winston.info('Downloading Encoded File ' + codec);
      res.download(output);
    }
  });
}

module.exports = router;
