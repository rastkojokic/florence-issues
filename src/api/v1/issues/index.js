var express = require('express');
var router = express.Router();
var controller = require('./controller');
var middlewares = require('./middlewares');

router.post('/', middlewares.createIssue(), controller.create);
router.get('/:id', controller.show);
router.get('/', controller.list);
router.delete('/:id', controller.destroy);
router.patch('/:id', middlewares.updateIssue(), controller.update);

module.exports = router;

