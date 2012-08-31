var path = require('path'),
  exec = require('child_process').exec,
  os = require('os')
  EOL = os.EOL || null,
  PLATFORM = os.platform || null;

var GUIDGEN = 'mono ' + path.join(__dirname, 'bin/guidgen.exe');

function eol() {
  if (EOL) {
    return EOL;
  }
  switch(PLATFORM) {
    case 'win32':
      return '\r\n';
    case 'darwin':
    case 'linux':
    default:
      return '\n';
  }
}

function checkArgs(howMany, callback) {
  if (isNaN(howMany)) {
    return callback('`howMany` must be numeric');
  }
  howMany = Number(howMany);
  if (howMany < 0) {
    return callback('`howMany` must be a positive integer');
  }
  callback(null);
}

module.exports = function (howMany, callback) {
  if (howMany instanceof Function) {
    callback = howMany;
    howMany = 1;
  }
  checkArgs(howMany, function (err) {
    if (err) {
      return callback(err);
    }
    if (howMany === 0) {
      return callback(null, '');
    }
    exec(GUIDGEN + ' ' + howMany, function (err, stdout, stderr) {
      if (err) {
        return callback(err);
      }
      if (stderr) {
        return callback(stderr);
      }
      if (howMany === 1) {
        return callback(null, stdout.trim());
      }
      callback(null, stdout.trim().split(eol()));
    });
  });
};
