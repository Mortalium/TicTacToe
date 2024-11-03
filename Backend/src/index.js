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

//module.exports = db;

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
    db.run('UPDATE data_sets SET data_json = ? WHERE sessionID = ?', [req, sessionID]);
};

async function addPlayer(ws,sessionId){
    let playersArray = await getPlayers(sessionId);
    if(playersArray){
        playersArray.push(ws);
        console.log(playersArray);
        console.log(JSON.stringify(playersArray));
        console.log(JSON.parse(JSON.stringify(playersArray)));
        db.run("UPDATE data_sets SET players = ? WHERE sessionID = ?",[JSON.stringify(playersArray),sessionId]);
    }
}

async function getPlayers(sessionId){
    return new Promise((resolve, reject) => {
        db.get("SELECT players FROM data_sets WHERE sessionID = ?", [sessionId], (err, row) => {
            if (err) {
                console.error('Fehler beim Abrufen der Spieler:', err.message);
                return reject(err);
            }
            if (row) {
                const playersArray = JSON.parse(row.players);
                resolve(playersArray);
            } else {
                resolve(JSON.parse("[]"));
            }
        });
    });
}

const gameLocked = false;
var otherPlayer;
var sessionId;

let sessions = {}

let players = [];
/*
async function setOtherPlayer(ws,data) {
    if(data.sessionId!=undefined){
        sessionId = data.sessionId;
        const players = await getPlayers(sessionId);
        if(players){
            sessions[sessionId] = players;
            console.log(sessions[sessionId]);
            sessions[sessionId].forEach(client => {
                if (client !== ws) {
                    otherPlayer = client;
                }
            });
        }
    }
}
*/
wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);
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
            //} else {
            //    ws.send(JSON.stringify({type: 'validation', valid:false}));
            //}
        
        } else if (data.type === "new") {
            startGame().then((id)=>{
                console.log(id);
                ws.send(JSON.stringify({type: 'new_response', sessionID: id}));
            });
            //addPlayer(ws,sessionId);
            //sessions[sessionId]=[];
            //sessions[sessionId].push(ws);
            //console.log(sessions[sessionId]);
            players[1]=ws;
        } else if (data.type === "update") {
            updateGame(data.board, sessionId);
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

server.listen(3000);