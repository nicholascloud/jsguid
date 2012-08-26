var path = require('path'),
  exec = require('child_process').exec;

var cmd = 'mono ' + path.join(__dirname, 'lib/guidgen.exe');

module.exports = function (callback) {
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      return callback(err);
    }
    callback(null, stdout.trim());
  });
};
