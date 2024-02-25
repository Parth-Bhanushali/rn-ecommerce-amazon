const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// create an instance
const app = express();
const port = 8000;  // choose any port
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize json web token
const jwt = require("jsonwebtoken");

const url = "mongodb+srv://princebhanushali:Qwerty123@cluster0.p1yrmld.mongodb.net/";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})