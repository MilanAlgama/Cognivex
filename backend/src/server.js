const express = require("express");
const cors = require("cors");
require("dotenv").config();

const agentRoutes = require("./routes/agentRoutes");

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

app.listen(PORT, () => {
    console.log(`Cognivex backend running on port ${PORT}`);
});