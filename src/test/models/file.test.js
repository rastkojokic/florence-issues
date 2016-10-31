var Schema = require('mongoose').Schema;
var File = require('../../models/file');

describe('Model File', function() {
  describe('attributes', function() {
    var schemaObj = File.schema.obj;

    it('has path with String type', function(done) {
      expect(schemaObj.path.type).to.equal(String);
      expect(schemaObj.path.required).to.equal(true);

      done();
    });

    it('has createdAt with Date type', function(done) {
      expect(schemaObj.createdAt.type).to.equal(Date);
      expect(schemaObj.createdAt.default).to.equal(Date.now);

      done();
    });

    it('has _issue that references Issue', function(done) {
      expect(schemaObj._issue[0].type).to.equal(Schema.Types.ObjectId);
      expect(schemaObj._issue[0].ref).to.equal('Issue');

      done();
    });
  });
});
