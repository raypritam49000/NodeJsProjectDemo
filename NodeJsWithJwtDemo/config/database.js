const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

exports.connect = () => {
    // Connecting to the database
    mongoose.connect(DB_URL)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
        });
};