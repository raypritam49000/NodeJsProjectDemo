const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL

const dbconnection = mongoose.connect(DB_URL,()=>{
    console.log("Database connection established")
});

module.exports = dbconnection;

