//
// One shot form creation
//
// Christophe Hamerling - chamerling@linagora.com
//

var request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , conf = require('../config/config')[env];

var form = {
  name : 'My Other Form',
  description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia sem ut sem vulputate varius. Quisque faucibus ante nec iaculis adipiscing. Duis posuere elit leo, tempor egestas turpis fermentum ac. Aenean massa ligula, malesuada quis erat faucibus, ullamcorper tristique risus. Nulla non lectus quis enim iaculis eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas vel mauris vitae risus molestie elementum ut nec urna. Quisque et risus sed ligula dapibus placerat. Mauris commodo ornare tellus, sit amet feugiat neque pellentesque quis. Donec sed faucibus sem.',
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