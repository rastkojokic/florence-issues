var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Issue = require('../../models/issue');

describe('Model Issue', function() {
  describe('attributes', function() {
    var schemaObj = Issue.schema.obj;

    it('has status with String type', function(done) {
      expect(schemaObj.status.type).to.equal(String);
      expect(schemaObj.status.default).to.equal('pending');

      done();
    });

    it('has comments', function(done) {
      expect(schemaObj.comments[0].type).to.equal(Schema.Types.ObjectId);
      expect(schemaObj.comments[0].ref).to.equal('Comment');

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
