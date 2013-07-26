//
// Populate the database using the REST API
//
// Christophe Hamerling - chamerling@linagora.com
//

var request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , conf = require('../config/config')[env];

var getForm = function(i) {
  return {
    name : 'My Form' + i,
    model : {
      foo: 'bar',
      bar: 'baz'
    }
  }
}

var put = function(i) {
  request({
    uri: 'http://' + conf.host + ':' + conf.port + '/forms',
    method: 'post',
    body: getForm(i),
    json: true
  }, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(res.statusCode)
      if (res.statusCode == 201) {
        console.log('Created')
      } else {
        console.log('Bad return code')
      }
    }
  });
}

for (var i = 0; i < 10000; i++) {
  put(i);
}

