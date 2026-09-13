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
                    status: "pending"
                },
                {
                    id: "subtask-2",
                    description: `Analyze the information related to: ${task.description}`,
                    agentId: "analyst",
                    status: "pending"
                },
                {
                    id: "subtask-3",
                    description: `Create a structured final response about: ${task.description}`,
                    agentId: "writer",
                    status: "pending"
                }
            ]
        };
    }
}

module.exports = Planner;