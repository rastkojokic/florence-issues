var issuesTestHelper = require('../../../helpers/issues');

describe.only('API Issues', function() {
  describe('create issue', function() {
    describe('valid attributes provided', function() {
      var response;
      var body;

      before(function(done) {
        issuesTestHelper.createIssue({
          attributes: {
            description: 'Some description'
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

      it('returns status 200', function(done) {
        expect(response.statusCode).to.equal(200);

        done();
      });

      it('creates issue with suplied attributes', function(done) {
        expect(body.description).to.equal('Some description');

        done();
      });
    });
  });
});
