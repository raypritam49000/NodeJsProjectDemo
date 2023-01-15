import {DataSource} from 'typeorm';
import 'reflect-metadata'
import {Student} from "../entities/Student";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1998",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ['./entities/.ts'],
    subscribers: [],
    migrations: [],
});






