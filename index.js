/* 
 * title: Adobe After Effects External Debugger/Logger (aedbug)
 * debugger/logger server to start npm start
 * author: Marcin Polak mapoart@gmail.com
 * varsion: 1.1
 * date: 06.03.2019
 */

var app = require('express')();
var http = require('http').Server(app);

app.get('/debug', function (req, res) {
  console.log("[" + new Date().toJSON() + "] " + req.query.msg + "\r");
  res.sendStatus(200);
});

http.listen(8080, function () {
  console.log("[" + new Date().toJSON() + '] After Effects Debugger/Logger (aedbug) on localhost:8080');
});