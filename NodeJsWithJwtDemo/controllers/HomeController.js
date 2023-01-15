const auth = require("../middleware/auth");
const express = require('express');
const homeRoute = express.Router();

homeRoute.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 to Home Page");
});


module.exports = homeRoute;