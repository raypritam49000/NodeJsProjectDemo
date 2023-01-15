const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '4000';
const cors = require('cors');
require('../src/dbconfig/database')
const productRouter = require('./routes/product.routes.js')
const userRouter = require('./routes/user.routes.js')

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRouter);
app.use('/auth', userRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is Running on ${HOST}:${PORT}`);
});