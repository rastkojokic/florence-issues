var Schema = require('mongoose').Schema;
var Comment = require('../../models/comment');

describe('Model Comment', function() {
  describe('attributes', function() {
    var schemaObj = Comment.schema.obj;

    it('has text with String type', function(done) {
      expect(schemaObj.text.type).to.equal(String);
      expect(schemaObj.text.required).to.equal(true);
      expect(schemaObj.text.maxlength).to.equal(250);

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
