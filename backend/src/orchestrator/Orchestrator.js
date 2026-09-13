const { getAgentById } = require("../agents/agentRegistry");

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
    task.subtasks = plan.subtasks;


    task.updateStatus("running");

    const results = [];

    const completedTasks = new Set();

    const subtasks = plan.subtasks;

    while (completedTasks.size < subtasks.length) {
      // Find tasks that are ready to execute
      const readyTasks = subtasks.filter((subtask) => {
        // Already completed
        if (completedTasks.has(subtask.id)) {
          return false;
        }

        // Check dependencies
        return subtask.dependencies.every((dependency) =>
          completedTasks.has(dependency),
        );
      });

      if (readyTasks.length === 0) {
        throw new Error("Unable to resolve task dependencies");
      }

      // Execute independent tasks in parallel
      const executions = readyTasks.map(async (subtask) => {
        const agent = getAgentById(subtask.agentId);

        if (!agent) {
          throw new Error(`Agent not found: ${subtask.agentId}`);
        }

        subtask.status = "running";

        const context = {};

        for (const dependency of subtask.dependencies) {
          const dependencyResult = results.find(
            (result) => result.subtaskId === dependency,
          );

          if (dependencyResult) {
            context[dependency] = dependencyResult.result;
          }
        }

        const result = await agent.execute({
          task: subtask.description,
          context,
        });

        subtask.status = "completed";

        return {
          subtaskId: subtask.id,
          agentId: agent.id,
          result,
        };
      });

      const batchResults = await Promise.all(executions);

      // Store completed tasks
      for (const result of batchResults) {
        completedTasks.add(result.subtaskId);

        results.push(result);

        task.addResult(result);
      }
    }

    task.updateStatus("completed");

    return {
      success: true,
      task,
      plan,
      results,
    };
  }
}

module.exports = Orchestrator;
