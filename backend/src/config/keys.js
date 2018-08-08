if (process.env.NODE_ENV === 'production') {
  // return prod keys
  module.exports = require('./prod');// eslint-disable-line
} else {
  // return dev keys
  module.exports = require('./dev');// eslint-disable-line
}
