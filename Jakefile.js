var path = require('path');

desc('Default task');
task('default', ['help'], function (params) {
});

desc('Help');
task('help', [], function (params) {
  console.log('Run `jake -T` to see all jake tasks.');
});

desc('Run unit tests');
task('test', [], function (params) {
  var cmd = path.join('.', 'node_modules', '.bin', 'mocha');
  jake.exec([cmd + ' -u tdd'], function () {
    console.log('All tests completed');
    complete();
  }, {printStdout: true});
});

desc('Compiles guidgen.exe in lib folder');
task('compile', [], function (params) {
  jake.mkdirP('./bin');
  var source = path.join('.', 'lib', 'guidgen.cs');
  var dest = path.join('.', 'bin', 'guidgen.exe');
  jake.exec(['gmcs ' + source + ' -out:' + dest], function () {
    console.log('guidgen.exe compiled');
    complete();
  }, {printStdout: true, printStderr: true});
});

desc('Builds the project');
task('build', ['test', 'compile'], function () {
});
