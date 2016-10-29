var envalid = require('envalid');

module.exports = {
  'test': envalid.str({
    default: 'mongodb://localhost/florenceissue'
  })
};

