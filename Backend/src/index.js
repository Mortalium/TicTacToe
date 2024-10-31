const express = require("express");
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = new sqlite3.Database("../res/game_data.db");

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
            this.updateGame(data.board, sessionId);
            otherPlayer.send(JSON.stringify({ type: 'update', board: data.board }));

            winnerVar = this.checkWinner(data.board);
            if(winnerVar != null){
                ws.send(JSON.stringify({type: 'win'}));
                otherPlayer.send(JSON.stringify({ type: 'loss'}));
                gameLocked = true;
            }else if(this.isBoardFull){
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

exports.startGame = () => {
    db.run('INSERT INTO data_sets (data_json) VALUES (?)',[""], function(err){
        if(err){
            return console.log('Fehler beim Hinzufügen:', err.message);
        }
        return this.lastID;
    });
};

exports.updateGame = (req, sessionID) => {
    db.run('UPDATE data_sets SET data_json = ? WHERE sessionID = ?', [req, sessionID]);
};

exports.checkWinner = ( board) => {
    for (let row of Object.values(board)) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
            return row[0]; // Gewinner gefunden
        }
    }

    // Überprüfen der Spalten
    for (let col = 0; col < 3; col++) {
        if (board.a[col] === board.b[col] && board.b[col] === board.c[col] && board.a[col] !== "") {
            return board.a[col]; // Gewinner gefunden
        }
    }

    // Überprüfen der Diagonalen
    if (board.a[0] === board.b[1] && board.b[1] === board.c[2] && board.a[0] !== "") {
        return board.a[0]; // Gewinner gefunden
    }

    if (board.a[2] === board.b[1] && board.b[1] === board.c[0] && board.a[2] !== "") {
        return board.a[2]; // Gewinner gefunden
    }

    return null;
}

exports.isBoardFull = (board) => {
    for (let row of Object.values(board)) {
        if (row[0] == "" || row[1] == "" || row[2] == "") {
            return false;
        }
        return true;
    }
}

app.get("/api/", (req, res) => {
    res.send("Hello express world");
});


app.listen(3000);