const Task = require("./Task");

const tasks = [];

function createTask(description) {
    const task = new Task(description);

    tasks.push(task);

    return task;
}

function getTasks() {
    return tasks;
}

function getTaskById(id) {
    return tasks.find((task) => task.id === id);
}

module.exports = {
    createTask,
    getTasks,
    getTaskById
};