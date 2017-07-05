const app = require('.././app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('README API Tests', function() {
  it('should return 200 status', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        // expect(res.body.version).to.be.ok;
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
        // expect(res.body.version).to.be.ok;
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
