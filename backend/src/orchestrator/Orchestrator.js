const {
    getAgentById
} = require("../agents/agentRegistry");

const Planner = require("./Planner");

class Orchestrator {

    constructor() {
        this.planner = new Planner();
    }

    async execute(task) {

        task.updateStatus("planning");

        // Create execution plan
        const plan = this.planner.createPlan(task);

        task.plan = plan;

        task.updateStatus("running");

        const results = [];

        // Execute each subtask
        for (const subtask of plan.subtasks) {

            const agent = getAgentById(subtask.agentId);

            if (!agent) {
                throw new Error(
                    `Agent not found: ${subtask.agentId}`
                );
            }

            subtask.status = "running";

            const result = await agent.execute(
                subtask.description
            );

            subtask.status = "completed";

            results.push({
                subtaskId: subtask.id,
                agentId: agent.id,
                result
            });
        }

        // Store results
        for (const result of results) {
            task.addResult(result);
        }

        task.updateStatus("completed");

        return {
            success: true,
            task,
            plan,
            results
        };
    }
}

module.exports = Orchestrator;