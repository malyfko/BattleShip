var express = require('express');

var server = express();
server.use('/', express.static(__dirname + '/'));

server.get('/public/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port =  8080;
server.listen(port, '127.0.0.1');
console.log('Listening on the port ' + port + '...');