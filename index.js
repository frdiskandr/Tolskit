import express, { json } from "express";
import { Get } from "./handler.js";
import Db from './db/connection.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const responsesDb = async () => {
    return await Db.query('SELECT *')
};
console.log(responsesDb); 

app.get("/", Get);

app.get('/puding-coklat-pak-hambali', (req, res) => {
    res.status(200).json({message: 'JOMOKK!!', status:200})
});

app.put('/:id', (req, res) => {
    res.json({message: "ini put"});
});

app.post('/', (req, res) => {
    res.json({message: "ini adalah metode posts"});
});

app.delete("/", (req, res) => {
    res.json({ message: "ini delete" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
