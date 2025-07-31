// themes
const themes = {
    tomato: {
        "--tomato": "rgb(255, 99, 71)",
        "--tomatoLight": "rgb(255, 108, 82)",
        "--tomatoLighter": "rgb(255, 120, 106)",
        "--tomatoLightest": "rgba(255, 119, 95, 0.267)",
        "--gold": "rgb(211, 197, 118)",
    },
    purple: {
        "--tomato": "#b498ffff",
        "--tomatoLight": "#c9b6ff",
        "--tomatoLighter": "#c9b6ff",
        "--tomatoLightest": "rgba(201, 182, 255, 0.25)",
        "--gold": "#a9c6ff",
    },
};

// Load theme from localStorage
const savedTheme = localStorage.getItem("activeTheme");

if (savedTheme && themes[savedTheme]) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(themes[savedTheme])) {
        root.style.setProperty(key, value);
    }
}

const container = document.getElementById("historyContainer");
const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

if (sessions.length === 0) {
    container.innerHTML = '<p class="no-data">No saved sessions found.</p>';
} else {
    sessions.forEach((data) => {
        const id = data.id;
        const count = data.count;
        const goal = data.goal;
        const day = data.day;
        const date = data.date;
        const time = data.time;

        const card = document.createElement("div");
        card.className = "session-card";
        card.setAttribute("id", id);
        card.innerHTML = `
                        <div class="session-count">${count}</div>
                        <div class="goal-container">
                            <div class="session-goal">Goal achieved: &nbsp; ${count} / ${goal}</div>
                            <button class="delete-btn" title="Delete">🗑️</button>
                        </div>
                        <div class="session-meta">
                            <span class="session-day">⌛ ${day}</span>
                            <span class="session-date">📅 ${date}</span>
                            <span class="session-time">🕐 ${time}</span>
                        </div>
                `;
        container.appendChild(card);

        // add listener on delete btn
        const deleteBtn = card.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const allSessions =
                JSON.parse(localStorage.getItem("sessions")) || [];

            // Filter out the one with matching id
            const updatedSessions = allSessions.filter((s) => s.id !== id);

            // Save updated array
            localStorage.setItem("sessions", JSON.stringify(updatedSessions));

            // Remove the card from DOM
            card.remove();

            // Optional: show message if no sessions left
            if (updatedSessions.length === 0) {
                container.innerHTML =
                    '<p class="no-data">No saved sessions found.</p>';
            }
        });
    });
}
