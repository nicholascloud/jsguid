desc('Default task');
task('default', ['help'], function (params) {
});

desc('Help');
task('help', [], function (params) {
  console.log('use: `var jsguid = require("jsguid");`');
});

desc('Run unit tests');
task('test', [], function (params) {
  jake.exec(['./node_modules/.bin/mocha -u tdd'], function () {
    console.log('All tests completed');
    complete();
  }, {printStdout: true});
});

desc('Compiles guidgen.exe in lib folder');
task('compile', [], function (params) {
  jake.mkdirP('./bin');
  jake.exec(['gmcs ./lib/guidgen.cs -out:./bin/guidgen.exe'], function () {
    console.log('guidgen.exe compiled');
    complete();
  }, {printStdout: true, printStderr: true});
});

desc('Builds the project');
task('build', ['test', 'compile'], function () {
});
