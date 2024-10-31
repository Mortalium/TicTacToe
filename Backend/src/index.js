const express = require("express");
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sessions = {}

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'join') {
        if (sessions[sessionId] != null){
            
            const sessionId = data.sessionId;

            sessions[sessionId].push(ws);
    
        }
       
      } else if (data.type === "new") {
        sessionId = 
        sessions[sessionId] = [];
        sessions[sessionId].push(ws);

      } else if (data.type === "update") {
        const sessionId = data.sessionId;

        sessions[sessionId].forEach(client => {
            if (client !== ws) {
                client.send(JSON.stringify({ type: 'update', message: 'Player joined' }));
            }
        });
      }
    });
  });

app.get("/api/", (req, res) => {
    res.send("Hello express world");
});


app.listen(3000);