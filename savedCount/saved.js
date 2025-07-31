// themes
const themes = {
    tomato: {
        "--tomato": "rgb(255, 99, 71)",
        "--tomatoLight": "rgb(255, 108, 82)",
        "--tomatoLighter": "rgb(255, 120, 106)",
        "--tomatoLightest": "rgba(255, 119, 95, 0.267)",
        "--gold": "rgba(255, 97, 69, 1)", // orange beige (works well)
    },
    purple: {
        "--tomato": "#b498ff",
        "--tomatoLight": "#c9b6ff",
        "--tomatoLighter": "#d8caff",
        "--tomatoLightest": "rgba(201, 182, 255, 0.25)",
        "--gold": "#a78bfa", // deeper purple accent (better contrast)
    },
    amber: {
        "--tomato": "#ffc71f",
        "--tomatoLight": "#ffdb5c",
        "--tomatoLighter": "#ffe491",
        "--tomatoLightest": "rgba(255, 214, 79, 0.26)",
        "--gold": "#c89e17", // slightly deeper amber
    },
    lotus: {
        "--tomato": "#ffb7c5",
        "--tomatoLight": "#ffc9d3",
        "--tomatoLighter": "#ffdde2",
        "--tomatoLightest": "rgba(255, 183, 197, 0.25)",
        "--gold": "#db88a1", // rose pink with contrast
    },
    ocean: {
        "--tomato": "#7fbcff",
        "--tomatoLight": "#a3d4ff",
        "--tomatoLighter": "#c1e4ff",
        "--tomatoLightest": "rgba(163, 212, 255, 0.25)",
        "--gold": "#4594d9", // cooler blue accent
    },
    moss: {
        "--tomato": "#88cc99",
        "--tomatoLight": "#a3d9aa",
        "--tomatoLighter": "#c5e7c8",
        "--tomatoLightest": "rgba(163, 217, 170, 0.25)",
        "--gold": "#5c9f72", // forest green for contrast
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
