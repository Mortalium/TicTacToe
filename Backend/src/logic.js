const db = require('./index')

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