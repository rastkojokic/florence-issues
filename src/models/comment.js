var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _issue : { 
    type: Number, 
    ref: 'Issue' 
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

