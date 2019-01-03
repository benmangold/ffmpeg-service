const {
  MP3_CODEC,
  M4A_CODEC,
  FFMPEG_ERROR,
  FILE_LIMIT,
} = require('../config.js');

const express = require('express');
const router = express.Router();
const fs = require('fs');

/* ffmpeg encoder module */
const encoder = require('../encoder.js');

/* Media Files will be uploaded as Binary Bytes */
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
  winston.info(`Launching ${codec} Encoding Job`);
  encoder.encode(file, codec, parseInt(Math.random() * 1000000000), output => {
    console.log('encoder output ' + output)
    if (output.indexOf(FFMPEG_ERROR) !== -1) {
      winston.error('error', output);
      res.statusCode = 500;
      res.send(output);
    } else {
      winston.info(`Downloading Encoded ${codec} File ${output}`);
      res.download(output, output, (err, res) => {
        if (err) {
          winston.error(err);
          res.status(500).send();
        }
        fs.unlink(output, (err, res) => {
          if (err) {
            winston.error(err);
            res.status(500).send();
          }
          winston.info(`Deleting encoded file ${output}`);
        });
      });
    }
  });
}

module.exports = router;
