const express = require('express');
const app = express()
const http= require('http').createServer(app);
const io = require("socket.io")(http);



app.get('/', (req, res) => {
  res.send('</h1>Helllooo</h1')
})

io.on('connection', (socket) => {
  console.log("A user has connected")
  socket.on('chat message', (msg) => {
    console.log("message: " + JSON.stringify(msg))
    io.emit('chat message', msg);
  });
});

http.listen(3001, () => {
  console.log('listening on *: 3001')
});
