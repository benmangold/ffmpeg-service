const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const consts = require(__dirname + "/constants.js");

let outputExtension;
const inputPath = "uploads/upload";
let outputPath;

/**
 * encode an audio file to specified format. callback upon finished encoding
 * @param {file} file audio file as bytes
 * @param {string} format format for encoding
 * @param {function} callback called upon completion
 */
exports.encode = function(file, format, callback) {
  outputExtension = "";
  outputPath = "output";
  if (format == consts.MP3_CODEC) {
    outputExtension = ".mp3";
  }
  if (format == consts.M4A_CODEC) {
    outputExtension = ".m4a";
  }
  outputPath = outputPath + outputExtension;

  writeInputFile(file, function() {
    ffmpegCall(format, function(val) {
      callback(val);
    });
  });
};
/** Writes unencoded file to disk
 * @param {string} file - Unencoded audio file
 * @param {function} callback - Function called upon completed writing
 */
function writeInputFile(file, callback) {
  // console.log('PATH ' + __dirname);
  try {
    fs.writeFileSync(inputPath, file, "");
    callback();
  } catch (e) {
    callback(e);
  }
}
/** Constructs and executes ffmpeg conversion cmd. Returns encoded filename
 * @param {string} format - Target audio format
 * @param {string} callback - Function called upon completed conversion
 */
function ffmpegCall(format, callback) {
  ffmpegConvertCommand = ffmpeg(inputPath)
    .audioCodec(format)
    .on("error", function(err) {
      // console.log('FFMPEG ERROR ' + err);
      fs.unlinkSync(inputPath);
      callback(consts.FFMPEG_ERROR + err);
    })
    .on("end", function() {
      fs.unlinkSync(inputPath);
      callback(outputPath);
    })
    .save(outputPath);
}
