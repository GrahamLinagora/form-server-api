//
// Form deletion request
//
// Graham Crosmarie - gcrosmarie@linagora.com
//

var request = require('request')
  , env = process.env.NODE_ENV || 'development'
  , conf = require('../config/config')[env]
  , readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Input a form id :", function(answer) {
  console.log("You asked to delete form with id : ", answer);

	request({
		 uri: 'http://' + conf.host + ':' + conf.port + '/forms/' + answer,
		 method: 'delete'
	  }, function(err, res, body) {
		 if (err) {
		   console.log(err)
		 } else {
		   if (res.statusCode == 200) {
		     console.log('Form Deleted');
		   } else {
		     console.log('Bad return code : %s', res.statusCode);
		   }
		 }
	  }
	);

  rl.close();
});
