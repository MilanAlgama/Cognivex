const express = require("express");
const cors = require("cors");
require("dotenv").config();

const agentRoutes = require("./routes/agentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const llmRoutes = require("./routes/llmRoutes");
const plannerRoutes = require("./routes/plannerRoutes");
const validatorRoutes = require("./routes/validatorRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Cognivex backend is running",
        service: "Cognivex Orchestration Engine"
    });
});

app.use("/api/agents", agentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/llm", llmRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/validator", validatorRoutes);

app.listen(PORT, () => {
    console.log(`Cognivex backend running on port ${PORT}`);
});