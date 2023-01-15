const express = require('express')
const app = express()
require('dotenv').config();
const PORT = 3000 || process.env.PORT;
const HOST = 'localhost' || process.env.HOST;
const cors = require('cors');
const bodyParser = require('body-parser');
require("./config/database").connect();
const userRoute = require('./controllers/AuthController');
const homeRoute = require('./controllers/HomeController');
const courseRoute = require('./controllers/CourseController');


app.use(cors({ origin: '*' }));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/api',userRoute);
app.use('/rest/api',homeRoute);
app.use('/rest/api',courseRoute);


app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${HOST}:${PORT}`)
})