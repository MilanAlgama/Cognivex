const Agent = require("./Agent");

class ResearchAgent extends Agent {
  constructor() {
    super({
      id: "researcher",
      name: "Research Agent",
      role: "researcher",
      description: "Finds and analyzes information related to a task.",
      capabilities: ["research", "information gathering", "summarization"],
      systemPrompt:
        "You are a research specialist. Gather relevant information and provide clear, factual findings.",
    });
  }

  async execute(task) {
    return {
      agent: this.name,
      task: task,
      result: `Research completed for: ${task}`,
    };
  }
}

module.exports = ResearchAgent;
