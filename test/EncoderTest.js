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
        '123',
        function(err, filename) {
          err ? assert.equal(0,1) : null
          assert.equal(filename, 'output123.mp3');
          fs.unlinkSync(filename);
          done();
        }
      );
    });
  });

  describe('#encodeM4A', function() {
    it('should return the encoded filename', function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + '/test.wav'),
        consts.M4A_CODEC,
        '123',
        function(err, filename) {
          err ? assert.equal(0,1) : null
          assert.equal(filename, 'output123.m4a');
          fs.unlinkSync(filename);
          done();
        }
      );
    });
  });

  describe('#encoderError', function() {
    it('should return consts.FFMPEG_ERROR', function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + '/corrupted.wav'),
        consts.M4A_CODEC,
        '123',
        function(err, val) {
          err ? assert.equal(1,1) : null
          assert.equal(err.indexOf(consts.FFMPEG_ERROR), 0);
          value = val;
          done();
        }
      );
    });
  });
});
