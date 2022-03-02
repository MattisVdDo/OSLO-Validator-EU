require('dotenv').config();

var env = process.env.TARGET_ENV || 'development'

var config = {
  local: require('../config/local.js'),
  development: require('../config/development.js'),
  production: require('../config/production.js'),
  staging: require('../config/staging.js')
}

console.log(env)

module.exports = config[env];
