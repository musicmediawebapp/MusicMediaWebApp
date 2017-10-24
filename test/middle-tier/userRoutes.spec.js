import 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';

describe('Array', function() {
    it('should start empty', function() {
        var arr = [];

        assert.equal(arr.length, 0);
    });
});