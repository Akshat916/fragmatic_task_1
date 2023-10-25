// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocketServer = require('ws').Server;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.set('trust proxy', true); // This allows Express to trust the X-Forwarded-For header.

app.use(express.static(path.join(__dirname, '/')));

app.get('/getip', (req, res) => {
    const userIP = req.ip; // Get the user's IP from the request object
    res.json({ ip: userIP });
  });

wss.on('connection', require('./websocket'));

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
