let express = require("express");
let app = express();
// const res = require("express/lib/response");


let path = require("path");

const port = process.env.PORT || 3001;
const knex = require(path.join(__dirname + '/knex/knex.js'));

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

// const knex = require("knex")(
//     {
//         client: 'pg',
//         connection: {
//             host : "localhost",
//             user : "postgres",
//             // this needs to be the password
//             password : "admin",
//             database : "proj2",
//             port : 5432
//         }
//     }
// );

// app.use(express.static(path.join(__dirname + "/css")))
app.use(express.static("public"))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get("/learn", (req,res) => {
    res.sendFile(path.join(__dirname + '/learn.html'))
})

app.get("/understand", (req,res) => {
    res.sendFile(path.join(__dirname + '/understand.html'))
})

app.get("/act", (req,res) => {
    res.sendFile(path.join(__dirname + '/act.html'))
})

app.get("/displayTable", (req, res) => 
{
    knex.select().from("victims").then(vic => {
        res.render("displayTable", {victims : vic});
    }).catch(err => {
        console.log(err)
        res.status(500).json({err});
    });
});
app.get("/editTable/:id", (req, res) => {
    knex.select("date_missing",
                "last_name",
                "first_name",
                "age_at_missing",
                "city",
                "state",
                "gender",
                "race").from("victims").where("victim_id", req.params.id).then(vic => {
                    res.render("editTable", {victims :vic})
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({err});
                });
})
app.post("/editTable", (req, res) => {
    knex("victims").where("victim_id", parseInt(req.body.victim_id)).update({
        last_name: req.body.last_name.toUpperCase(),
        date_missing: req.body.date_missing,
        first_name: req.body.first_name.toUpperCase(),
        age_at_missing: req.body.age_at_missing,
        city: req.body.city.toUpperCase(),
        state: req.body.state.toUpperCase(),
        gender: req.body.gender.toUpperCase(),
        race: req.body.race.toUpperCase(),
    }).then(victims => {
        res.redirect("/displayTable");
    })
})
app.get("/addVictim", (req, res) => {
    res.render("addVictim");
})

app.post("/addVictim", (req, res) => {
    knex("victims").insert({
        last_name: req.body.last_name.toUpperCase(),
        date_missing: req.body.date_missing,
        first_name: req.body.first_name.toUpperCase(),
        age_at_missing: req.body.age_at_missing,
        city: req.body.city.toUpperCase(),
        state: req.body.state.toUpperCase(),
        gender: req.body.gender.toUpperCase(),
        race: req.body.race.toUpperCase(),
    }).then(victims => {
        res.redirect("/displayTable");
    })
})

app.post("/deleteVictim/:id", (req, res) => {
    knex("victims").where("victim_id", req.params.id).del().then(victims => {
       res.redirect("/displayTable");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
})

app.listen(port, () => console.log("Express App has started and server is listening!")); 