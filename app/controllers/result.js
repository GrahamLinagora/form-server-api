//
// Results controller.
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , Result = mongoose.model('Result')

/**
 * Get results list
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  var query = {};
  if( req.query.instance_id ) {
    query.instance_id = req.query.instance_id;
  }

  Result.find(query, function (err, results) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(results);
    }
  })
}

/**
 * Get a result from its ID
 *
 * @param req
 * @param res
 */
exports.result = function(req, res) {
  Result.findById(req.params.id, function(err, result) {
    if (err) return res.send(500, err);
    if (!result) return res.json(404, {error : 'Can not find result with ID:' + req.params.id});
    res.json(result);
  })
}

/**
 * Create a result
 *
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  Result.create(req.body, function(err, result) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(201, result);
    }
  });
}

/**
 * Delete a result
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
  Result.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) return res.send(500, err);
    if (!result) return res.json(404, {error : 'Can not find result with ID:' + req.params.id});
    res.send(204);
  });
};

/**
 * Update a result
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  Result.findByIdAndUpdate(req.params.id, req.body,function(err, result) {
    if (err) return res.send(500, err);
    if (!result) return res.json(404, {error : 'Can not find result with ID:' + req.params.id});
    res.send(200);
  });
}
