// custom themes
const themes = {
    colour: {
        "--colour": "rgb(255, 99, 71)",
        "--lightColour": "rgb(255, 108, 82)",
        "--lighterColour": "rgb(255, 120, 106)",
        "--lightestColour": "rgba(255, 119, 95, 0.267)",
        "--secondaryColour": "rgba(255, 97, 69, 1)",
    },
    purple: {
        "--colour": "#c9b6ff",
        "--lightColour": "#c9b6ff",
        "--lighterColour": "#c9b6ff",
        "--lightestColour": "rgba(201, 182, 255, 0.25)",
        "--secondaryColour": "#a78bfa", // deeper purple 
    },
    amber: {
        "--colour": "#ffc71f",
        "--lightColour": "#ffc71f",
        "--lighterColour": "#ffd54f",
        "--lightestColour": "rgba(255, 214, 79, 0.26)",
        "--secondaryColour": "#c89e17", // slightly deeper amber
    },
    lotus: {
        "--colour": "#ffb7c5",
        "--lightColour": "#ffc9d3",
        "--lighterColour": "#ffced9",
        "--lightestColour": "rgba(255, 183, 197, 0.25)",
        "--secondaryColour": "#db88a1", // rose pink with contrast
    },
    ocean: {
        "--colour": "#7fbcff", // calm sky blue
        "--lightColour": "#a3d4ff",
        "--lighterColour": "#c1e4ff",
        "--lightestColour": "rgba(163, 212, 255, 0.25)",
        "--secondaryColour": "#4594d9", // cooler blue 
    },
    moss: {
        "--colour": "#88cc99", // soft sage
        "--lightColour": "#a3d9aa",
        "--lighterColour": "#c5e7c8",
        "--lightestColour": "rgba(163, 217, 170, 0.25)",
        "--secondaryColour": "#5c9f72", // forest green for contrast
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
