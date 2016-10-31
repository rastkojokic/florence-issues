var Comment = require('../../models/comment');

describe('Model Comment', function() {
  describe('attributes', function() {
    var schemaObj = Comment.schema.obj;

    it('has text with String type', function(done) {
      expect(schemaObj.text.type).to.equal(String);
      expect(schemaObj.text.required).to.equal(true);

      done();
    });

    it('has createdAt with Date type', function(done) {
      expect(schemaObj.createdAt.type).to.equal(Date);
      expect(schemaObj.createdAt.default).to.equal(Date.now);

      done();
    });

    it('has _issue that references Issue', function(done) {
      expect(schemaObj._issue.type).to.equal(Number);
      expect(schemaObj._issue.ref).to.equal('Issue');

      done();
    });
  });
});
