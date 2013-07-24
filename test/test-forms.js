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
  , Form = mongoose.model('Form');

var count;

describe('Forms', function () {

  this.timeout(50000);

  before(function (done) {
    var form = new Form(
      {
        name : 'chamerling',
        text : 'foo'
      });
    form.save(done);
  })

  describe('GET /forms', function () {
    it('should respond with Content-Type application/json', function (done) {
      request(app)
        .get('/forms')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end(done)
    })
  })

  describe('POST /forms', function() {
    // count forms
    before(function(done) {
      Form.count(function(err, cnt) {
        count = cnt;
        done();
      })
    })

    // call the form API
    it('post new form', function(done) {
      var form = {
        name: 'Mila',
        brother: 'Loris'
      }
      request(app)
        .post('/forms')
        .send(form)
        .expect(201)
        .end(done)
    })

    // count form again
    it('should insert a record to the database', function (done) {
      Form.count(function (err, cnt) {
        cnt.should.equal(count + 1)
        done()
      })
    })

    it('should save the form in the database', function(done) {
      Form.findOne({ name: 'Mila' }).exec(function (err, form) {
        should.not.exist(err)
        // FIXME : Find a way to introspect Form
        // since brother is not defined in Form, is is undefined when calling form.brother
        form.should.be.an.instanceOf(Form)
        var p = JSON.parse(JSON.stringify(form));
        p.brother.should.equal('Loris')
        done()
      })
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
