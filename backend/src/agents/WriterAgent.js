const Agent = require("./Agent");
const LLMService = require("../llm/LLMService");

class WriterAgent extends Agent {

    constructor() {
        super({
            id: "writer",
            name: "Writer Agent",
            role: "writer",
            description:
                "Transforms information and analysis into structured content.",
            capabilities: [
                "writing",
                "summarization",
                "report generation",
                "content formatting"
            ],
            systemPrompt:
                "You are a professional writer. Transform information and analysis into clear, accurate, and well-structured content."
        });

        this.llm = new LLMService();
    }

    async execute({ task, context = {} }) {

        const prompt = `
You are the Writer Agent in Cognivex, a multi-agent AI orchestration engine.

Your role:
${this.systemPrompt}

Your capabilities:
${this.capabilities.join(", ")}

Writing task:
${task}

Information received from previous agents:
${JSON.stringify(context, null, 2)}

Instructions:
1. Use the information provided by the previous agents.
2. Write a clear and well-structured final response.
3. Focus on answering the writing task.
4. Do not mention internal agents or the orchestration process.
5. Do not simply copy the previous analysis.
6. Organize the response using suitable headings and paragraphs.
7. Keep the information accurate and relevant.
8. Do not invent unsupported information.

Produce the final response.
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

module.exports = WriterAgent;