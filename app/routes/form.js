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
}
