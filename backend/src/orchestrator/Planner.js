const LLMService = require("../llm/LLMService");
const { getAgentDefinitions } = require("../agents/agentRegistry");

class Planner {
    constructor() {
        this.llm = new LLMService();
    }

    async createPlan(task) {
        const agents = getAgentDefinitions();

        const prompt = `
You are the planning component of Cognivex, a multi-AI-agent orchestration engine.

Your job is to analyze the user's task and create an execution plan using ONLY the available agents.

USER TASK:
${task.description}

AVAILABLE AGENTS:
${JSON.stringify(agents, null, 2)}

RULES:
1. Use only agent IDs that exist in the AVAILABLE AGENTS list.
2. Break the task into meaningful subtasks.
3. Each subtask must have:
   - id
   - description
   - agentId
   - dependencies
4. dependencies must contain only IDs of other subtasks.
5. A subtask can depend on another subtask when its result is required.
6. Independent subtasks should have an empty dependencies array so they can run in parallel.
7. Create a final writing/response subtask when the user's task requires a final answer.
8. Do not invent agents.
9. Do not execute the task. Only create the plan.
10. Return ONLY valid JSON. Do not use Markdown or code fences.

Required JSON format:
{
  "goal": "string",
  "subtasks": [
    {
      "id": "string",
      "description": "string",
      "agentId": "string",
      "dependencies": []
    }
  ]
}
`;

        const response = await this.llm.generate(prompt);

        try {
            return JSON.parse(response);
        } catch (error) {
            throw new Error(
                "Planner received invalid JSON from the LLM"
            );
        }
    }
}

module.exports = Planner;