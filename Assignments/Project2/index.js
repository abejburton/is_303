//Author: Abe Burton

let express = require("express"); //asssigns the express class to the variable

let app = express(); //create an express object called app

console.log("The application is running");

let path = require("path"); //bring in path module to access application path
const port = 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.static("assets"));


//set paths
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html"))); //server response to client request
app.get("/speaker_details", (req,res) =>
{
    console.log("going to speaker 1 page");
    res.sendFile(path.join(__dirname + "/speaker_details.html"));
});
app.get("/speaker_details2", (req,res) =>
{
    console.log("going to speaker 2 page");
    res.sendFile(path.join(__dirname + "/speaker_details2.html"));
});
app.get("/speaker_details3", (req,res) =>
{
    console.log("going to speaker 3 page");
    res.sendFile(path.join(__dirname + "/speaker_details3.html"));
});
app.get("/table.html", (req,res) =>
{
    console.log("going to table page");
    res.sendFile(path.join(__dirname + "/table.html"));
});


//show server is listening
app.listen(port, () => console.log("The server is listening for a client."));