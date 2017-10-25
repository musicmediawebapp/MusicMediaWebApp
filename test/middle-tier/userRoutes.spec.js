var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
var chaiHttp = require('chai-http');
var sinon = require('sinon');

var server = require('../../index');

var dbService = require('../../database/dbService');

chai.use(chaiHttp);

describe('Test', function() {
    beforeEach(function() {
        var getUserByIDStubE = sinon.stub(dbService, 'getUserByID').callsFake(cb => {
            cb(undefined, 5);
        });

        var req = new Request();
        req.body = 34;
      });

    it('TESTSETSTETS', function(done) {        
        chai.request(server)
            .get('/test')
            .send({ req })
            .end(function (err, res) {
                res.body.result.should.equal(5);
                done();
            });
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