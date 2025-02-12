import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('welcome to my website')
});

app.use('/books', booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App Connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
        
    })
    .catch(() => {
        console.log("App failed to connect to database");
    });
