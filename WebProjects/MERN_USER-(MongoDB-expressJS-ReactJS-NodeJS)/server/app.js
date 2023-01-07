const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const jwt = require("jsonwebtoken")


// const db = ""; //stored in config.env file
app.use(express.json())

dotenv.config({ path: "./config.env" })

const db = process.env.DATABASE;
const port = process.env.PORT

require("./db/connectDB")

// const User = require("./models/UserSchema")

app.use(require("./router/auth"));

app.listen(port, () => { console.log("Server running at port : ", port) })