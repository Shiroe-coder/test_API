const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const Userprofile = require("./model/Userprofile");
const UserprofileRouter = require("./router/Userprofile");
const app = express();

app.use(bodyParser.json())

const db = require("./config/key").mongoURI;

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology:true})
        .then(()=> console.log("ket noi db .."))
        .catch((err) => console.log(err))

app.use("/",require("./router/User"));
app.use("/Userprofile",require("./router/Userprofile"));
app.use("/cart",require("./router/cart.js"));
app.use("/Item",require("./router/Item.js"));

/*
const User = require("./model/User");

const userPut = {
    user:"hoangan",
    pass:"123",
    role:"admin",
};

const user = new User(userPut);
user.save((err,data) =>{
    if (err) console.log(err);
    console.log(data);
})
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`tai day ${PORT}`))