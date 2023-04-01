const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

const knex = require("knex")({
    client: "pg",
    connection:{
        host: "localhost",
        user: "postgres",
        password: "is303pass",
        database: "bucket_list",
        port: 5432
    }
});

app.get("/",(req,res) => {
    knex.select().from("country").then(country => {
        res.render("displayCountry", {mycountry: country});
    })
});

app.get("/editCountry/:id", (req,res) => {
    knex.select("country_id",
    "country_name",
    "popular_site",
    "capital",
    "population",
    "visited",
    "covid_level").from("country").where("country_id",req.params.id).then(country => {
        res.render("editCountry",{myCountry: country});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.post("/editCountry", (req,res) => {
    knex("country").where("country_id",parseInt(req.body.country_id)).update({
        country_name: req.body.country_name.toUpperCase(),
        popular_site: req.body.popular_site.toUpperCase(),
        capital: req.body.capital.toUpperCase(),
        population: req.body.population.toUpperCase(),
        visited: req.body.visited ? "Y" : "N",
        covid_level: req.body.covid_level.toUpperCase()     
    }).then(mycountry => {
        res.redirect("/");
    });
});

app.listen(port, () => console.log("my website is listening"));