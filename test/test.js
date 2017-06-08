var assert = require('assert');
const fs = require('fs');

var encoder = require('../encoder.js');
var consts = require('../constants.js');

describe('Encoder', function() {
	describe('#encodeMP3', function() {
		it('should return the encoded filename', function(done) {
			encoder.encode(fs.readFileSync(__dirname + '/test.wav'), consts.MP3_CODEC, function(val) {
				assert.equal (val,'output.mp3');
				done();
			});
		});
	});
	
	describe('#encodeM4A', function () {
		it('should return the encoded filename', function(done) {
			encoder.encode(fs.readFileSync(__dirname + '/test.wav'), consts.M4A_CODEC, function(val) {
				assert.equal(val,'output.m4a');
				done();
			});
		});
	});
	
	describe('#encoderError', function () {
		it('should return consts.FFMPEG_ERROR', function(done) {
			encoder.encode(fs.readFileSync(__dirname + '/corrupted.wav'), consts.M4A_CODEC, function(val) {
				assert.equal(val,consts.FFMPEG_ERROR);				
				value = val;
				done();
			});
		});
	});
	
});