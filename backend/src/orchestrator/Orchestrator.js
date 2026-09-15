const { getAgentById } = require("../agents/agentRegistry");
const Planner = require("./Planner");
const PlanValidator = require("./PlanValidator");

class Orchestrator {

    constructor() {
        this.planner = new Planner();
        this.validator = new PlanValidator();
    }

    async execute(task) {

        // --------------------------------
        // 1. Generate execution plan
        // --------------------------------

        task.updateStatus("planning");

        const plan = await this.planner.createPlan(task);

        // Store the generated plan
        task.plan = plan;

        // Store subtasks inside the task
        task.subtasks = plan.subtasks;

        // --------------------------------
        // 2. Validate execution plan
        // --------------------------------

        this.validator.validate(plan);

        // --------------------------------
        // 3. Start execution
        // --------------------------------

        task.updateStatus("running");

        const results = [];

        const completedTasks = new Set();

        const subtasks = plan.subtasks;

        // --------------------------------
        // 4. Execute according to dependencies
        // --------------------------------

        while (completedTasks.size < subtasks.length) {

            // Find subtasks whose dependencies
            // have already been completed
            const readyTasks = subtasks.filter((subtask) => {

                if (completedTasks.has(subtask.id)) {
                    return false;
                }

                return subtask.dependencies.every(
                    (dependency) =>
                        completedTasks.has(dependency)
                );
            });

            // Prevent infinite loops caused by
            // invalid dependency structures
            if (readyTasks.length === 0) {

                task.updateStatus("failed");

                throw new Error(
                    "Unable to resolve task dependencies"
                );
            }

            // --------------------------------
            // 5. Execute independent tasks in parallel
            // --------------------------------

            const executions = readyTasks.map(
                async (subtask) => {

                    const agent = getAgentById(
                        subtask.agentId
                    );

                    if (!agent) {
                        throw new Error(
                            `Agent not found: ${subtask.agentId}`
                        );
                    }

                    subtask.status = "running";

                    // Build context from dependency results
                    const context = {};

                    for (
                        const dependency
                        of subtask.dependencies
                    ) {

                        const dependencyResult =
                            results.find(
                                (result) =>
                                    result.subtaskId === dependency
                            );

                        if (dependencyResult) {
                            context[dependency] =
                                dependencyResult.result;
                        }
                    }

                    // Execute agent
                    const result = await agent.execute({
                        task: subtask.description,
                        context
                    });

                    subtask.status = "completed";

                    return {
                        subtaskId: subtask.id,
                        agentId: agent.id,
                        result
                    };
                }
            );

            // Wait for all independent tasks
            const batchResults =
                await Promise.all(executions);

            // Store results
            for (const result of batchResults) {

                completedTasks.add(
                    result.subtaskId
                );

                results.push(result);

                task.addResult(result);
            }
        }

        // --------------------------------
        // 6. Complete task
        // --------------------------------

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