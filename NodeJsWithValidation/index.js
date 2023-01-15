const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const dbconnection = require('./dbconfig/database');
const userRouter = require('./routes/user.routes')
const cors = require('cors');

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter);

dbconnection.connect();


app.listen(PORT, HOST, () => {
    console.log(`Server is Running at ${HOST}:${PORT}`)
});