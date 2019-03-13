var express = require("express")();
var http = require("http").createServer(express);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("L'utilisateur " + socket.id + " s'est connecté");

  socket.on("sendMessage", function(msg) {
    io.emit("getMessage", msg);
  });

  socket.on("disconnect", function() {
    console.log("L'utilisateur " + socket.id + " s'est déconnecté");
  });
});

http.listen(3001, function() {
  console.log("Connexion à localhost:3001 effectuée");
});
