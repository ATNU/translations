
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

describe('get all texts', function() {
    this.timeout(5000); //how long to wait for a response

    before(function() {

    });

    after(function() {

    });

    it('should return 200 and an array of JSON texts', function() {
        return chai.request(app)
            .get('/api/allTexts')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            })
    });

    it('should return 404 with parameter', function() {
        return chai.request(app)
            .get('/api/allTexts/134')
            .then(function (res) {
                expect(res).to.have.status(404);
            })
    });

    it('should return 404 with incorrect URL', function() {
        return chai.request(app)
            .get('/api/tester')
            .then(function (res) {
                expect(res).to.have.status(404);
            })
    });


});



