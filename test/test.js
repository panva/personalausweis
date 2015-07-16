'use strict';

var assert = require('assert'),
    Ausweisnummer = require('../'),
    AssertionError = assert.AssertionError;

var old_valid = '1220001297D640812517103198';

describe('old-format ausweisnummer', function () {

    describe('valid', function () {

        it('should pass constructor', function () {
            assert.doesNotThrow(function () {
                new Ausweisnummer(old_valid);
            });
        });

        it('should split the ID into parts', function () {
            var an = new Ausweisnummer(old_valid);

            assert.equal(122000129, an.number);
            assert.equal(7, an.number_cd);

            assert.equal(640812, an.birthdate);
            assert.equal(5, an.birthdate_cd);

            assert.equal(171031, an.expiry);
            assert.equal(9, an.expiry_cd);

            assert.equal(8, an.full_cd);
        });
    });

    describe('invalid', function () {

        it('should detect wrong number check digit', function () {
            assert.throws(function () {
                // 7 -> 9
                new Ausweisnummer('1220001299D640812517103198');
            }, /invalid number_cd/);
        });

        it('should detect invalid birthdate part format', function () {
            assert.throws(function () {
                // 13th month
                new Ausweisnummer('1220001297D641312517103198');
            }, /birthdate has invalid format/);
        });

        it('should detect wrong birthdate check digit', function () {
            assert.throws(function () {
                // 5 -> 4
                new Ausweisnummer('1220001297D640812417103198');
            }, /invalid birthdate_cd/);
        });

        it('should detect invalid expiry date part format', function () {
            assert.throws(function () {
                // 32 days in a month
                new Ausweisnummer('1220001297D640812517103298');
            }, /expiry has invalid format/);
        });

        it('should detect wrong expiry date check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('1220001297D640812517103188');
            }, /invalid expiry_cd/);
        });

        it('should detect wrong full check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('1220001297D640812517103199');
            }, /invalid full_cd/);
        });
    });
});

var new_valid = 'T22000129364081252010315D4';

describe('new-format ausweisnummer', function () {

    describe('valid', function () {

        it('should pass constructor', function () {
            assert.doesNotThrow(function () {
                new Ausweisnummer(new_valid);
            });
        });

        it('should split the ID into parts', function () {
            var an = new Ausweisnummer(new_valid);

            assert.equal('T22000129', an.number);
            assert.equal(3, an.number_cd);

            assert.equal(640812, an.birthdate);
            assert.equal(5, an.birthdate_cd);

            assert.equal(201031, an.expiry);
            assert.equal(5, an.expiry_cd);

            assert.equal(4, an.full_cd);
        });
    });

    describe('invalid', function () {
        it('should detect invalid number part format', function () {
            assert.throws(function () {
                // A not allowed in number part
                new Ausweisnummer('A22000129364081252010315D4');
            }, /number has invalid format/);
        });

        it('should detect wrong number check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129264081252010315D4');
            }, /invalid number_cd/);
        });

        // 13 months
        it('should detect invalid birthdate part format', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129364131252010315D4');
            }, /birthdate has invalid format/);
        });

        it('should detect wrong birthdate check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129364081242010315D4');
            }, /invalid birthdate_cd/);
        });

        // 32 days
        it('should detect invalid expiry date part format', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129364081252010325D4');
            }, /expiry has invalid format/);
        });

        it('should detect wrong expiry date check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129364081252010316D4');
            }, /invalid expiry_cd/);
        });

        it('should detect wrong full check digit', function () {
            assert.throws(function () {
                new Ausweisnummer('T22000129364081252010315D0');
            }, /invalid full_cd/);
        });
    });
});



describe('wrong format', function () {
    it('should validate 26 chars are passed in', function () {
        assert.throws(function () {
            new Ausweisnummer('12345678');
        }, /id must be 26 characters long/);
    });

    it('should validate from the nationality position that format is wrong', function () {
        assert.throws(function () {
            new Ausweisnummer('T22000D1293640812520103150');
        }, /unrecognized id format/);
    });
});
