//
// Application routes.
//
// All the middleware stuff should be handled here, then the controller will not have to deal with that.
//

/**
 * Initialize routes for Applications.
 * @param app
 */
module.exports = function(app) {
  
  var applications = require('../controllers/applications');
  
	app.get('/applications/:id', applications.run);

}
