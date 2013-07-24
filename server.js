//
// Form server: Provides REST API for store and retrieve forms as JSON.
//
// Christophe Hamerling - chamerling@linagora.com
//

var express = require('express')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , path = require('path');

// Load configuration for environment
var env = process.env.NODE_ENV || 'development'
  , conf = require('./config/config')[env];

mongoose.set('debug', conf.mongo.debug)
mongoose.connect(conf.mongo.uri);

// boostrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + '/' + file)
})

// configure express
var app = express();
require('./config/express')(app, conf);

// init routes
var routes = __dirname + '/app/routes';
fs.readdirSync(routes).forEach(function(file) {
  require(routes + '/' + file)(app);
});
//require('./config/routes')(app);

app.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  console.log('Form server API started on', app.get('port'))
});