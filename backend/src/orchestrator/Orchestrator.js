const {
    getAgentById
} = require("../agents/agentRegistry");

class Orchestrator {

    async execute(task, agentId) {

        // Find the requested agent
        const agent = getAgentById(agentId);

        if (!agent) {
            throw new Error(`Agent not found: ${agentId}`);
        }

        // Update task status
        task.updateStatus("running");

        try {

            // Execute the task using the agent
            const result = await agent.execute(task.description);

            // Store result
            task.addResult(result);

            // Update task status
            task.updateStatus("completed");

            return {
                success: true,
                task,
                result
            };

        } catch (error) {

            task.updateStatus("failed");

            throw error;
        }
    }
}

module.exports = Orchestrator;