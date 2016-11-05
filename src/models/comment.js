var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 250,
    match: /[^\s-]/
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

commentSchema.plugin(mongoosePaginate);

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

