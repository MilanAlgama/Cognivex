import { useEffect, useState } from "react";

function App() {
    const [backendStatus, setBackendStatus] = useState("Connecting...");

    useEffect(() => {
        fetch("http://localhost:5000")
            .then((response) => response.json())
            .then((data) => {
                setBackendStatus(data.message);
            })
            .catch(() => {
                setBackendStatus("Backend connection failed");
            });
    }, []);

    return (
        <div>
            <h1>Cognivex</h1>

            <p>
                Multi-AI Agent Orchestration Engine
            </p>

            <p>
                Backend: {backendStatus}
            </p>
        </div>
    );
}

export default App;