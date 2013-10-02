//
// Test results API
//
// Christophe Hamerling - chamerling@linagora.com
//

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , Result = mongoose.model('Result')
  , Instance = mongoose.model('Instance');

var count;

describe('Results', function () {

  this.timeout(50000);

  before(function (done) {
    var result = new Result(
      {
        foo: 'bar',
        bar: 'baz'
      }
    );
    result.save(done);
  })

  describe('GET /results', function () {
    it('should respond with Content-Type application/json', function (done) {
      request(app)
        .get('/results')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    })
  })

  describe('POST /results', function() {
    // count forms
    before(function(done) {
      Result.count(function(err, cnt) {
        count = cnt;
        done();
      })
    })

    // call the form API
    it('post new result', function(done) {
      var result = {
        name: 'Mila',
        brother: 'Loris'
      }
      request(app)
        .post('/results')
        .send(result)
        .expect(201)
        .end(done)
    })

    // count result again
    it('should insert a result in the database', function (done) {
      Result.count(function (err, cnt) {
        cnt.should.equal(count + 1)
        done()
      })
    })

    it('should save the result in the database', function(done) {
      Result.findOne({ name: 'Mila' }).exec(function (err, result) {
        should.not.exist(err)
        // FIXME : Find a way to introspect Instance
        // since brother is not defined in Instance, is is undefined when calling instance.brother
        result.should.be.an.instanceOf(Result)
        var p = JSON.parse(JSON.stringify(result));
        p.brother.should.equal('Loris')
        done()
      })
    })
  })

  describe('Static Load', function() {

    var instanceId;
    var resultId;

    before(function (done) {
      var instance = new Instance({
        name : 'Check Result',
        description : 'The form description'
      });

      instance.save(function(err, instance) {
        should.not.exist(err);

        instanceId = instance._id;

        var result = new Result(
          {
            name: 'Check Result and Form',
            instance : instance._id,
            description: 'The result description',
            foo: 'bar',
            bar: 'baz'
          });
        result.save(function(err, result) {
          should.not.exist(err);
          resultId = result._id;
          done();
        });
      })
    })

    it('should load the complete result on load', function(done) {
      Result.load(resultId, function(err, r) {
        should.exists(r);
        r.should.be.an.instanceof(Result);
        should.exist(r.instance);
        r.instance._id.should.eql(instanceId);
        r.instance.name.should.eql('Check Result');

        // testing the parameters this way since result schema is not strict and should will not work
        var rr = JSON.parse(JSON.stringify(r));
        console.log(rr)
        rr.name.should.eql('Check Result and Form');
        rr.foo.should.eql('bar');
        rr.bar.should.eql('baz');
        done();
      });
    })
  })

  describe('Static list', function() {

    var instanceId;

    // Create a list of results for an instance
    before(function(done) {
      var instance = new Instance({
        name : 'Check List Result',
        description : 'The instance description'
      });

      instance.save(function(err, i) {
        should.not.exist(err);

        instanceId = i._id;

        var a = new Result(
          {
            name: 'Check Result and Form A',
            instance : i._id,
            description: 'The result description',
            foo: 'bar',
            bar: 'baz'
          });
        var b = new Result(
          {
            name: 'Check Result and Form B',
            instance : i._id,
            description: 'The result description',
            foo: 'bar',
            bar: 'baz'
          });
        // this one is not linked to the form
        var c = new Result(
          {
            name: 'Check Result and Form',
            description: 'The result description',
            foo: 'bar',
            bar: 'baz'
          });

        // TODO : Use async
        a.save(function(err, r) {
          should.not.exist(err);
          b.save(function(err, rr) {
            should.not.exist(err);
            c.save(function(err, rrr) {
              should.not.exist(err);
              done();
            })
          })
        });
      })
    })

    // load all the results from the form
    it('should load all the results for an instance', function(done) {
      Result.getForInstance(instanceId, function(err, results) {
        should.not.exist(err);
        should.exist(results);
        console.log(results);
        results.length.should.equal(2)
        done();
      })
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
