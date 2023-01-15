const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const databaseConnection = require('./dataconfig/database');
const employeeRoutes = require('./routes/employee.route');

// Using Middleware
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',employeeRoutes);

databaseConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server are running at ${HOST}:${PORT}`);
})