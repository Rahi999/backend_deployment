const express = require("express");
const  {userSchema,UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const privateRouter = express.Router()

privateRouter.get("/about", (req,res) => {
    res.send("About Page")
})

// Data
privateRouter.get("/data", (req,res) => {
    const token = req.headers.authorization;
    // console.log(token);
    jwt.verify(token, 'masai', (err,decoded) => {
       if(err){
        res.send("Invalid token");
        console.log(err);
       }else{
        res.send("Data...")
       }
    }) 
})

// cart
privateRouter.get("/cart", (req,res) => {
    const token = req.query.token
    jwt.verify(token, 'masai', (err,decoded) => {
       if(err){
        res.send("Invalid token");
        console.log(err);
       }else{
        res.send("Cart Page")
       }
    }) 
})



module.exports = {privateRouter}