const API_BASE_URL = "http://127.0.0.1:5000/api/triage";

export const triageService = {
    // 1. Send plain text
    processText: async (text) => {
        const response = await fetch(`${API_BASE_URL}/text`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) throw new Error("Failed to process text");
        return response.json();
    },
    getMetrics: async () => {
        const response = await fetch(`${API_BASE_URL}/metrics`);
        if (!response.ok) throw new Error('Failed to fetch metrics');
        return response.json();
    },

    // 2. Send audio file
    processAudio: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API_BASE_URL}/audio`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) throw new Error("Failed to process audio");
        return response.json();
    },

    // 3. Send PDF report
    processReport: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API_BASE_URL}/report`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) throw new Error("Failed to process report");
        return response.json();
    },
};
