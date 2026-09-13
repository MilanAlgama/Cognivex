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

module.exports = {
    getAgents,
    getAgentById
};