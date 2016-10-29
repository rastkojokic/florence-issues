var Issue = require('../../models/issue');

describe('Model Issue', function() {
  describe('attributes', function() {
    var schemaObj = Issue.schema.obj;

    it('has description with String type', function(done) {
      expect(schemaObj.description).to.equal(String);

      done();
    });

    it('has status with String type', function(done) {
      expect(schemaObj.status.type).to.equal(String);
      expect(schemaObj.status.default).to.equal('pending');

      done();
    });

    it('has comments', function(done) {
      expect(schemaObj.comments[0].text).to.equal(String);
      expect(schemaObj.comments[0].createdAt.type).to.equal(Date);
      expect(schemaObj.comments[0].createdAt.default).to.equal(Date.now);

      done();
    });

    it('has files', function(done) {
      expect(schemaObj.files[0].name).to.equal(String);
      expect(schemaObj.files[0].path).to.equal(String);
      expect(schemaObj.files[0].createdAt.type).to.equal(Date);
      expect(schemaObj.files[0].createdAt.default).to.equal(Date.now);

      done();
    });

    it('has createdAt with Date type', function(done) {
      expect(schemaObj.createdAt.type).to.equal(Date);
      expect(schemaObj.createdAt.default).to.equal(Date.now);

      done();
    });
  });
});
