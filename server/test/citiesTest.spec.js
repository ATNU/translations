const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

describe('add new location', function() {
    this.timeout(5000); //how long to wait for a response

    before(function () {

    });

    after(function () {

    });

    it('should return 200 an array of JSON',  function() {
        return chai.request(app)
            .get('/api/cities')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            })

    });


});


