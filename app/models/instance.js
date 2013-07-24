//
// Instance schema. Do not set it to strict since schema is not defined for instances for now.
//
// Vincent Zurczak - vzurczak@linagora.com
//

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var InstanceSchema = new Schema({
  name: String,
  description: String,
  form_id: String,
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

InstanceSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Instance', InstanceSchema);