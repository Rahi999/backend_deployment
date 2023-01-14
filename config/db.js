// MongoDB Local url : mongodb://127.0.0.1/27017
const mongoose = require("mongoose");
require('dotenv').config()


const connection = mongoose.connect(process.env.mongo_url);

module.exports={connection}