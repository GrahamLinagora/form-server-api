//
// Instance schema. Do not set it to strict since schema is not defined for instances for now.
//
// Vincent Zurczak - vzurczak@linagora.com
//

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var InstanceSchema = new Schema({
  name: String,
  description: String,
  form: {type : Schema.ObjectId, ref : 'Form'},
  published_on: { type : Date, default: Date.now },
  open: { type : Boolean, default: Boolean.true }
  },
  {
    strict : false
  }
);

InstanceSchema.pre('save', function(next) {
  console.log('Saving Form Instance', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
InstanceSchema.statics = {

  /**
   * Find instance by id and populate form
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('form')
      .exec(cb)
  },

  /**
   * Get a list of instance based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('form')
      .sort({'published_on': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

InstanceSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Instance', InstanceSchema);