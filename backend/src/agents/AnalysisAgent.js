const Agent = require("./Agent");
const LLMService = require("../llm/LLMService");

class AnalysisAgent extends Agent {

    constructor() {
        super({
            id: "analyst",
            name: "Analysis Agent",
            role: "analyst",
            description:
                "Analyzes information, identifies patterns, and produces insights.",
            capabilities: [
                "analysis",
                "reasoning",
                "comparison",
                "problem solving"
            ],
            systemPrompt:
                "You are an analysis specialist. Examine information carefully and provide logical insights."
        });

        this.llm = new LLMService();
    }

    async execute({ task, context = {} }) {

        const prompt = `
You are the Analysis Agent in Cognivex, a multi-agent AI orchestration engine.

Your role:
${this.systemPrompt}

Your capabilities:
${this.capabilities.join(", ")}

Analysis task:
${task}

Information received from previous agents:
${JSON.stringify(context, null, 2)}

Instructions:
1. Carefully examine the information provided by previous agents.
2. Analyze the information in relation to the analysis task.
3. Identify important patterns, relationships, benefits, limitations, or insights.
4. Do not simply repeat the research.
5. Base your analysis on the information provided.
6. Clearly explain your reasoning and conclusions.
7. Your output will be passed to another AI agent, so make the analysis useful and well structured.

Provide the analysis.
`;

        const response = await this.llm.generate(prompt);

        return {
            agent: this.name,
            task: task,
            contextReceived: context,
            result: response
        };
    }
}

module.exports = AnalysisAgent;