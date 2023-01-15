const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const databaseConnetion = require('./dbconfig/database');
const studentRouter = require('./routes/student.routes');
const cors = require('cors');

databaseConnetion();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ corsOptions: "*" }));
app.use('/rest/api/students',studentRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server are running on ${HOST}:${PORT}`)
})


