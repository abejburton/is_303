const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.use(express.urlencoded({extended: true})); //takes request and stores it into a body attribute

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/displayMusic",(req,res) => {
    res.sendFile(path.join(__dirname + "/musicinput.html"));
})

app.post("/storeMusic", (req,res) => {
    let sOutput;
    sOutput = "Band Name:" + req.body.bandName + "<br><br>Favorite Song" + req.body.favSong + "<br><br>Music Genre:" + req.body.musicGenre;
    res.send(sOutput);
})

app.listen(port,() => console.log("website started"));


