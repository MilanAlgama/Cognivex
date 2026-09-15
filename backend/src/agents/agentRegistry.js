const ResearchAgent = require("./ResearchAgent");
const AnalysisAgent = require("./AnalysisAgent");
const WriterAgent = require("./WriterAgent");

const agents = [
    new ResearchAgent(),
    new AnalysisAgent(),
    new WriterAgent()
];

function getAgents() {
    return agents;
}

function getAgentById(id) {
    return agents.find((agent) => agent.id === id);
}

// Returns only the information that the LLM Planner needs
function getAgentDefinitions() {
    return agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        description: agent.description,
        capabilities: agent.capabilities
    }));
}

module.exports = {
    getAgents,
    getAgentById,
    getAgentDefinitions
};