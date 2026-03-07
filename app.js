require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors("*"));

let todos = [
    {
        id: 1, 
        task: "Finish Week 4 material.",
        completed: false
    },
    {
        id: 2,
        task: "Submit week 4 assignments",
        completed: false
    }
];

// display all tasks on your todo list
const listAllTasks = (req, res) => {
    res.status(200).json(todos);
};

app.get("/todos", listAllTasks);

const listTask = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((task) => task.id === id);
    if(!todo)
        return res.status(404).json({ error: "This particular task doesn't exist. Try searching for an existing task."});
    else 
        res.status(200).json(todo);
};

app.get("/todos/:id", listTask);

const addTask = (req, res) => {

    const { task } = req.body;
    if(!task)
        return res.status(400).json({ error: "Pls enter a valid task!"});
    else {
        const newTodo = {
            id: todos.length + 1,
            task: req.body.task,
            completed: false
        };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    }

};

app.post("/todo", addTask);

const editTask = (req, res) => {
    const id = req.params.id;
    const todo = todos.find((task) => task.id === id);
    if(!todo) 
        return res.status(404).json({ error: "This task doesn't exist. You can only edit an existing task."});
    else {
        Object.assign(todo, req.body);
        res.status(200).json(todo);
    }
};

app.patch("/todos/:id", editTask);

const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = todos.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "This task doesn't exist. You can only delete existing tasks!" });
    }

    // Remove the task from the list of expenses
    todos.splice(taskIndex, 1);

    // Send 204 No Content
    return res.status(204).send();
}

app.delete("/todos/:id", deleteTask);



port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Your server is live on http://localhost:${port}`);
});





