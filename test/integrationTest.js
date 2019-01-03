const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('README API Tests', function() {
  it('should return 200 status', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('README API Tests', function() {
  it('should return 200 status', function(done) {
    request(app)
      .get('/readme')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('README API Tests', function() {
  it('should return 500 status m4a', function(done) {
    request(app)
      .post('/m4a')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
});

describe('README API Tests', function() {
  it('should return 500 status mp3', function(done) {
    request(app)
      .post('/mp3')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
});
