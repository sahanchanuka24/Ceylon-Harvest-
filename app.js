//password:- 2npps70yajmpiK2q

const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Middleeare
app.use("/",(req, res, next) => {
    res.send("Thidas,Sahan,Venusha,Hansika");
})//dde

mongoose.connect("mongodb+srv://admin:2npps70yajmpiK2q@cluster0.gf62g.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
   app.listen(5000);
})
.catch ((err)=> console.log((err)));