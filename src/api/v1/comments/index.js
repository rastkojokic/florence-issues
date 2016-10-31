var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('./controller');
var middlewares = require('./middlewares');

router.post('/', middlewares.createComment(), controller.create);
router.get('/', middlewares.getComments(), controller.list);

module.exports = router;

