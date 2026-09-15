const express = require("express");
const router = express.Router();

const {
    getAgents,
    getAgentDefinitions
} = require("../agents/agentRegistry");

// GET /api/agents
// Returns all registered agents
router.get("/", (req, res) => {
    const agents = getAgents();

    res.json({
        success: true,
        count: agents.length,
        agents
    });
});

// GET /api/agents/definitions
// Returns safe agent metadata for the LLM Planner
router.get("/definitions", (req, res) => {
    const agents = getAgentDefinitions();

    res.json({
        success: true,
        count: agents.length,
        agents
    });
});

module.exports = router;