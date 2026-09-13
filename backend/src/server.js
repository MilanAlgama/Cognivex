const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("", (req, res) => {
    res.json({
        success: true,
        message: "Cognivex backend is running",
        service: "Cognivex Orchestration Engine"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Cognivex backend running on port ${PORT}`);
});