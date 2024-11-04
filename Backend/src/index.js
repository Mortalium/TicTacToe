const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose()
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

async function initialise_Session(){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO data_sets (data_json,players) VALUES (?,?)',["","[]"], function(err){
            if(err){
                console.log('Fehler beim Hinzufügen:', err.message);
                return reject(err);
            }
            resolve(this.lastID)
        });
    });
};

async function startGame() {
    return await initialise_Session();
}

updateGame = (req, sessionID) => {
    db.run('UPDATE data_sets SET data_json = ? WHERE sessionID = ?', [JSON.stringify(req), sessionID]);
};

var otherPlayer;
var sessionId;

let sessions = {}

let players = [];

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if(data.type!='new'){
            sessionId = data.sessionId;
            /*console.log(sessions[sessionId]);
            console.log(sessions);
            if(sessions[sessionId]){
                console.log(sessions[sessionId]);
                sessions[sessionId].forEach(client => {
                    if (client !== ws) {
                        otherPlayer = client;
                    }
                });
            }*/
           players.forEach(client => {
            if(client !== ws) {
                otherPlayer = client;
            }
           })
        }
        if (data.type === 'join') {
            //if (sessions[sessionId] != null){
                
                //addPlayer(ws,sessionId);
                //console.log(sessions[sessionId]);
                
                //sessions[sessionId].push(ws);
                players[2]=ws;

                otherPlayer.send(JSON.stringify({type: 'unlock'}));

                console.log("joining succsessfull");

                ws.send(JSON.stringify({type: 'validation', valid:true}));
                ws.send(JSON.stringify({type:'join_response',sessionId:sessionId}));
                otherPlayer.send(JSON.stringify({type:'changeTurn',yourTurn:true}));
            //} else {
            //    ws.send(JSON.stringify({type: 'validation', valid:false}));
            //}
        
        } else if (data.type === "new") {
            startGame().then((id)=>{
                ws.send(JSON.stringify({type: 'new_response', sessionId: id}));
            });
            //addPlayer(ws,sessionId);
            //sessions[sessionId]=[];
            //sessions[sessionId].push(ws);
            //console.log(sessions[sessionId]);
            players[1]=ws;
        } else if (data.type === "update") {

            updateGame(data.board, sessionId);
            otherPlayer.send(JSON.stringify({ type: 'update', board: data.board }));

            let winnerVar = logic.checkWinner(data.board);
            if(winnerVar != null){
                ws.send(JSON.stringify({type: 'win'}));
                otherPlayer.send(JSON.stringify({ type: 'loss'}));
            }else if(logic.isBoardFull(data.board)){
                ws.send(JSON.stringify({ type: 'even'}));
                otherPlayer.send(JSON.stringify({ type: 'even'}));
            } 
            ws.send(JSON.stringify({ type: 'lock'}));
            otherPlayer.send(JSON.stringify({type: 'unlock'}));
            ws.send(JSON.stringify({type:'changeTurn',yourTurn:false}));
            otherPlayer.send(JSON.stringify({type:'changeTurn',yourTurn:true}));
        } 
    });
});

server.listen(3000);