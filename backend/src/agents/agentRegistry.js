const ResearchAgent = require("./ResearchAgent");

const agents = [new ResearchAgent()];

function getAgents() {
  return agents;
}

function getAgentById(id) {
  return agents.find((agent) => agent.id === id);
}

module.exports = {
  getAgents,
  getAgentById,
};
