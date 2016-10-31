var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    name: String,
    path: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

