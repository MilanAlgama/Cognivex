const express = require("express");
const PlanValidator = require("../orchestrator/PlanValidator");

const router = express.Router();
const validator = new PlanValidator();

// POST /api/validator
router.post("/", (req, res) => {
    try {
        const { plan } = req.body;

        if (!plan) {
            return res.status(400).json({
                success: false,
                message: "Plan is required"
            });
        }

        validator.validate(plan);

        res.json({
            success: true,
            message: "Plan is valid",
            plan
        });

    } catch (error) {
        console.error("Validation Error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;