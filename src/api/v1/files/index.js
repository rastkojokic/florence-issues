var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('./controller');
var middlewares = require('./middlewares');

router.post('/', middlewares.upload(), controller.upload);
router.get('/:id', middlewares.download(), controller.download);

module.exports = router;

