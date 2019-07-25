const assert = require('assert');
const filter = require('../util/filter.js');
const expect = require('chai');


describe('filter by city function', function () {
    it('should return matching cities', function () {
        const sheet = [{"city":"right"}, {"city":"wrong"}];
        const city = "right";

        const results = filter.filterByCity(city, sheet);

        assert.strictEqual(results.length, 1);
    });

    it('should not return any matches when given correct JSON', function () {
        const sheet = [{"city":"right"}, {"city":"wrong"}];
        const city = "extra";

        const results = filter.filterByCity(city, sheet);

        assert.strictEqual(results.length, 0);
    });

    it('should not return any matches when given no JSON', function () {
        const sheet = [];
        const city = "extra";

        const results = filter.filterByCity(city, sheet);

        assert.strictEqual(results.length, 0);
    });

    it('should not return any matches when given different JSON object', function () {
        const sheet = [{"place":"right"}];
        const city = "extra";

        const results = filter.filterByCity(city, sheet);

        assert.strictEqual(results.length, 0);
    })
});

describe('filter by year function', function () {
    it('should return matching years', function () {
        const match = {"year": 1897, "title" : "Rome"};
        const sheet = [match , {"year":1898, "title" : "Paris"}];
        const year = 1897;
        const matchList = [ {"year": 1897, "title" : "Rome"} ];

        const results = filter.filterByYear(year, sheet);

        assert.strictEqual(JSON.stringify(results), JSON.stringify(matchList));
    });

    it('should not return any matches when given correct JSON', function () {
        const sheet = [{"year": 1897, "title" : "Rome"} , {"year":1898, "title" : "Paris"}];
        const year = 1899;

        const results = filter.filterByYear(year, sheet);

        assert.strictEqual(results.length, 0);
    });

    it('should not return any matches when given no JSON', function () {
        const sheet = [];
        const year = 1899;

        const results = filter.filterByYear(year, sheet);

        assert.strictEqual(JSON.stringify(results), '[]');
    });

    it('should not return any matches when given different JSON object', function () {
        const sheet = [{"place":"right"}];
        const year = 1900;

        const results = filter.filterByYear(year, sheet);

        assert.strictEqual(results.length, 0);
    })

});


