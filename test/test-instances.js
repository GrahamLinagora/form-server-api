//
// Test forms API
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , Instance = mongoose.model('Instance')
  , Form = mongoose.model('Form');

var count;

describe('Instances', function () {

  this.timeout(50000);

  before(function (done) {
    var instance = new Instance(
      {
        name: 'One instance',
        description: 'The instance description'
    });
    instance.save(done);
  })

  describe('GET /instances', function () {
    it('should respond with Content-Type application/json', function (done) {
      request(app)
        .get('/instances')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    })
  })

  describe('POST /instances', function() {
    // count forms
    before(function(done) {
      Instance.count(function(err, cnt) {
        count = cnt;
        done();
      })
    })

    // call the form API
    it('post new instance', function(done) {
      var instance = {
        name: 'Mila',
        brother: 'Loris'
      }
      request(app)
        .post('/instances')
        .send(instance)
        .expect(201)
        .end(done)
    })

    // count form again
    it('should insert an instance in the database', function (done) {
      Instance.count(function (err, cnt) {
        cnt.should.equal(count + 1)
        done()
      })
    })

    it('should save the instance in the database', function(done) {
      Instance.findOne({ name: 'Mila' }).exec(function (err, instance) {
        should.not.exist(err)
        // FIXME : Find a way to introspect Instance
        // since brother is not defined in Instance, is is undefined when calling instance.brother
        instance.should.be.an.instanceOf(Instance)
        var p = JSON.parse(JSON.stringify(instance));
        p.brother.should.equal('Loris')
        done()
      })
    })
  })

  describe('Static Load', function() {

    var formId;
    var instanceId;

    before(function (done) {
      var form = new Form({
        name : 'Check Form',
        description : 'The form description'
      });

      form.save(function(err, form) {
        should.not.exist(err);

        formId = form._id;

        var instance = new Instance(
          {
            name: 'Check Form Instance',
            form : form._id,
            description: 'The instance description'
          });
        instance.save(function(err, instance) {
          should.not.exist(err);

          instanceId = instance._id;
          done();
        });
      })
    })

    it('should load the complete form on load', function(done) {
      Instance.load(instanceId, function(err, instance) {
        should.exists(instance);
        instance.should.be.an.instanceof(Instance);
        instance.name.should.eql('Check Form Instance');
        should.exist(instance.form);
        instance.form._id.should.eql(formId);
        instance.form.name.should.eql('Check Form');
        done();
      });
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
