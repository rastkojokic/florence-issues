var express = require('express');
var router = express.Router();
var controller = require('./controller');
var middleware = require('./middleware');

router.post('/', middleware.createIssue(), controller.post);
router.get('/', controller.list);

module.exports = router;

