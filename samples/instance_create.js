//
// One shot instance creation
//
// Christophe Hamerling - chamerling@linagora.com
//

var request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , conf = require('../config/config')[env];

var instance = {
    name: 'My Instance',
    description: 'Lore Ipsum...',
    form_id: '123456789',
    open: Boolean.true
}

request({
    uri: 'http://' + conf.host + ':' + conf.port + '/instances',
    method: 'post',
    body: instance,
    json: true
  }, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(res.statusCode)
      if (res.statusCode == 201) {
        console.log('Instance has been created', body)
      } else {
        console.log('Bad return code', res.statusCode)
      }
    }
  }
);