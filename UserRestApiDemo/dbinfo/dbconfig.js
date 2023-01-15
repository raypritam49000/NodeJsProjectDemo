const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
require('dotenv').config();

const dbConnection = () => {

    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect(DB_URL)
        .then(() => {
            console.log("DataBase Connected Successfully");
        })
        .catch((error) => {
            console.log(error);
        })
}

dbConnection();