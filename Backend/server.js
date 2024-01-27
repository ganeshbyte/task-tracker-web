require("dotenv").config();
const express = require("express");
const { createTodoValidator, updateTodoValidator } = require("./middleware/TodoValidator");
const connectToDb = require("./db/connect");
const Todo = require("./model/todo");
const winston = require("winston");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

//set up logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'audit.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),

    )
});

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        logger.info(`Todo get`);
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json(error)
    }
});


app.post("/todo", createTodoValidator, async (req, res) => {
    try {
        const { title, description } = req.body;

        const todo = new Todo({
            title,
            description,
            completed: false
        })
        await todo.save();
        logger.info(`Todo saved`);
        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json(error)
    }
});

app.put("/completed", updateTodoValidator, async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await Todo.findByIdAndUpdate({ _id: id }, { completed: true }, { new: true });
        logger.info(`Todo updated`);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
})

const start = async () => {
    try {
        await connectToDb(process.env.MONGO_URL);
        console.log("Connected to db ...");
        app.listen(port, () => {
            console.log(`Server is started at port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
