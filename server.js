//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
const fileUpload = require('express-fileupload');


//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'src/client')));
router.use(express.static(path.resolve(__dirname, 'src/client/public')));
var messages = [];
var sockets = [];

router.use(fileUpload());


io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });





router.post('/upload', function(req, res) {
  
  console.log('video upload called');
  
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  //sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
  //  if (err)
  //    return res.status(500).send(err);
 
  res.send('File uploaded!');
  //});
});



function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
  console.log('BUILD THE JSX: npm run build');
  console.log('ADD TO COMMIT: git add .');
  console.log('CREATE COMMIT: git commit -m "commit message"');
  console.log('PUSH TO GITHUB: git push');
  console.log('PUSH TO AWS: eb deploy');
  console.log('TEST IN C9 AT:  https://dragonfly-pelling.c9users.io/');
});
