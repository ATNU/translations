const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

const testLocation = {
    'city' : 'Test',
    'latitude': 1234,
    'longitude': 12345
};

describe('add new location', function() {
    this.timeout(5000); //how long to wait for a response

    before(function () {

    });

    after(function () {

    });

    it('should add new location', function() {
        return chai.request(app)
            .post('/api/addLocation')
            .send(testLocation)
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    it('should return not found with wrong URL', function() {
        return chai.request(app)
            .post('/api/addLocation/London')
            .then(function(res) {
                expect(res).to.have.status(404);
            });
    });

    //correct JSON

});