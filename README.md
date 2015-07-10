# personalausweis
German ID Card Validation in node.js

Install with:

    npm install personalausweis


Usage:

```js
    var Personalausweis = require('personalausweis');

    // valid ID
    var valid = '1220001297D640812517103198';

    new Personalausweiss(valid);


    // invalid ID
    var invalid = '1220001297';

    > new Personalausweis(invalid);
    // AssertionError: id must be 26 characters long

    // format errors

    // unrecognized id format
    // number has invalid format
    // number_cd has invalid format
    // birthdate has invalid format
    // birthdate_cd has invalid format
    // expiry has invalid format
    // expiry_cd has invalid format
    // full_cd has invalid format

    // checkdigit errors

    // invalid number_cd
    // invalid birthdate_cd
    // invalid expiry_cd
    // invalid full_cd

```
