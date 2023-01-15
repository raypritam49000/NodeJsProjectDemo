const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
require('./dbconfig/database')
const cors = require('cors');
const employeeRoute = require('./routes/employee.route');
const logger = require('morgan');

app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/api',employeeRoute);

app.listen(PORT, HOST, () => {
    console.log(`Server are running on http://${HOST}:${PORT}`);
})