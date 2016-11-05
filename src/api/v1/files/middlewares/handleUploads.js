var config = require('../../../../config');
var multer  = require('multer');
var upload = multer({
  dest: config.FILE_STORAGE,
  limits: { fileSize: 1048576 } // 1 MB
}).array('files', 10);

module.exports = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      var message = 'Bad request';

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Maximum number of uploading files exceeded';
      }

      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'File limit exceeded (1 MB maximum)';
      }

      res.status(400).json({ message: message });
      return;
    }

    next();
  });
};

