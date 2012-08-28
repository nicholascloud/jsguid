/*global suite:true, test:true*/

var assert = require('chai').assert,
  jsguid = require('../jsguid');

var GUID_REGEX = /^(?:[\da-zA-Z]{8})-(?:[\da-zA-Z]{4})-(?:[\da-zA-Z]{4})-(?:[\da-zA-Z]{4})-(?:[\da-zA-Z]{12})$/m;

suite('jsguid', function () {
  setup(function () {
  });
  
  test('should return a single guid by default', function (done) {
    jsguid(function (err, guid) {
      assert.isNull(err);
      assert.isNotNull(guid);
      assert.isTrue(typeof guid === 'string');
      assert.isTrue(GUID_REGEX.test(guid));
      done();
    });
  });

  test('should return single guid for count 1', function (done) {
    jsguid(1, function (err, guid) {
      assert.isNull(err);
      assert.isNotNull(guid);
      assert.isTrue(typeof guid === 'string');
      assert.isTrue(GUID_REGEX.test(guid));
      done(); 
    });
  });

  test('should return correct number of guids for numeric argument', function (done) {
    function runTest(current, max, callback) {
      jsguid(current, function (err, output) {
        if (err) {
          return callback(err);
        }
        assert.instanceOf(output, Array);
        assert.equal(current, output.length);
        output.forEach(function (guid) {
          assert.isTrue(GUID_REGEX.test(guid));
        });
        if (current <= max) {
          return runTest(current + 1, max, callback);
        }
        return callback(null);
      });
    }
    runTest(2, 10, function (err) {
      assert.isNull(err);
      done();
    });
  });

  test('should return empty string when zero specified', function (done) {
    jsguid(0, function (err, output) {
      assert.equal('', output);
      done();
    });
  });

  test('should generate error when non-numeric argument specified', function (done) {
    jsguid({}, function (err, output) {
      assert.isNotNull(err);
      assert.isTrue(err.length > 0);
      done();
    });
  });
});
