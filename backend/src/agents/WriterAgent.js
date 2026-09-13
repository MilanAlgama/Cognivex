const Agent = require("./Agent");

class WriterAgent extends Agent {
    constructor() {
        super({
            id: "writer",
            name: "Writer Agent",
            role: "writer",
            description: "Transforms information and analysis into structured content.",
            capabilities: [
                "writing",
                "summarization",
                "report generation",
                "content formatting"
            ],
            systemPrompt:
                "You are a professional writer. Transform information into clear and well-structured content."
        });
    }

    async execute({ task, context = {} }) {
        return {
            agent: this.name,
            task: task,
            contextReceived: context,
            result: `Writing completed using ${Object.keys(context).length} previous results.`
        };
    }
}

module.exports = WriterAgent;