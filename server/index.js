const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors({ origin : 'http://localhost:3000' }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors : 'http://localhost:3000' });

io.on('connection',(socket) => {
    console.log('backend server connected');
})

httpServer.listen(5000,() => {
    console.log('Server is running on port 5000');
})