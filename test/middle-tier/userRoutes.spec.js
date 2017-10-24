var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Array', function() {
    it('should start empty', function() {
        var arr = [];

        assert.equal(arr.length, 0);
    });
});