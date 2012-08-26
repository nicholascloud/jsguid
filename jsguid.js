var path = require('path'),
  exec = require('child_process').exec;

var cmd = 'mono ' + path.join(__dirname, 'lib/guidgen.exe');

exec(cmd, function (err, stdout, stderr) {
  if (err) {
    console.log('An error occurred: ' + err);
    return;
  }

  console.log(stdout);
});
