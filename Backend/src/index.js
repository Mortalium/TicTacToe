const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const logic = require('./logic');

const db = new sqlite3.Database("../res/game_data.db", (err) => {
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
        if(sessions[sessionId]){
            sessions[sessionId].forEach(client => {
                if (client !== ws) {
                    otherPlayer = client;
                }
            });
        }
        const data = JSON.parse(message);
        if (data.type === 'join') {
            if (sessions[sessionId] != null){
                
                const sessionId = data.sessionId;

                sessions[sessionId].push(ws);

                otherPlayer.send(JSON.stringify({type: 'unlock'}));
            }
        
        } else if (data.type === "new") {
            sessionId = this.startGame()
            sessions[sessionId] = [];
            sessions[sessionId].push(ws);

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