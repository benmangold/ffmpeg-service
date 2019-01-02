const assert = require('assert');
const fs = require('fs');

const encoder = require('../app/encoder.js');
const consts = require('../app/config.js');

describe('Encoder', function() {
  describe('#encodeMP3', function() {
    it('should return the encoded filename', function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + '/test.wav'),
        consts.MP3_CODEC,
        function(filename) {
          assert.equal(filename, 'output123.mp3');
          fs.unlinkSync(filename);
          done();
        },
        '123' // replaces current time in ms as file id
      );
    });
  });

  describe('#encodeM4A', function() {
    it('should return the encoded filename', function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + '/test.wav'),
        consts.M4A_CODEC,
        function(filename) {
          assert.equal(filename, 'output123.m4a');
          fs.unlinkSync(filename);
          done();
        },
        '123' // replaces current time in ms as file id
      );
    });
  });

  describe('#encoderError', function() {
    it('should return consts.FFMPEG_ERROR', function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + '/corrupted.wav'),
        consts.M4A_CODEC,
        function(val) {
          assert.equal(val.indexOf(consts.FFMPEG_ERROR), 0);
          value = val;
          done();
        }
      );
    });
  });
});
