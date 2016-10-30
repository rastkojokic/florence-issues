var express = require('express');
var router = express.Router();
var controller = require('./controller');
var middlewares = require('./middlewares');

router.post('/', middlewares.createIssue(), controller.create);
router.get('/:id', controller.show);
router.get('/', controller.list);
router.delete('/:id', controller.destroy);

module.exports = router;

