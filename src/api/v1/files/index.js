var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('./controller');
var middlewares = require('./middlewares');

router.post('/', middlewares.upload(), controller.upload);

module.exports = router;

