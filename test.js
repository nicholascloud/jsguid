var jsguid = require('./jsguid');

jsguid(function (err, guid) {
  if (err) {
    console.log('An error has occured: ' + err);
    return;
  }
  console.log(guid);
});
