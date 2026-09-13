const Agent = require("./Agent");

class AnalysisAgent extends Agent {
    constructor() {
        super({
            id: "analyst",
            name: "Analysis Agent",
            role: "analyst",
            description: "Analyzes information, identifies patterns, and produces insights.",
            capabilities: [
                "analysis",
                "reasoning",
                "comparison",
                "problem solving"
            ],
            systemPrompt:
                "You are an analysis specialist. Examine information carefully and provide logical insights."
        });
    }

    async execute(task) {
        return {
            agent: this.name,
            task: task,
            result: `Analysis completed for: ${task}`
        };
    }
}

module.exports = AnalysisAgent;