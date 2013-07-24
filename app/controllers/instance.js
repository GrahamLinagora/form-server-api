//
// Instances controller.
//
// Vincent Zurczak - vzurczak@linagora.com
//

var mongoose = require('mongoose'), Instance = mongoose.model('Instance')

/**
 * Get the list of form instances
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  var query = {};
  
  if( req.query.form_id ) {
	  query.form_id = req.query.form_id;
  }

  Instance.find(query, function (err, forms) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(forms);
    }
  })
}

/**
 * Get a form instance
 *
 * @param req
 * @param res
 */
exports.instance = function(req, res) {
  Instance.findById(req.params.id, function(err, form) {
    if (err) return res.send(500, err);
    if (!form) return res.json(404, {error : 'Can not find a form instance with ID:' + req.params.id});
    res.json(form);
  })
}

/**
 * Create a form instance
 *
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  Instance.create(req.body, function(err, savedInstance) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(201, savedInstance);
    }
  });
}

/**
 * Delete a form instance
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) { 
  Instance.findByIdAndRemove(req.params.id, function(err, form) {
    if (err) return res.send(500, err);
    if (!form) return res.json(404, {error : 'Can not find a form instance with ID:' + req.params.id});
    res.send(200);
  });
};

/**
 * Update a form instance
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  Instance.findByIdAndUpdate(req.params.id, req.body,function(err, form) {
    if (err) return res.send(500, err);
    if (!form) return res.json(404, {error : 'Can not find a form instance with ID:' + req.params.id});
    res.send(200);
  });
}
