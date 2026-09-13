class Planner {

    createPlan(task) {

        return {
            taskId: task.id,
            goal: task.description,
            subtasks: [
                {
                    id: "subtask-1",
                    description: task.description,
                    agentId: "researcher",
                    status: "pending"
                }
            ]
        };
    }
}

module.exports = Planner;