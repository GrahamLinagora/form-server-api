//
// One shot form creation
//
// Christophe Hamerling - chamerling@linagora.com
//

var request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , conf = require('../config/config')[env];

var form = {
  name : 'My Form',
  model : {
    foo: 'bar',
    bar: 'baz'
  }
}

request({
    uri: 'http://' + conf.host + ':' + conf.port + '/forms',
    method: 'post',
    body: form,
    json: true
  }, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(res.statusCode)
      if (res.statusCode == 201) {
        console.log('Created', body)
      } else {
        console.log('Bad return code')
      }
    }
  }
);