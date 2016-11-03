var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var issueSchema = new Schema({
  status: {
    type: String,
    default: 'pending'
  },
  comments: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

issueSchema.plugin(mongoosePaginate);

var Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

