var assert = require('assert');
const fs = require('fs');

var encoder = require('../encoder.js');
var consts = require('../constants.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Encoder', function() {
	describe('#encodeMP3', function() {
		it('should return the encoded filename', function() {
			encoder.encode(fs.readFileSync(__dirname + '/test.wav'), consts.MP3_CODEC, function(val) {
				console.log('END OF TEST CALLBACK');
				assert.equal (val,'output.mp3');
				done();
			});
		});
	});
	
	describe('#encodeM4A', function () {
		it('should return the encoded filename', function() {
			encoder.encode(fs.readFileSync(__dirname + '/test.wav'), consts.M4A_CODEC, function(val) {
				// assert.equal(val,'output.m4a');
				done();
			});
		})
	});
	
});