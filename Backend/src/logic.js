exports.checkWinner = (board) => {
    for (let row of Object.values(board)) {
        if (row["1"] === row["2"] && row["2"] === row["3"] && row["1"] !== "") {
            return row["1"];
        }
    }

    const columns = ["1", "2", "3"];
    for (let col of columns) {
        if (board["a"][col] === board["b"][col] && board["b"][col] === board["c"][col] && board["a"][col] !== "") {
            return board["a"][col]; 
        }
    }

    if (board["a"]["1"] === board["b"]["2"] && board["b"]["2"] === board["c"]["3"] && board["a"]["1"] !== "") {
        return board["a"]["1"];
    }

    if (board["a"]["3"] === board["b"]["2"] && board["b"]["2"] === board["c"]["1"] && board["a"]["3"] !== "") {
        return board["a"]["3"]; 
    }

    return null;
}

exports.isBoardFull = (board) => {
    for (let row of Object.values(board)) {
        for (let cell of Object.values(row)) {
            if (cell === "" || cell === undefined) {
                return false; 
            }
        }
    }
    return true; 
}