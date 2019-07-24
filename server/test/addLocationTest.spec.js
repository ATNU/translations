const assert = require('assert');
const addLocation = require('../routes/addLocation.js');
const expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();

describe('filter by city test', function () {
    it('should return matching cities', function () {
        const sheet = [{"city":"right"}, {"city":"wrong"}];
        const city = "right";
        const results = filterByCity(city, sheet);
        assert.equal(results.length, 1);
    })

    //it shouldn't return any cities
})

//describe location route reached
//it should send error 401 and message
