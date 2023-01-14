const express = require("express");
const  {userSchema,UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userRouter = express.Router()

//getting all the data 

userRouter.get("/", async(req,res) => {
    const query = req.query
    try{
       const users = await UserModel.find(query)
       res.send(users)
    }catch(err) {
     console.log(err)
    }
})

// Registering
userRouter.post("/register", async(req,res) => {
    const {email,pass,name,age} = req.body;
    try{
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            // store hash password in your DB.
            if(err){
                console.log(err);
            }else {
                const user = new UserModel({email,pass:secure_password,name,age});
                await user.save();
                res.send("Registered")
            }
        })
         
    }
    catch(err){
      res.send("Error in registering the usrr")
      console.log(err);
    }
    
    
})


//Login
userRouter.post("/login", async(req,res) => {
    const {email,pass} = req.body;
    try{
        const user = await UserModel.find({email:email});
        if(user.length > 0){
            bcrypt.compare(pass, user[0].pass,  (err, result) => {
                if(result) {
                    const token = jwt.sign({userID:user[0]._id}, 'masai')
                    res.send({"msg":"Loggin Successfull", "token":token})

                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credential")
        }
    }
    catch(err) {
       res.send("Something went wrong:",err)
    }
})

module.exports = {userRouter}