var File = require('../../../models/file');
var Issue = require('../../../models/issue');
var _ = require('lodash');
var config = require('../../../config');
var path = require('path');

/**
 * @api {post} /issues/:issueId/files Upload an issue file
 * @apiName UploadFile
 * @apiGroup File
 * @apiDescription Upload files for issue with :issueId id
 *
 * @apiHeader (UploadFileHeader) {String="multipart/form-data"} Content-Type 
 *
 * @apiParam {Object[]} files Array of uploading files
 *
 * @apiSuccess (200) {String} status Status of the issue
 * @apiSuccess (200) {String} createdAt Time of creation
 * @apiSuccess (200) {Object} files Issue files
 * @apiSuccess (200) {Object} comments Issue comments
 *
 * @apiError (500) {String} message Error info
 */
exports.upload = function(req, res) {
  var issue;

  Issue.findOne({ _id: req.params.issueId })
  .then(function(issueToBeUpdated) {
    issue = issueToBeUpdated;
    var filesToCreate = _.map(req.files, function(file) {
      return {
        path: file.filename,
        _issue: issue._id
      }
    });

    return File.create(filesToCreate);
  })
  .then(function(createdFiles) {
    _.each(createdFiles, function(createdFile) {
      issue.files.push(createdFile);
    });

    return issue.save();
  })
  .then(function(issue) {
    res.status(200).json(issue);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {get} /issues/:issueId/files/:id Download specific file
 * @apiName UploadFile
 * @apiGroup File
 * @apiDescription Download with id :id that belongs to issue with :issueId id
 *
 * @apiSuccess (200) {Object} file Binary file
 *
 * @apiError (500) {String} message Error info
 */
exports.download = function(req, res) {
  File.findOne({ _id: req.params.id })
  .then(function(file) {
    if (!file) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.sendFile(path.join(__dirname, '../../../../' + config.FILE_STORAGE, file.path));
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

