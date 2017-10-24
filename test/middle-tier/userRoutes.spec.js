var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
var chaiHttp = require('chai-http');
var sinon = require('sinon');

var server = require('../../index');

chai.use(chaiHttp);

describe('Array', function() {
    it('should start empty', function() {
        var arr = [];

        assert.equal(arr.length, 0, "Array length was not 0");
    });
});

describe('consumer', function() {
    describe('POST', function () {
        it('should respond', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+2=' })
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });

        });
        it('should respond with the correct answer', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+4=' })
                .end(function (err, res) {
                    res.body.solution.should.equal(5);
                    done();
                });
        });
        it('should respond with an error', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+a=' })
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.body.error.should.equal('One of the values is NaN');
                    done();
                });
        });
    });
});