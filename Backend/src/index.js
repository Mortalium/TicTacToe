const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3')
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const logic = require('./logic');

const dbPath = path.join(__dirname, '../res/game_data.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Datenbank konnte nicht geöffnet werden:', err.message);
    } else {
        console.log('Verbindung zur Datenbank erfolgreich');
    }
});
module.exports = db;

const gameLocked = false;
var otherPlayer;

let sessions = {}

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if(sessions[sessionId]){
            sessions[sessionId].forEach(client => {
                if (client !== ws) {
                    otherPlayer = client;
                }
            });
        }
        if (data.type === 'join') {
            if (sessions[sessionId] != null){
                
                const sessionId = data.sessionId;

                sessions[sessionId].push(ws);

                otherPlayer.send(JSON.stringify({type: 'unlock'}));

                ws.send(JSON.stringify({type: 'validation', valid:true}))
            } else {
                ws.send(JSON.stringify({type: 'validation', valid:false}))
            }
        
        } else if (data.type === "new") {
            const sessionId = this.startGame()
            sessions[sessionId] = [];
            sessions[sessionId].push(ws);
            ws.send(JSON.stringify({type: 'new_response', sessionID: sessionId}))

        } else if (data.type === "update") {
            const sessionId = data.sessionId;
            logic.updateGame(data.board, sessionId);
            otherPlayer.send(JSON.stringify({ type: 'update', board: data.board }));

            winnerVar = logic.checkWinner(data.board);
            if(winnerVar != null){
                ws.send(JSON.stringify({type: 'win'}));
                otherPlayer.send(JSON.stringify({ type: 'loss'}));
                gameLocked = true;
            }else if(logic.isBoardFull){
                ws.send(JSON.stringify({ type: 'even'}));
                otherPlayer.send(JSON.stringify({ type: 'even'}));
                gameLocked = true;
            } else{
                ws.send(JSON.stringify({ type: 'lock'}));
                otherPlayer.send(JSON.stringify({type: 'unlock'}));
            }
            if(gameLocked){
                ws.send(JSON.stringify({type: 'lock'}));
                otherPlayer.send(JSON.stringify({ type: 'lock'}));
            }
        } 
    });
  });

app.get("/api/", (req, res) => {
    res.send("Hello express world");
});


app.listen(3000);