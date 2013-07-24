//
// Instance routes.
//
// All the middleware stuff should be handled here, then the controller will not have to deal with that.
//
// Christophe Hamerling - chamerling@linagora.com
//

/**
 * Initialize routes for forms and instances.
 * @param app
 */
module.exports = function(app) {
  
  var instances = require('../controllers/instance');

  app.get('/instances', instances.list);
  app.get('/instances/:id', instances.instance);
  app.post('/instances', instances.create);
  app.del('/instances/:id', instances.delete);
  app.post('/instances/:id', instances.update);
}
