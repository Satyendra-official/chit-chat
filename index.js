const { createServer } = require('node:http');
const express = require("express");
const { join } = require('node:path');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

//socket.io is handeled here
io.on('connection', (socket) => {
    socket.on("user-input", message => {
        io.emit("message", message)
    })
  });



app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.sendFile(join(__dirname, 'index.html'));
});

server.listen(9000, () => {
    console.log('server running at http://localhost:9000');
  });
