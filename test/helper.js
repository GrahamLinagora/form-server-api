//
// Helper for mongo data
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , async = require('async')
  , Form = mongoose.model('Form')
  , Instance = mongoose.model('Instance')

/**
 * Clear database
 *
 * @param {Function} done
 * @api public
 */
exports.clearDb = function (done) {
  var callback = function (item, fn) { item.remove(fn) }

  async.parallel([
    function (cb) {
      Form.find().exec(function (err, forms) {
        async.forEach(forms, callback, cb)
      })
    },
    function (cb) {
      Instance.find().exec(function (err, instances) {
        async.forEach(instances, callback, cb)
      })
    }
  ], done)
}
