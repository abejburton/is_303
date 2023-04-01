const express = require("express");

let app = express();
        
let path = require("path");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//connect to database
const knex = require("knex")({
    client: "pg",
    connection: {
        host : "localhost",
        user : "postgres",
        password : "is303pass",
        database : "postgres",
        port : 5432
    }
}); 

app.use(express.static("public"))

//set home page response
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

//route for displaying drink table html page
app.get("/displayDrinks", (req, res) => 
{
    knex.select().from("drink").then(dr => {
        res.render("displayDrinks", {drinks : dr});
        }).catch(err => {
        console.log(err)
        res.status(500).json({err});
    });
});

//route for the add drinks page
app.get("/addDrinks", (req, res) => {
    res.render("addDrinks");
})

//route for the form that adds a drink to the database and then shows what was done
app.post("/addDrinks", (req, res) => {
    knex("drink").insert({
        drink_name: req.body.drink_name,
        drink_ingredients: req.body.drink_ingredients,
        drink_price: req.body.drink_price,
        drink_ranking: req.body.drink_ranking,
        drink_sweetness: req.body.drink_sweetness,
        tasted: req.body.tasted
    }).then(drinks => {
        res.render("confPage",{response : "Your drink was successfully added"})
        res.redirect("/confPage");
    });
});

//route for deleting a drink and then showing what was done
app.post("/deleteDrink/:id", (req, res) => {
    knex("drink").where("drink_id", req.params.id).del().then(drinks => {
       res.redirect("/confPage");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
        res.render("confPage",{response : "Your drink was successfully deleted"})
    });
});

//route for returning back to the home page
app.post("returnHome", (req, res) => {
    res.redirect("/");
});

//route for the button that edits the database
app.post("/editDrink", (req, res) => {
    knex("drink").where("drink_id", parseInt(req.body.drink_id)).update({
        drink_name: req.body.drink_name,
        drink_ingredients: req.body.drink_ingredients,
        drink_price: req.body.drink_price,
        drink_ranking: req.body.drink_ranking,
        drink_sweetness: req.body.drink_sweetness,
        tasted: req.body.tasted
    }).then(drinks => {
        res.redirect("/confPage");
        res.render("confPage",{response : "Your drink was successfully updated"})
    });
});

//route for the button that sorts the drink table by rating
app.get("/sortRating", (req, res) => {
    knex.select().from("drink").orderBy("drink_rating").then(dr => {
        res.render("displayDrinks", {drinks : dr});
        }).catch(err => {
        console.log(err)
        res.status(500).json({err});
    });
});

//route for the button that sorts the drink table by name
app.get("/sortDesc", (req, res) => {
    knex.select().from("drink").orderBy("drink_name").then(dr => {
        res.render("displayDrinks", {drinks : dr});
        }).catch(err => {
        console.log(err)
        res.status(500).json({err});
    });
});

app.get("/confPage", (req,res) => {
    res,render("confPage")
});

app.listen(port, () => console.log("app is listening"));