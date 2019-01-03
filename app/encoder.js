const config = require(__dirname + '/config.js');

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

/* TODO add a random uuid to this file to prevent conflicts */
const inputPath = 'uploads/upload';

/* Winston Logger - Configured in app.js */
const winston = require('winston');

/**
 * write a file to disk, then encode an to specified format. callback with path of encoded file
 * @param {file} file audio file as bytes
 * @param {string} format format for encoding
 * @param {function} callback called upon completion
 * @param {string} id appended to filename for testing
 */
exports.encode = function(file, format, callback, fileId) {
  let outputPath = gatherOutputPath(format, fileId);
  winston.info(`Encoding file ${outputPath}`);
  writeInputFile(file, function() {
    ffmpegCall(format, outputPath, function(val) {
      callback(val);
    });
  });
};

/* Construct output path with unique id and specified format */
function gatherOutputPath(format, id) {
  if (!id) id = Date.now();
  let outputExtension = '';
  outputPath = 'output';
  if (format == config.MP3_CODEC) {
    outputExtension = '.mp3';
  }
  if (format == config.M4A_CODEC) {
    outputExtension = '.m4a';
  }
  return outputPath + id + outputExtension;
}

/** Writes unencoded file to disk
 * @param {string} file - Unencoded file
 * @param {function} callback - Function called upon completed writing
 */
function writeInputFile(file, callback) {
  try {
    fs.writeFile(inputPath, file, '', res => {
      callback(res);
    });
  } catch (e) {
    callback(e);
  }
}

/** Constructs and executes ffmpeg conversion cmd. Returns encoded filename
 * @param {string} format - Target audio format
 * @param {string} outputPath - Path for output file on local disk
 * @param {string} callback - Function called upon completed conversion
 */
function ffmpegCall(format, outputPath, callback) {
  ffmpegConvertCommand = ffmpeg(inputPath)
    .audioCodec(format)
    .on('error', function(err) {
      winston.error(`FFMPEG ERROR ${err}`);
      fs.unlink(inputPath, (err, res) => {
        callback(config.FFMPEG_ERROR + err);
      });
    })
    .on('end', function() {
      fs.unlink(inputPath, (err, res) => {
        callback(outputPath);
      });
    })
    .save(outputPath);
}
