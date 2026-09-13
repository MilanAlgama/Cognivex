const crypto = require("crypto");

class Task {
    constructor(description) {
        this.id = crypto.randomUUID();
        this.description = description;
        this.status = "pending";
        this.createdAt = new Date();
        this.subtasks = [];
        this.results = [];
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    addResult(result) {
        this.results.push(result);
    }

    updateStatus(status) {
        this.status = status;
    }
}

module.exports = Task;