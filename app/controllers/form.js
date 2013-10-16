//
// Forms controller.
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , Form = mongoose.model('Form')

/**
 * Get forms list
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  var query = {};
  // name filter
  if (req.query.name) {
    query.name = req.query.name;
  }
	if (req.query.older) {
		query.created_at = { $lt : req.query.older };
	}

	var handleQueryResponse = function (err, forms) {
		if (err) {
		  res.send(500, err);
		} else {
		  res.json(forms);
  	}
	};

	if (req.query.limit) {
		var q = Form.find(query).limit(req.query.limit);
		q.execFind(handleQueryResponse);
	}
	else {
		Form.find(query, handleQueryResponse);
  }
}

/**
 * Get a form
 *
 * @param req
 * @param res
 */
exports.form = function(req, res) {
  Form.findById(req.params.id, function(err, form) {
    if (err) return res.send(500, err);
    if (!form) return res.json(404, {error : 'Can not find form with ID:' + req.params.id});
    res.json(form);
  })
}

/**
 * Create a form
 *
 * @param req
 * @param res
 */
exports.create = function(req, res) {
  Form.create(req.body, function(err, savedForm) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(201, savedForm);
    }
  });
}

/**
 * Delete a form
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
  Form.findByIdAndRemove(req.params.id, function(err, form) {
    if (err) return res.send(500, err);
    if (!form) return res.json(404, {error : 'Can not find form with ID:' + req.params.id});
    res.send(204);
  });
};

/**
 * Update a form
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  Form.findByIdAndUpdate(req.params.id, req.body,function(err, form) {
    if (err) {
//TODO remove trace
	console.log(err);
		return res.send(500, err);
}
    if (!form) return res.json(404, {error : 'Can not find form with ID:' + req.params.id});
    res.send(200);
  });
}
