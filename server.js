require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require("method-override")
const pokebowl = require("./models/pokemon")


// middleware //
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/static", express.static("public"));

// home //
app.get('/', (req, res) => res.redirect("/pokemon"))

// index //
app.get("/pokemon", (req, res) =>{
    res.render("index.ejs", {
        pokemon: pokebowl,
        index: req.params.id
    })
});

// new //
app.get("/pokemon/new", (req, res) =>{
    res.render("new.ejs", {pokebowl})
});

// create //
app.post("/pokemon", (req, res) => {
   pokebowl.unshift(req.body)
    res.redirect("/pokemon")

});

// edit //
app.get("/pokemon/:id/edit", (req,res) => {
    res.render("edit.ejs", {
        pokemon: pokebowl[req.params.id],
        index: req.params.id
    })
});

// update //
app.put("/pokemon/:id", (req, res) =>{
    pokebowl[req.params.id] = req.body
    res.redirect("/pokemon")
})

// delete //
app.delete("/pokemon/:id", (req, res) => {
    pokebowl.splice(req.params.id, 1)
    res.redirect("/pokemon")
});

// show //
app.get("/pokemon/:id", (req, res) =>{
    res.render("show.ejs", {
        pokemon: pokebowl[req.params.id],
         index: req.params.id

    })
});


app.listen(PORT, () => {
    console.log(`Gotta Catch Em All ${PORT}`)
})