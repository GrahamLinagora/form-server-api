//
// Result schema. Do not set it to strict since schema is not defined for results.
// A result is linked to an instance an not to a form since we can have N instances per form.
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ResultSchema = new Schema({
    // the result is linked to a form
    instance: {type : Schema.ObjectId, ref : 'Instance'},
    // the result is created at
    created_at : { type : Date, default: Date.now }
  },
  {
    strict : false
  }
);

ResultSchema.pre('save', function(next) {
  console.log('Saving Result', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
ResultSchema.statics = {

  /**
   * Find result by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('instance')
      .exec(cb)
  },

  /**
   * Get a list of results based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('instance')
      .sort({'created_at': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  },

  /**
   * Get all the results for a given instance
   *
   * @param formId
   * @param cb
   */
  getForInstance : function(instanceId, cb) {
    this.find({'instance' : instanceId})
      .populate('instance')
      .sort({'created_at' : -1})
      .exec(cb);
  }
}

ResultSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Result', ResultSchema);