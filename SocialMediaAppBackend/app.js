const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const corsOptions = {
    origin: '*',
}
// Using Middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

//Using Routes
app.use('/api/v1', post);
app.use('/api/v1', user);

module.exports = app;