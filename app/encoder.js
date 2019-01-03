const { MP3_CODEC, M4A_CODEC, FFMPEG_ERROR } = require(__dirname +
  '/config.js');

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const inputPath = `uploads/upload`;

/* Winston Logger - Configured in app.js */
const winston = require('winston');

/**
 * write a file to disk, then encode an to specified format. callback with path of encoded file
 * @param {file} file audio file as bytes
 * @param {string} format format for encoding
 * @param {function} callback called upon completion
 * @param {string} fileId appended to filename for testing
 */
exports.encode = function(file, format, fileId, callback) {
  let outputPath = gatherOutputPath(format, fileId);
  winston.info(`Encoding file ${outputPath}`);
  writeInputFile(file, fileId, (err, result) => {
    if (err) {
      callback(err);
    }
    ffmpegCall(format, outputPath, fileId, (err, outputPath) => {
      winston.info(typeof outputPath);
      winston.info(`ffmpeg call completed ${outputPath}`);
      if (err) {
        callback(err, null);
      } else if (outputPath == null) {
        callback('FFMPEG_ERROR ', null);
      } else if (outputPath.indexOf(FFMPEG_ERROR) !== -1) {
        winston.error('error', outputPath);
        callback(FFMPEG_ERROR + outputPath, null);
      } else {
        callback(null, outputPath);
      }
    });
  });
};

/* Construct output path with unique id and specified format */
function gatherOutputPath(format, id) {
  let outputExtension = '';
  outputPath = 'output';
  if (format == MP3_CODEC) {
    outputExtension = '.mp3';
  }
  if (format == M4A_CODEC) {
    outputExtension = '.m4a';
  }
  return outputPath + id + outputExtension;
}

/** Writes unencoded file to disk
 * @param {string} file - Unencoded file
 * @param {function} callback - Function called upon completed writing
 */
function writeInputFile(file, fileId, callback) {
  try {
    fs.writeFile(inputPath + fileId, file, '', res => {
      callback(null, res);
    });
  } catch (e) {
    callback(e, null);
  }
}

/** Constructs and executes ffmpeg conversion cmd. Returns encoded filename
 * @param {string} format - Target audio format
 * @param {string} outputPath - Path for output file on local disk
 * @param {string} callback - Function called upon completed conversion
 */
function ffmpegCall(format, outputPath, fileId, callback) {
  ffmpegConvertCommand = ffmpeg(inputPath + fileId)
    .audioCodec(format)
    .on('error', err => {
      winston.error(`FFMPEG ERROR ${err}`);
      fs.unlink(inputPath + fileId, (err, res) => {
        callback(`${FFMPEG_ERROR} ${err}`, null);
      });
    })
    .on('end', () => {
      fs.unlink(inputPath + fileId, (err, res) => {
        callback(null, outputPath);
      });
    })
    .save(outputPath);
}
