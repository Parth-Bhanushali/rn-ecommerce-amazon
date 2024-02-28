const { MONGO_DB_URL, NODEMAILER_USER, NODEMAILER_PASS, BASE_URL } = require('dotenv').config().parsed

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

const url = MONGO_DB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});


const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail= async (email, verificationToken) => {
    // create a nodemailer transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS
        }
    });

    const verificationLink = `${BASE_URL}/verify/${verificationToken}`;

    // compose the email
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email \n ${verificationLink}`
    };

    // send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    } finally {
        console.log('Verification link sent!')
    }
}

// end point to register
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if the email is already registered
        const isExistingUser = await User.findOne({email});
        if (isExistingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // create a new user
        const newUser = new User({ name, email, password });

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // save user to database
        await newUser.save();

        // send verification email to user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
        console.log("Error registering user: ", error);
        res.status(500).json({ message: "Registration failed" })
    }
});

// end point to verify email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        // find user with given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        // mark user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
});