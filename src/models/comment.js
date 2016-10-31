var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 250
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _issue : [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Issue' 
  }]
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

