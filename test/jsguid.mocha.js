var assert = require('chai').assert,
  jsguid = require('../jsguid');

suite('jsguid', function () {
  setup(function () {
  });
  
  test('should return guid', function (done) {
    jsguid(function (err, guid) {
      assert.isNull(err);
      assert.isNotNull(guid);
      assert.isTrue(guid.length > 0);
      done();
    });
  });
});
