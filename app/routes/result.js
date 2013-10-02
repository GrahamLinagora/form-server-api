//
// Result routes.
//
// All the middleware stuff should be handled here, then the controller will not have to deal with that.
//
// Christophe Hamerling - chamerling@linagora.com
//

/**
 * Initialize routes for results
 * @param app
 */
module.exports = function(app) {

  var results = require('../controllers/result');

  app.get('/results', results.list);
  app.get('/results/:id', results.result);
  app.post('/results', results.create);
  app.del('/results/:id', results.delete);
  app.post('/results/:id', results.update);
}
