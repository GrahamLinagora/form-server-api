//
// Configuration settings
//
// Christophe Hamerling - chamerling@linagora.com
//

module.exports = {
  development: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || 'localhost',
    mongo: {
      uri: 'mongodb://localhost:27017/openpaas_dev',
      debug: false
    }
  },
  test: {
    port: process.env.PORT || 3001,
    host: process.env.HOSTNAME || 'localhost',
    mongo: {
      uri: 'mongodb://localhost:27017/openpaas_test',
      debug: false
    }
  },
  production: {}
}