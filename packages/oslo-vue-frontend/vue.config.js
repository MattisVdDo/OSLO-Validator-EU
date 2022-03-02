// TODO: this should be set from the config object
// for a local build the value should be /

module.exports = {
  publicPath: process.env.TARGET_ENV === 'local'
    ? '/'
    : '/shacl-validator'
};
