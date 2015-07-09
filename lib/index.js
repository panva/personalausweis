'use strict';

var assert = require('assert');

var YYMMDD = /^\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
var AZ09 = /^[0-9CFGHJKLMNPRTVWXYZ]+$/;
var NUMBER = /^[0-9]{1}$/;
var OLD_FORMAT = /^[0-9]{10}[A-Z]/;
var NEW_FORMAT = /[A-Z]\d$/;

var VALUE_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    'C': 12,
    'F': 15,
    'G': 16,
    'H': 17,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'P': 25,
    'R': 27,
    'T': 29,
    'V': 31,
    'W': 32,
    'X': 33,
    'Y': 34,
    'Z': 35
};

var MULTIPLIER_MAP = {
    0: 7,
    1: 3,
    2: 1
};

function validateCheckDigit(id, check, label) {
    var calculated = id.split('').reduce(function (sum, value, index) {
        return VALUE_MAP[value] * MULTIPLIER_MAP[index % 3] + sum;
    }, 0);

    assert(calculated % 10 == check, ['invalid', label].join(' '));
}

function Ausweisnummer(input) {
    this.splitInput('' + input.toUpperCase());

    validateCheckDigit(this.number, this.number_cd, 'number_cd');
    validateCheckDigit(this.birthdate, this.birthdate_cd, 'birthdate_cd');
    validateCheckDigit(this.expiry, this.expiry_cd, 'expiry_cd');
    validateCheckDigit(
        [
            this.number,
            this.number_cd,
            this.birthdate,
            this.birthdate_cd,
            this.expiry,
            this.expiry_cd
        ].join(''), this.full_cd, 'full_cd'
    );
}

Ausweisnummer.prototype.unifyFormats = function (id) {
    if (OLD_FORMAT.exec(id)) {
        return id.slice(0, 10) + id.slice(11);
    } else if (NEW_FORMAT.exec(id)) {
        return id.slice(0, 24) + id.slice(25);
    }

    assert(false, 'unrecognized id format');
};

Ausweisnummer.prototype.getBirthdate = function () {

};

Ausweisnummer.prototype.splitInput = function (id) {
    assert(id.length === 26, 'id must be 26 characters long');

    id = this.unifyFormats(id);

    this.number = id.slice(0, 9);
    this.number_cd = id.slice(9, 10);
    this.birthdate = id.slice(10, 16);
    this.birthdate_cd = id.slice(16, 17);
    this.expiry = id.slice(17, 23);
    this.expiry_cd = id.slice(23, 24);
    this.full_cd = id.slice(24, 25);

    assert(AZ09.exec(this.number), 'number is invalid');
    assert(NUMBER.exec(this.number_cd), 'number_cd is invalid');
    assert(YYMMDD.exec(this.birthdate), 'birthdate is invalid');
    assert(NUMBER.exec(this.birthdate_cd), 'birthdate_cd is invalid');
    assert(YYMMDD.exec(this.expiry), 'expiry is invalid');
    assert(NUMBER.exec(this.expiry_cd), 'expiry_cd is invalid');
    assert(NUMBER.exec(this.full_cd), 'full_cd is invalid');
};

module.exports = Ausweisnummer;
