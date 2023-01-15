const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;


const databaseConnetion = () => {
    mongoose.connect(DATABASE_URL).then(() => {
        console.log("DataBase Connected Successfully");
    })
        .catch((error) => {
            console.log(error.message);
        })
}

module.exports = databaseConnetion;