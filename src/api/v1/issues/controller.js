var Issue = require('../../../models/issue');

/**
 * @api {post} /issues Create issue
 * @apiName CreateIssue
 * @apiGroup Issue
 * @apiDescription Create issue with with specified or if not default status
 *
 * @apiParam {String="pending","complete"} [status="pending"] Issue status
 *
 * @apiSuccess (201) {String} status Status of the Issue
 * @apiSuccess (201) {String} createdAt Time of creation
 * @apiSuccess (201) {Object} files Issue files
 * @apiSuccess (201) {Object} comments Issue comments
 *
 * @apiError (500) {String} message Error info
 */
exports.create = function(req, res) {
  Issue.create(req.body)
  .then(function(savedIssue) {
    res.location(req.baseUrl + '/' + savedIssue._id);

    res.status(201).json(savedIssue);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {get} /issues/:id Get issue
 * @apiName GetIssue
 * @apiGroup Issue
 * @apiDescription Get issue with given :id with all of its files and with comment ids
 *
 * @apiSuccess (200) {String} status Status of the Issue
 * @apiSuccess (200) {String} createdAt Time of creation
 * @apiSuccess (200) {Object} files Issue files
 * @apiSuccess (200) {Object} comments Issue comments' ids
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Error info
 */
exports.show = function(req, res) {
  Issue.findOne({ _id: req.params.id })
  .populate(['files'])
  .then(function(issue) {
    if (!issue) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json(issue);
  })
  .catch(function(err) {
    if (err.kind === 'ObjectId' && err.name === 'CastError') {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {get} /issues Get issues
 * @apiName GetIssue
 * @apiGroup Issue
 * @apiDescription Get all the issues from the database using pagination
 *
 * @apiParam {Number} page Page of the issues collection
 * @apiParam {Number} limit Documents per page
 *
 * @apiSuccess (200) {Array} Array of issues
 * @apiSuccess (PaginationResponseHeader) {String} x-total-count Number of total documents
 * @apiSuccess (PaginationResponseHeader) {String} x-total-pages Number of total pages
 * @apiSuccess (PaginationResponseHeader) {String} x-current-page Current page
 *
 * @apiError (500) {String} message Error info
 */
exports.list = function(req, res, next) {
  Issue.paginate({}, { 
    page: parseInt(req.query.page) || 1, 
    limit: parseInt(req.query.limit) || 10, 
    populate: ['files'] 
  })
  .then(function(issues) {
    res.set({
      'X-Total-Count': issues.total,
      'X-Total-Pages': issues.pages,
      'X-Current-Page': issues.page
    });

    res.status(200).json(issues.docs);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {delete} /issues/:id Delete the specified issue
 * @apiName DeleteIssue
 * @apiGroup Issue
 * @apiDescription Delete the issue with :id
 *
 * @apiParam {Number} page Page of the issues collection
 * @apiParam {Number} limit Documents per page
 *
 * @apiSuccess (200) {String} message Issue delete successfully info
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Error info
 */
exports.destroy = function(req, res) {
  Issue.findByIdAndRemove(req.params.id)
  .then(function(removedIssue) {
    if (!removedIssue) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json({ message: 'Issue removed' });
  })
  .catch(function(err) {
    if (err.kind === 'ObjectId' && err.name === 'CastError') {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

/**
 * @api {patch} /issues/:id Update issue
 * @apiName UpdateIssue
 * @apiGroup Issue
 * @apiDescription Update the issue with given :id
 *
 * @apiParam {String="pending","complete"} [status="pending"] Issue status
 *
 * @apiSuccess (200) {String} status Status of the Issue
 * @apiSuccess (200) {String} createdAt Time of creation
 * @apiSuccess (200) {Object} files Issue files
 * @apiSuccess (200) {Object} comments Issue comments
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Error info
 */
exports.update = function(req, res) {
  Issue.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(function(updatedIssue) {
    if (!updatedIssue) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.status(200).json(updatedIssue);
  })
  .catch(function(err) {
    if (err.kind === 'ObjectId' && err.name === 'CastError') {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

