const express = require("express");
const LLMService = require("../llm/LLMService");

const router = express.Router();

const llm = new LLMService();

router.post("/test", async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        const response = await llm.generate(prompt);

        res.json({
            success: true,
            response
        });

    } catch (error) {

        console.error("LLM Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;