const express = require("express");
const Planner = require("../orchestrator/Planner");

const router = express.Router();
const planner = new Planner();

// POST /api/planner
router.post("/", async (req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task is required"
            });
        }

        // Create a temporary task object
        const taskObject = {
            id: "planner-test",
            description: task
        };

        const plan = await planner.createPlan(taskObject);

        res.json({
            success: true,
            plan
        });

    } catch (error) {
        console.error("Planner Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;