var envalid = require('envalid');

module.exports = {
  'development': envalid.str({
    default: 'mongodb://localhost/florenceissue-development'
  }),
  'test': envalid.str({
    default: 'mongodb://localhost/florenceissue-test'
  })
};

