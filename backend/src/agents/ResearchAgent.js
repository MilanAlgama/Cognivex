const Agent = require("./Agent");
const LLMService = require("../llm/LLMService");

class ResearchAgent extends Agent {

    constructor() {
        super({
            id: "researcher",
            name: "Research Agent",
            role: "researcher",
            description: "Finds and analyzes information related to a task.",
            capabilities: [
                "research",
                "information gathering",
                "summarization"
            ],
            systemPrompt:
                "You are a research specialist. Gather relevant information and provide clear, factual findings."
        });

        this.llm = new LLMService();
    }

    async execute({ task, context = {} }) {

        const prompt = `
You are the Research Agent in Cognivex, a multi-agent AI orchestration engine.

Your role:
${this.systemPrompt}

Your capabilities:
${this.capabilities.join(", ")}

Research task:
${task}

Additional context:
${JSON.stringify(context, null, 2)}

Instructions:
1. Focus specifically on the research task.
2. Provide useful and relevant information.
3. Organize the findings clearly.
4. Distinguish important facts, concepts, and examples.
5. Do not invent information unnecessarily.
6. Your output will be passed to another AI agent, so make it useful as structured research.

Provide the research findings.
`;

        const response = await this.llm.generate(prompt);

        return {
            agent: this.name,
            task: task,
            result: response
        };
    }
}

module.exports = ResearchAgent;