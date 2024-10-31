const express = require("express");
const app = express();

app.get("/api/", (req, res) => {
    res.send("Hello express world");
});


app.listen(3000);