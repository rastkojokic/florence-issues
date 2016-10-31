var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
  path: {
    type: String,
    required: true
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

var File = mongoose.model('File', fileSchema);

module.exports = File;

