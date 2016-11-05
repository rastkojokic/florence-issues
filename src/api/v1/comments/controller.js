var Issue = require('../../../models/issue');
var Comment = require('../../../models/comment');

/**
 * @api {post} /issues/:issueId/comments Create comment for issue
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiDescription Create comment for issue with :issueId id
 *
 * @apiParam {String} text Comment text cannot be blank
 *
 * @apiSuccess (201) {String} text Comment text
 * @apiSuccess (201) {String} createdAt Time of creation
 * @apiSuccess (201) {Object} issue Issue that belongs to
 *
 * @apiBad (400) {String} message Comment text is too long maximum 250 chars
 * @apiBad (400) {String} message Comment text cannot be blank
 *
 * @apiError (500) {String} message Error info
 */
exports.create = function(req, res) {
  var issue;
  var comment;

  Issue.findOne({ _id: req.params.issueId })
  .then(function(issueToBeUpdated) {
    issue = issueToBeUpdated;

    return Comment.create({
      text: req.body.text,
      _issue: req.params.issueId
    });
  })
  .then(function(createdComment) {
    comment = createdComment;
    issue.comments.push(comment);

    return issue.save();
  })
  .then(function(issue) {
    res.status(201).json(comment);
  })
  .catch(function(err) {
    if (err.errors) {
      if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'maxlength') {
        res.status(400).json({ message: 'Bad request: comment text is too long (250 chars maximum)' });
        return;
      } else if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'required') {
        res.status(400).json({ message: 'Bad request: text cannot be blank' });
        return;
      } else if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'regexp') {
        res.status(400).json({ message: 'Bad request: text cannot be blank' });
        return;
      }
    }

    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {get} /issues/:issueId/comments Get issue comments
 * @apiName ListComments
 * @apiGroup Comment
 * @apiDescription Get the comments for the issue with :issueId id
 *
 * @apiParam {Number} page Page of the issues collection
 * @apiParam {Number} limit Documents per page
 *
 * @apiSuccess (200) {Array} Array of comments
 * @apiSuccess (PaginationResponseHeader) {String} x-total-count Number of total documents
 * @apiSuccess (PaginationResponseHeader) {String} x-total-pages Number of total pages
 * @apiSuccess (PaginationResponseHeader) {String} x-current-page Current page
 *
 * @apiError (500) {String} message Error info
 */
exports.list = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  var limit = parseInt(req.query.limit) || 10;

  Comment.paginate({ _issue: req.params.issueId }, {
    page: page, 
    limit: limit 
  })
  .then(function(comments) {
    res.set({
      'X-Total-Count': comments.total,
      'X-Total-Pages': comments.pages,
      'X-Current-Page': comments.page
    });

    res.status(200).json(comments.docs);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

