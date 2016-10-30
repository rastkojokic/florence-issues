var issuesTestHelper = require('../../../helpers/issues');

describe('API Issues', function() {
  describe('create issue', function() {
    var response;
    var body;

    describe('empty form', function() {
      before(function(done) {
        issuesTestHelper.createIssue({}, function(err, res) {
          if (err) {
            console.log(err);
            return;
          }

          response = res;
          body = JSON.parse(res.body);

          done();
        });
      });

      it('returns status 201', function(done) {
        expect(response.statusCode).to.equal(201);

        done();
      });
      
      it('returns Location header', function(done) {
        expect(response.headers.location).to.include('/api/v1/issues/');

        done();
      });

      it('creates issue with status set to pending', function(done) {
        expect(body.status).to.equal('pending');

        done();
      });
    });

    describe('status set in form', function() {
      describe('valid status', function() {
        before(function(done) {
          issuesTestHelper.createIssue({
            attributes: {
              status: 'complete'
            }
          }, function(err, res) {
            if (err) {
              console.log(err);
              return;
            }

            response = res;
            body = JSON.parse(res.body);

            done();
          });
        });

        it('creates issue with status set to completed', function(done) {
          expect(body.status).to.equal('complete');

          done();
        });
      });
      
      describe('valid status', function() {
        before(function(done) {
          issuesTestHelper.createIssue({
            attributes: {
              status: 'invalid'
            }
          }, function(err, res) {
            if (err) {
              console.log(err);
              return;
            }

            response = res;
            body = JSON.parse(res.body);

            done();
          });
        });

        it('returns bad request response', function(done) {
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });

    describe('createdAt set in form', function() {
      before(function(done) {
        issuesTestHelper.createIssue({
          attributes: {
            createdAt: '2016-05-08T00:00:00.000Z'
          }
        }, function(err, res) {
          if (err) {
            console.log(err);
            return;
          }

          response = res;
          body = JSON.parse(res.body);

          done();
        });
      });

      it('creates issue with current time and date', function(done) {
        expect(body.createdAt).not.to.equal('2016-05-08T00:00:00.000Z');

        done();
      });
    });
  });
});
