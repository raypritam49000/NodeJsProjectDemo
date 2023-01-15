require('dotenv').config();
import express from 'express';
import {AppDataSource} from './src/dbconfig/data-source';
import photoRouter from './src/routes/photo.routes';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(async () => {

        const app = express();

        // 1. Body parser
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        app.use('/api/photos', photoRouter);

        app.listen(9998);

        console.log(`Server started on http://${HOST}:${PORT}`);
    })
    .catch((error) => console.log(error));
