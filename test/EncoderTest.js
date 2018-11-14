const assert = require("assert");
const fs = require("fs");

const encoder = require("../app/encoder.js");
const consts = require("../app/constants.js");

describe("Encoder", function() {
  describe("#encodeMP3", function() {
    it("should return the encoded filename", function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + "/test.wav"),
        consts.MP3_CODEC,
        function(val) {
          assert.equal(val, "output.mp3");
          fs.unlinkSync(val);
          done();
        }
      );
    });
  });

  describe("#encodeM4A", function() {
    it("should return the encoded filename", function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + "/test.wav"),
        consts.M4A_CODEC,
        function(val) {
          assert.equal(val, "output.m4a");
          fs.unlinkSync(val);
          done();
        }
      );
    });
  });

  describe("#encoderError", function() {
    it("should return consts.FFMPEG_ERROR", function(done) {
      encoder.encode(
        fs.readFileSync(__dirname + "/corrupted.wav"),
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
