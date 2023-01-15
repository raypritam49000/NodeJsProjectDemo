const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(cors({ origin: '*' }));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to set Router
app.use("/api/v1/courses", coursesRouter);

// Connect to the DataBase
mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log("DataBase Connection Successfully");
})


// Create Server And Register Port 
app.listen(process.env.PORT, () => {
    console.log("Server is Running");
});