var requestsHelpers = require('../../../helpers/issues/requests');
var seedHelpers = require('../../../helpers/issues/seeders');

describe('API Issues', function() {
  describe('get issues', function() {
    var perPage = 10;
    var response;
    var body;

    beforeEach(function(done) {
      seedHelpers.seedIssues({
        count: 24
      }, function(data) {
        done();
      });
    });

    describe('not specifying page number', function() {
      beforeEach(function(done) {
        requestsHelpers.getIssues({}, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });

      it('returns response with status 200', function(done) {
        expect(response.statusCode).to.equal(200);

        done();
      });

      it('returns paginated issues', function(done) {
        expect(body.length).to.equal(10);

        done();
      });

      it('returns header containing total count', function(done) {
        expect(response.headers['x-total-count']).to.equal('24');

        done();
      });

      it('returns header containing total pages', function(done) {
        expect(response.headers['x-total-pages']).to.equal('3');

        done();
      });

      it('returns header containing next page', function(done) {
        expect(response.headers['x-current-page']).to.equal('1');

        done();
      });
    });

    describe('specifying page number', function() {
      beforeEach(function(done) {
        requestsHelpers.getIssues({
          page: 3,
          limit: 10
        },
        function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });

      it('returns response with status 200', function(done) {
        expect(response.statusCode).to.equal(200);

        done();
      });

      it('returns paginated issues', function(done) {
        expect(body.length).to.equal(4);

        done();
      });

      it('returns header containing total count', function(done) {
        expect(response.headers['x-total-count']).to.equal('24');

        done();
      });

      it('returns header containing total pages', function(done) {
        expect(response.headers['x-total-pages']).to.equal('3');

        done();
      });

      it('returns header containing next page', function(done) {
        expect(response.headers['x-current-page']).to.equal('3');

        done();
      });
    });

    describe('specifying page number that is greater than total page numbers', function() {
      beforeEach(function(done) {
        requestsHelpers.getIssues({
          page: 30,
          limit: 10
        },
        function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });

      it('returns response with status 200', function(done) {
        expect(response.statusCode).to.equal(200);

        done();
      });

      it('returns paginated issues', function(done) {
        expect(body.length).to.equal(0);

        done();
      });

      it('returns header containing total count', function(done) {
        expect(response.headers['x-total-count']).to.equal('24');

        done();
      });

      it('returns header containing total pages', function(done) {
        expect(response.headers['x-total-pages']).to.equal('3');

        done();
      });

      it('returns header containing next page', function(done) {
        expect(response.headers['x-current-page']).to.equal('30');

        done();
      });
    });
  });
});

