//
// Form schema. Do not set it to strict since schema is not defined for forms for now.
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var FormSchema = new Schema({
  name : String,
  description : String,
  created_at : { type : Date, default: Date.now }
  },
  {
    strict : false
  }
);

FormSchema.pre('save', function(next) {
  console.log('Saving Form', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
FormSchema.statics = {

  /**
   * Find form by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * Get a list of forms based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'published_on': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

FormSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Form', FormSchema);