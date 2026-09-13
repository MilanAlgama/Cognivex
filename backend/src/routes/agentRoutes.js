const express = require("express");

const router = express.Router();

const {
    getAgents
} = require("../agents/agentRegistry");

router.get("/", (req, res) => {
    const agents = getAgents();

    res.json({
        success: true,
        count: agents.length,
        agents
    });
});

module.exports = router;