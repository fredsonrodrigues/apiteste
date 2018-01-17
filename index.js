var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var queue = 1;
app.get("/", function(req, res) {
  res.send("Hello Node.JS!");
  io.on("connection", function(socket) {
    console.log("a user connected");
    
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    
    socket.on('call queue', function(msg){
      console.log("Chamando fila");
      queue = queue + 1;
      io.emit('call queue', queue);
    });
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});