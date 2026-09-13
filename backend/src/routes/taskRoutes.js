const express = require("express");

const router = express.Router();

const {
    createTask,
    getTasks,
    getTaskById
} = require("../tasks/taskManager");

// Create task
router.post("/", (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({
            success: false,
            message: "Task description is required"
        });
    }

    const task = createTask(description);

    res.status(201).json({
        success: true,
        task
    });
});

// Get all tasks
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: getTasks().length,
        tasks: getTasks()
    });
});

// Get task by ID
router.get("/:id", (req, res) => {
    const task = getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.json({
        success: true,
        task
    });
});

module.exports = router;