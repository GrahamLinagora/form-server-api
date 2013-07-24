//
// Form and instance routes.
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

  var forms = require('../controllers/form');

  app.get('/forms', forms.list);
  app.get('/forms/:id', forms.form);
  app.post('/forms', forms.create);
  app.del('/forms/:id', forms.delete);
  app.post('/forms/:id', forms.update);
  
  var instances = require('../controllers/instance');

  app.get('/instances', instances.list);
  app.get('/instances/:id', instances.instance);
  app.post('/instances', instances.create);
  app.del('/instances/:id', instances.delete);
  app.post('/instances/:id', instances.update);

  // TODO : Load form from param and update routes above to use the request param.
  //app.param('id', forms.form);

}
