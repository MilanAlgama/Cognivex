class Planner {

    createPlan(task) {

        return {
            taskId: task.id,
            goal: task.description,

            subtasks: [
                {
                    id: "subtask-1",
                    description: `Research information about: ${task.description}`,
                    agentId: "researcher",
                    dependencies: [],
                    status: "pending"
                },

                {
                    id: "subtask-2",
                    description: `Analyze information related to: ${task.description}`,
                    agentId: "analyst",
                    dependencies: [],
                    status: "pending"
                },

                {
                    id: "subtask-3",
                    description: `Create a structured final response about: ${task.description}`,
                    agentId: "writer",
                    dependencies: [
                        "subtask-1",
                        "subtask-2"
                    ],
                    status: "pending"
                }
            ]
        };
    }
}

module.exports = Planner;