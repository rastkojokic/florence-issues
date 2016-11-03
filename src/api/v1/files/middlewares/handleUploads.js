var config = require('../../../../config');
var multer  = require('multer');
var upload = multer({
  dest: config.FILE_STORAGE,
  limits: { fileSize: 500 }
}).array('files', 10);

module.exports = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      var message = 'Bad request';

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Maximum number of uploading files exceeded';
      }

      res.status(400).json({ message: message });
      return;
    }

    next();
  });
}

