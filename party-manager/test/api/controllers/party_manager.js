var server = require('../../../app');

describe('controllers', function () {

  describe('party_manager', function () {

    describe('POST /parties', function () {

      it('should return a new party', function (done) {

        request(server)
          .post('/parties')
          .send({ device_id: '123' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res.body.participant_id).to.eql(0);
            expect(res.body.status_code).to.eql('ON GOING');
            expect(res.body.party_code).to.exist;
            done();
          });
      });
    });

    describe('POST /parties/{party_code}/participants', function () {

      var partyCode;

      before(function (done) {
        request(server)
          .post('/parties')
          .send({ device_id: '1234' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            partyCode = res.body.party_code;
            done();
          });
      });

      it('should return a party with one participant', function (done) {

        request(server)
          .post(`/parties/${partyCode}/participants`)
          .send({ device_id: '789', participant_name: 'john doe' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res.body).to.eql({
              status_code: 'ON GOING',
              party_code: partyCode,
              participant_id: 1,
              device_id: '1234'
            });
            done();
          });
      });
    });
  });
});
