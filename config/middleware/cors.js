//
// Cross Domain Middleware: Allow calls from clients running on other instances.
//
// Christophe Hamerling - @chamerling
//

module.exports = function(app, config) {

  // TODO : check if there is no restriction in the configuration for this middleware
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
}

