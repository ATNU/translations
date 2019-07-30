const assert = require('assert');
const parser = require('../util/credsParser.js');

describe('parse string pulled from env variables correctly', function () {
  it('should change input correctly', function() {
        const initialString = "\\n";

        const parsedString = parser.parse(initialString);

        assert.strictEqual(parsedString, "\n");

    });

    it('should not change input', function() {
        const initialString = "\n";

        const parsedString = parser.parse(initialString);

        assert.strictEqual(parsedString, "\n");

    })
});