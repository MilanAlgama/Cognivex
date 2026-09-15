const { getAgentById } = require("../agents/agentRegistry");

class PlanValidator {

    validate(plan) {

        // 1. Check plan
        if (!plan || typeof plan !== "object") {
            throw new Error("Invalid plan");
        }

        // 2. Check goal
        if (!plan.goal || typeof plan.goal !== "string") {
            throw new Error("Plan must contain a valid goal");
        }

        // 3. Check subtasks
        if (!Array.isArray(plan.subtasks) || plan.subtasks.length === 0) {
            throw new Error("Plan must contain at least one subtask");
        }

        // Store all subtask IDs
        const subtaskIds = new Set(
            plan.subtasks.map((subtask) => subtask.id)
        );

        // 4. Validate each subtask
        for (const subtask of plan.subtasks) {

            if (!subtask.id) {
                throw new Error(
                    "Every subtask must have an id"
                );
            }

            if (!subtask.description) {
                throw new Error(
                    `Subtask ${subtask.id} must have a description`
                );
            }

            if (!subtask.agentId) {
                throw new Error(
                    `Subtask ${subtask.id} must have an agentId`
                );
            }

            // Check agent exists
            const agent = getAgentById(subtask.agentId);

            if (!agent) {
                throw new Error(
                    `Agent not found: ${subtask.agentId}`
                );
            }

            // Check dependencies
            if (!Array.isArray(subtask.dependencies)) {
                throw new Error(
                    `Dependencies must be an array for subtask ${subtask.id}`
                );
            }
        }

        // 5. Validate dependency references
        for (const subtask of plan.subtasks) {

            for (const dependency of subtask.dependencies) {

                if (!subtaskIds.has(dependency)) {
                    throw new Error(
                        `Invalid dependency "${dependency}" in subtask "${subtask.id}"`
                    );
                }

                // Prevent self-dependency
                if (dependency === subtask.id) {
                    throw new Error(
                        `Subtask "${subtask.id}" cannot depend on itself`
                    );
                }
            }
        }

        return true;
    }
}

module.exports = PlanValidator;