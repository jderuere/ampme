var server = require('../../../app');

describe('controllers', function () {

  describe('find_manager', function () {

    describe('GET /managers/find', function () {

      it('should return the eastern party manager', function (done) {

        request(server)
          .get('/managers/find')
          .query({ lat: '45', lng: '-70' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res.body).to.eql('pmng1.us­east.ampme.com');
            done();
          });
      });
    });
  });
});
