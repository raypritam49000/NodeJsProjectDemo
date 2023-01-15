import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
const PORT = process.env.PORT;
import {Student} from "./entities/Student";
import {AppDataSource} from './databaseconfig/database';
import {DataSource} from "typeorm";


AppDataSource.initialize()
    .then((con: DataSource) => {
        const studentRepository = con.getRepository(Student);

        // create and setup express app
        const app = express();
        app.use(express.json());


        // register routes

        app.get("/students", async function (req: Request, res: Response) {
            const students = await studentRepository.find();
            res.json(students);
        });

        app.get("/students/:id", async function (req: Request, res: Response) {
            console.log(req.params.id);
            const student = await studentRepository.findOneById(req.params.id);
            res.json(student);
        });

        app.post("/students", async function (req: Request, res: Response) {
            const student = await studentRepository.create(req.body);
            const results = await studentRepository.save(student);
            return res.send(results);
        });

        app.put("/students/:id", async function (req: Request, res: Response) {
            const student = await studentRepository.findOneById(req.params.id);
            if (student instanceof Student) {
                await studentRepository.merge(student, req.body);
            }

            // @ts-ignore
            const results = await studentRepository.save(student);
            return res.send(results);
        });

        app.delete("/students/:id", async function (req: Request, res: Response) {
            //const results = await studentRepository.
            const photoToRemove = await studentRepository.findOneById(req.params.id);
            // @ts-ignore
            const results = await studentRepository.remove(photoToRemove)
            return res.send(results);
        });


        app.get('/', (req: Request, res: Response) => {
            res.json({message: "Hello Pritam Ray"})
        })

        app.listen(PORT, (): void => {
            console.log(`Server is Running at localhost:${PORT}`);
        })

    })
    .catch((error: any) => console.log(error));








