const express = require("express");
const {connection} = require("./config/db");
const  {userSchema,UserModel} = require("./models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {userRouter} = require("./routes/users.routes");
const { privateRouter } = require("./routes/private.routes");
const {noterouter} = require("./routes/Note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const cors = require("cors")
const app = express();
require('dotenv').config()


app.use(express.json());
app.use(cors({
    origin : "*"
}))
// MongoDB Local url : mongodb://127.0.0.1/27017
app.get("/", (req,res) => {
   res.send("welcome to home route")
})

app.use("/users", userRouter)
app.use("/all", privateRouter)
app.use(authenticate)
app.use("/notes", noterouter)

app.listen(process.env.port,  async() => {
    try{
        await connection
        console.log("Successfully Connected to DataBase")
    }catch(err){
       console.log("Got Error While Connecting To DataBase:",err)
    }
    console.log("Server running at port 8080")
})
